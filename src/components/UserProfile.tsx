import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Stack,
	useColorModeValue,
	HStack,
	Avatar,
	AvatarBadge,
	IconButton,
	Center,
	Textarea,
} from '@chakra-ui/react';
import React, { ChangeEvent, SetStateAction, useState, useEffect } from 'react';
import { updateUser, UserAuth0, getOrCreateUser } from 'src/utils/User';
import {Cloudinary} from "@cloudinary/url-gen";
import { useQuery, useQueryClient } from 'react-query';
const {CLOUDINARY_NAME} = process.env;

export interface UserData {
	name: string;
	email?: string;
	picture?: string;
	mail: string;
	description: string;
	avatar: string | ArrayBuffer;
	urlTikTok?: string;
	urlFaceBook?: string;
	urlInstagram?: string;
	keyWords?: string;
	trips?: string[];
}

export const UserProfile = ({ user }: UserAuth0 | any) => {

	const defaultData = {
		name: user.data.name,
		mail: user.data.mail,
		avatar: user.data.avatar,
		description: '',
		urlTikTok: '',
		urlFaceBook: '',
		urlInstagram: '',
		keyWords: '',
	};

	const [data, setData] = useState(defaultData);
	const [image, setImage] = useState<string | ArrayBuffer>();
	const [file, setFile] = useState<File>();
	const [nameFile, setNameFile] = useState("");
	const queryClient = useQueryClient();
	const hiddenFileInput = React.useRef(null);



	const handleChange = (
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setData((prev) => {
			return { ...prev, [e.target.id]: e.target.value };
		});
	};


	function previewFiles(file: File){
        const reader = new FileReader();
        reader.readAsDataURL(file);
    
        reader.onloadend = () => {
            setImage(reader.result);
            // console.log(reader.result);
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

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		updateUser({
			...data,
			avatar: image
		});
	};

	return (
		<Flex
			minH={'100vh'}
			align={'center'}
			justify={'center'}
			bg={useColorModeValue('gray.50', 'gray.800')}
		>
			<Stack
				spacing={4}
				w={'full'}
				maxW={'md'}
				bg={useColorModeValue('white', 'gray.700')}
				rounded={'xl'}
				boxShadow={'lg'}
				p={6}
				my={12}
			>
				<Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
					User Profile Edit
				</Heading>
				<form
					onSubmit={(e) => {
						handleSubmit(e);
					}}
				>
					<FormControl id="userName">
						<FormLabel>User Icon</FormLabel>
						<Stack direction={['column']} spacing={6} align='center'>
							<Center>
								<Avatar size="2xl" src={image ? image : data.avatar} />
							</Center>
							<Center>
								<Button onClick={event => handleClick(event)}>Change Icon</Button>
								<Input type='file'
									   ref={hiddenFileInput}
									   style={{display:'none'}}
									   accept="image/png, image/jpeg, image/gif, image/jpg, image/jfif" 
									   onChange={e => handleImage(e)}/>
							</Center>
						</Stack>
					</FormControl>
					<FormControl id="name" isRequired>
						<FormLabel>Name</FormLabel>
						<Input
							placeholder="Name"
							_placeholder={{ color: 'gray.500' }}
							type="text"
							value={data.name}
							onChange={(e) => handleChange(e)}
						/>
					</FormControl>
					<FormControl id="mail" isRequired>
						<FormLabel>Email address</FormLabel>
						<Input
							placeholder="your-email@example.com"
							_placeholder={{ color: 'gray.500' }}
							type="email"
							value={data.mail}
							disabled={true}
							onChange={(e) => handleChange(e)}
						/>
					</FormControl>
					<FormControl id="description" isRequired>
						<FormLabel>Description</FormLabel>
						<Textarea
							placeholder="Description"
							_placeholder={{ color: 'gray.500' }}
							onChange={(e) => handleChange(e)}
							value={data.description}
						/>
					</FormControl>
					<FormControl id="keyWords">
						<FormLabel>Keywords</FormLabel>
						<Input
							placeholder="Beach, Mountains, Europe, South America"
							_placeholder={{ color: 'gray.500' }}
							onChange={(e) => handleChange(e)}
							value={data.keyWords}
							type="text"
						/>
					</FormControl>
					<FormControl id="urlTikTok">
						<FormLabel>Tiktok</FormLabel>
						<Input
							placeholder="URL"
							_placeholder={{ color: 'gray.500' }}
							type="text"
							onChange={(e) => handleChange(e)}
							value={data.urlTikTok}
						/>
					</FormControl>
					<FormControl id="urlInstagram">
						<FormLabel>Instagram</FormLabel>
						<Input
							placeholder="URL"
							_placeholder={{ color: 'gray.500' }}
							type="text"
							onChange={(e) => handleChange(e)}
							value={data.urlInstagram}
						/>
					</FormControl>
					<FormControl id="urlFaceBook">
						<FormLabel>Facebook</FormLabel>
						<Input
							placeholder="URL"
							_placeholder={{ color: 'gray.500' }}
							type="text"
							onChange={(e) => handleChange(e)}
							value={data.urlFaceBook}
						/>
					</FormControl>
					<Stack spacing={6} marginTop={'1.5rem'} direction={['column', 'row']}>
						<Button
							bg={'blue.400'}
							color={'white'}
							w="full"
							_hover={{
								bg: 'blue.500',
							}}
							type={'submit'}
						>
							Submit
						</Button>
					</Stack>
				</form>
			</Stack>
		</Flex>
	);
};
