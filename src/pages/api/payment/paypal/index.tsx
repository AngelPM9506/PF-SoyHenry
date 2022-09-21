import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from "src/utils/prisma";
import axios from "axios";
import prisma from "src/utils/prisma";
const { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET } = process.env;


const getCredentials = async() => {
	const params = new URLSearchParams()
	params.append("grant_type", "client_credentials");

	const token = await axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', params, {
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
					auth: {
						username: PAYPAL_API_CLIENT,
						password: PAYPAL_API_SECRET
					}
	})

	return token;
}

export default async function Payment(req: NextApiRequest, res: NextApiResponse) {
	const { method, body: {price, description, id}, query: {token} } = req;
	try {
		switch (method) {
			case 'POST': {
				const order = {
					intent: 'CAPTURE',
					purchase_units: [
						{
							amount: {
								currency_code: 'USD',
								value: price 
							},
							description: description
						},
					],
					application_context: {
						brand_name: "worldtravelers.com",
						landing_page: "LOGIN",
						user_action: "PAY_NOW",
						return_url: `http://localhost:3000/api/payment/paypal`,
						cancel_url: `http://localhost:3000/trips/${id}`,
					}
				}

				const token = await getCredentials();
		
				const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
					headers: {
						Authorization: `Bearer ${token.data.access_token}`
					}
				})

				console.log(response.data);
				return res.json(response.data)
			}

			case 'GET': {

				const credentials = await getCredentials();
				const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
					headers: {
						Authorization: `Bearer ${credentials.data.access_token}`
					}
				})
				const mail: string = response.data.payment_source.paypal.email_address;	

				if(response.status.toString() === "COMPLETED") {
                    const response = await prisma.trip.update({
						where: { id: id.toString() },
						data: {
							active: true
						}
					})
					const user = await prisma.user.findFirst({where: {mail: mail.toString()}})
					const updateUser = await prisma.usersOnTrips.update({
						where: {userid: user.id.toString()},
						data: {
							state: true
						}
					})

					res.redirect(`http://localhost:3000/home`)
				} else {
					res.redirect(`http://localhost:3000/404`)
				}

				// return res.redirect(`http://localhost:3000/trips`);
				// return res.json(response.data);
			}

			default:
				return res.status(400).json({ msg: 'Method not supported, try again' })
		}
	} catch (error) {
		return res.status(500).json(error);
	}
}