import { useUser } from "@auth0/nextjs-auth0";
import moment from "moment";
import { Flex, Center, Box } from '@chakra-ui/react'
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Layout from "src/components/layout/Layout";
import Loading from "src/components/Loading";
import { getOrCreateUser, getUsersById } from "src/utils/User";
import { Table, Tag, Tooltip, Typography, Input } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import type { ColumnsType, TableProps } from 'antd/es/table';
import 'antd/dist/antd.css';
import NextLink from "next/link";
import {Trip} from 'src/utils/interface';

interface DataType {
	key: React.Key;
	name: string;
	date: string;
	price: number;
	description: string;
	active: boolean;
  }

const { Title , Link } = Typography;

export default function MyTrips() {
	const { user, error } = useUser();
	const { data: userDb, isLoading } = useQuery(
		["userDb", user],
		() => user && getOrCreateUser(user)
	);
	const { data: usuario } = useQuery(
		["usuario", userDb],
		() => userDb && getUsersById(userDb.data.id)
	);
	const [trips, setTrips] = useState([]);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);

	const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
		// console.log('params', pagination, filters, sorter, extra);
		console.log(trips)

	};


	const columns: ColumnsType<DataType> = [
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			render: (name: string) => {
			  	let trip = trips.find(t => t.name === name);
				return (
					<NextLink href={`/trips/${trip.id}`}>
						<Title level={5}>
							<Link underline>{name}</Link>
						</Title>
					</NextLink>
				)
			},
			filterDropdown: ({setSelectedKeys, selectedKeys, confirm}) => {
				return 	<Input autoFocus 
							   placeholder="Type text here"
							   value={selectedKeys[0]}
							   onChange={(e) => {
							 	setSelectedKeys(e.target.value?[e.target.value]:[])
							   }}
							   onPressEnter={() =>{
							 	confirm()
							   }}
							   onBlur={() => {
							 	confirm()
							   }}
						></Input>
			},
			filterIcon: () => {
				return <SearchOutlined/>
			},
			onFilter:(value, record)=> {
				return record.name.toLowerCase().includes(value.toString().toLowerCase());
			}

		},
		{
			title: 'Init Date',
			dataIndex: 'initDate',
			key: 'initDate',
			render: (initDate: string) => {
				return (
					<div>
						{
							`${moment(initDate).format("DD/MM/YYYY")}`
						}
					</div>
				)
	
			},
			sorter: (a: any, b: any) => new Date(a.initDate).getTime() - new Date(b.initDate).getTime()
		},
		{
			title: 'Price',
			dataIndex: 'price',
			key: 'price',
			render: (price: number) => {
				return (
					<div>
						{
							`$ ${price}`
						}
					</div>
				)
	
			},
			sorter: (a, b) => a.price - b.price
		},
		{
			  title: 'Description',
			  dataIndex: 'description',
			  key: 'description',
		},
		{
			title: 'Active',
			dataIndex: 'active',
			key: 'active',
			render: (active: boolean) => {
				let color: string;
				if(active === true){
					color = 'green'
				} else {
					color = 'red'
				}
				return (
					<Tooltip placement="leftTop" title={active === true ? 'The travel is active' : 'You need pay for activate the travel'}>
						<Tag color={color}>
							{active === true ? 'ACTIVE' : 'PAYMENT REQUIRED'}
						</Tag>
					</Tooltip>
				)
	
			},
			filters: [
				{
				  text: 'TRUE',
				  value: true,
				},
				{
				  text: 'FALSE',
				  value: false,
				},
			  ],
			  onFilter: (value: any, record) => {
				return record.active === value
			  },
			  filterSearch: true,
			  width: '5%',
		},
	];

	useEffect(() => {
		setTrips(usuario?.trips);
	}, [usuario])

	if (isLoading) return <Loading/>;
	return (
		<Layout>
			<Flex flexDirection="row">
            	<Center w='100%' h="100%" bg='none' m="15px">
					<Box w='90%'>
						<Table  columns={columns} 
								dataSource={trips} 
								onChange={onChange} 
								pagination={{
									current: page,
									pageSize: pageSize,
									onChange: (page, pageSize) => {
										setPage(page);
										setPageSize(pageSize);
									}
								}}/>
					</Box>
            	</Center>
        	</Flex>
		</Layout>
  	)
}