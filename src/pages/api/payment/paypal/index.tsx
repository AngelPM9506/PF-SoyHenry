import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from "src/utils/prisma";
import axios from "axios";
import prisma from "src/utils/prisma";
const { PAYPAL_API, PAYPAL_API_CLIENT, PAYPAL_API_SECRET, PAYPAL_URL } = process.env;


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
	const { method, body: {price, description, id, userID}, query: {token, tripID, user_id} } = req;
	try {
		switch (method) {
			case 'POST': {
				const exist = await prisma.usersOnTrips.findFirst({
					where: {
						userid: userID.toString(),
						tripId: id.toString()
					}
				})
				if(exist) {
					return res.json('user exist in trips');
				} else {
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
							return_url: `${PAYPAL_URL}/api/payment/paypal?tripID=${id}&user_id=${userID}`,
							cancel_url: `${PAYPAL_URL}/trips/${id}`,
						}
					}

					const token = await getCredentials();
			
					const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders`, order, {
						headers: {
							Authorization: `Bearer ${token.data.access_token}`
						}
					})
					console.log(response);
					
					return res.json(response.data)
				}
			}

			case 'GET': {
				const credentials = await getCredentials();
				const response = await axios.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {}, {
					headers: {
						Authorization: `Bearer ${credentials.data.access_token}`
					}
				})

				// const mail: string = response.data.payment_source.paypal.email_address;	

				if(response.data.status.toString() === "COMPLETED") {
                    const response = await prisma.trip.update({
						where: { id: tripID.toString() },
						data: {
							active: true
						}
					})
					const user = await prisma.user.findFirst({where: {id: user_id.toString()}})
					const trip = await prisma.trip.findFirst({where: {id: tripID.toString()}})
					const userInTrip = await prisma.usersOnTrips.create({
						data: {
							userid: user.id,
							tripId: tripID.toString(),
						}
					})

					await axios.post(`${PAYPAL_URL}/api/mail`, {
						mail: user.mail,
						subject: `Trip ${trip.name} has been payed successfuly thanks to use WORLD TRAVELERS`,
						message: `Your Trip: ${trip.name} has been payed successfuly thanks to use WORLD TRAVELERS`,
						html: {
						  title: 'Trip payed successfuly',
						  actionName: trip.name,
						  text: `Your Trip ${trip.name} has been payed, enjoy your trip`
						}
					}).catch(error => console.log(error));

					return res.redirect(`${PAYPAL_URL}/trips/${tripID}`)
				} else {
					return res.redirect(`${PAYPAL_URL}/404`)
				}
			}

			default:
				return res.status(400).json({ msg: 'Method not supported, try again' })
		}
	} catch (error) {
		return res.status(500).json(error);
	}
}
