import {
	FormControl,
	FormLabel,
	Input,
	Heading,
	Textarea,
	Select,
	Button,
	FormErrorMessage,
	Grid,
	GridItem,
	Center,
	List,
	ListItem,
	ListIcon,
	Container,
	useToast,
	Image
} from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Trip, Activity, City } from "src/utils/interface";
import { ChangeEvent, FormEvent, MouseEvent, useRef } from "react";
import Layout from "src/components/layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from '@auth0/nextjs-auth0';
import { useQuery } from 'react-query';
import { getOrCreateUser } from 'src/utils/User';

interface Props {
	activities: Activity[];
	cities: City[];
}

const CreateTrip = ({ activities, cities }: Props) => {

	const { user, error } = useUser();

	const { data: userDb, isLoading } = useQuery(
	  ['userDb', user],
	  () => user && getOrCreateUser(user)
	);

	const initialState: Trip = {
		name: "",
		cities: [],
		initDate: "",
		endDate: "",
		description: "",
		tripOnUser: [],
		activitiesName: [],
		planner: "",
		price: 0,
		image: ""
	};

	const toast = useToast();
	const router = useRouter();

	const [input, setInput] = useState(initialState);
	const [inputCities, setInputCities] = useState("");
	const [image, setImage] = useState<string | ArrayBuffer>();
	const [file, setFile] = useState<File>();
	const [nameFile, setNameFile] = useState("");
	const hiddenFileInput = useRef(null);

	if(!isLoading && input.planner === "" && userDb?.data.id) setInput({...input, planner: userDb.data.id})

	const handleCities = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>) => {
		setInputCities(value);
	};

	const handleCitiesSelect = (e: MouseEvent<HTMLButtonElement>) => {
		setInput({ ...input, cities: [...input.cities, inputCities] });
		setInputCities("");
	};

	const handleChange = ({
		target: { name, value },
	}: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setInput({ ...input, [name]: value });
	};

	const handleSelect = ({
		target: { value },
	}: ChangeEvent<HTMLSelectElement>) => {
		const activity = value.split("|")[0];
		const price = Number(value.split("|")[1]) + Number(input.price);
		if (!input.activitiesName.includes(activity)) {
			setInput({
				...input,
				activitiesName: [...input.activitiesName, activity],
				price: price,
			});
		}
	};

	function previewFiles(file: File){
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
			setImage(reader.result);
            setInput({
				...input,
				image: reader.result
			});
            console.log(typeof reader.result);
        }
    }


    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const file = e.target.files[0];
		setNameFile(file.name);
        setFile(file);
        previewFiles(file);
    }

	const handleClick = (event: React.MouseEvent<HTMLButtonElement | MouseEvent>) => {
        hiddenFileInput.current.click();
    };


	const createTrip = async (trip: Trip) => {
		try {
			await axios.post("http://localhost:3000/api/trips", trip);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
		createTrip(input);
		setInput(initialState);
		router.push("/trips");
	};


	if (isLoading) return <div>Loading...</div>;
	return (
		<Layout>
			<Center marginTop="1%">
				<Heading color="primary">CREATE A NEW TRIP</Heading>
			</Center>
			<form onSubmit={(e) => handleSubmit(e)}>
				<FormControl>
					<Center>
						<Grid
							marginBottom="5%"
							h="80vh"
							w="80vw"
							templateRows="repeat(4, 1fr)"
							templateColumns="300px 1fr 1fr 1fr 1fr"
							gap={1}						
						>
							<GridItem
								borderRadius="2xl"
								rowSpan={1}
								colSpan={1}
								bg="none"
								align='center'
								alignSelf='center'

							>
								<Image src={`${image}`}
									   fallbackSrc='https://via.placeholder.com/150' alt='img'
									   boxSize='200px'
								/>
								<Center >
									<Button 
											onClick={event => handleClick(event)}
											mt='20px'
									>Change Activity Image</Button>
									<Input type='file'
										ref={hiddenFileInput}
										style={{display:'none'}}
										accept="image/png, image/jpeg, image/gif, image/jpg, image/jfif" 
										onChange={e => handleImage(e)}/>
								</Center>
								
							</GridItem>
							<GridItem borderRadius="2xl" colSpan={4} bg="blackAlpha.100">
								<FormLabel htmlFor="name" paddingLeft="2" mt={2}>
									Name
								</FormLabel>
								<Input
									name="name"
									placeholder="Type a name for your trip..."
									onChange={(e) => handleChange(e)}
								/>
								<FormErrorMessage>Name errors....</FormErrorMessage>

								<FormLabel paddingLeft="2" htmlFor="cities" mt={2}>
									Cities
								</FormLabel>
								<Input
									list="cities-choices"
									name="cities"
									value={inputCities}
									placeholder="Type the cities you are visiting..."
									onChange={(e) => handleCities(e)}
								/>
								<datalist id="cities-choices">
									{cities
										?.filter((c) => !input.cities?.includes(c.name))
										?.map((c, index) => (
											<option key={index}> {c.name} </option>
										))}
								</datalist>
								<Button onClick={(e) => handleCitiesSelect(e)}>+</Button>
								<Center>
									<List spacing={3}>
										{input.cities?.map((c, index) => {
											return <ListItem key={index}>{c}</ListItem>;
										})}
									</List>
								</Center>
								<FormErrorMessage>Cities errors....</FormErrorMessage>

								<FormLabel paddingLeft="2" htmlFor="initialDate" mt={2}>
									Initial date
								</FormLabel>
								<Input
									name="initDate"
									placeholder="Select the initial date of the trip..."
									size="md"
									type="date"
									onChange={(e) => handleChange(e)}
								/>
								<FormErrorMessage>Initial date errors....</FormErrorMessage>

								<FormLabel paddingLeft="2" htmlFor="endDate" mt={2}>
									End date
								</FormLabel>
								<Input
									name="endDate"
									placeholder="Select the ending date of the trip..."
									size="md"
									type="date"
									onChange={(e) => handleChange(e)}
								/>
								<FormErrorMessage>Ending date errors....</FormErrorMessage>
							</GridItem>
							<GridItem borderRadius="2xl" colSpan={5} bg="blackAlpha.100">
								<FormLabel
									paddingLeft="2"
									htmlFor="description"
									mt={2}
									mb="8px"
								>
									Description
								</FormLabel>
								<Textarea
									name="description"
									placeholder="Type a description of your trip..."
									size="sm"
									onChange={(e) => handleChange(e)}
								/>
								<FormErrorMessage>Description errors....</FormErrorMessage>
							</GridItem>
							<GridItem borderRadius="2xl" colSpan={5}>
								<FormLabel paddingLeft="2" htmlFor="activitiesName" mt={2}>
									Associated activities
								</FormLabel>
								<Select
									name="activitiesName"
									defaultValue="title"
									mt={2}
									icon={<ChevronDownIcon />}
									onChange={(e) => handleSelect(e)}
								>
									<option value="title" disabled>
										Choose the activities to enjoy on the trip...
									</option>
									{activities?.map((a) => {
										return (
											<option key={a.id} value={a.name + "|" + a.price}>
												{a.name + "   $" + a.price}
											</option>
										);
									})}
								</Select>

								<Center>
									<List spacing={3}>
										{input.activitiesName?.map((a, index) => {
											return (
												<ListItem key={index}>
													<ListIcon as={CheckCircleIcon} />
													{a}
												</ListItem>
											);
										})}
									</List>
								</Center>

								<FormErrorMessage>
									Activities Select errors....
								</FormErrorMessage>
							</GridItem>
						</Grid>
					</Center>
					<Center marginBottom="2%">
						<Button
							mt={5}
							bg="highlight"
							color="primary"
							_hover={{ bg: "danger" }}
							type="submit"
							onClick={() =>
								toast({
									title: "Trip Created",
									description: "We've created your trip",
									status: "success",
									duration: 3000,
									isClosable: true,
								})
							}
						>
							CREATE AND POST
						</Button>
						{input.price ? (
							<Button
								marginLeft="1%"
								mt={5}
								bg="highlight"
								color="primary"
								_hover={{ bg: "danger" }}
							>
								{`PAY $${input.price}`}
							</Button>
						) : null}
					</Center>
				</FormControl>
			</form>
		</Layout>
	);
};

export const getServerSideProps = async () => {
	const response = await fetch("http://localhost:3000/api/activities");
	const activities = await response.json();
	const res = await fetch("http://localhost:3000/api/cities");
	const cities = await res.json();

	return {
		props: {
			activities: activities,
			cities: cities,
		},
	};
};

export default CreateTrip;
