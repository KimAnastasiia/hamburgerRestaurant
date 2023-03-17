import React,{useState, useEffect} from "react"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Box,
    Button,Text,Hide,Badge,Show
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import { useNavigate   } from "react-router-dom";
import Commons from "../Utility/Commons";
import { FrownOutlined } from '@ant-design/icons';
export default function ListDoneOrders(props){
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    let [listOfDoneOrders, setListOfDoneOrders] = useState([])
    let [listOfButtons,setListOfButtons]=useState([])
    const navigate  = useNavigate();



    useEffect(()=>{
        createListOfButtons()
        if(props.login){
            doneOrders(1)
        } else {
            navigate("/login")
        }
    }, [])


    let doneOrders=async(p)=>{
        let response = await fetch(Commons.baseUrl+"/orderPack?p="+p+"&apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfDoneOrders(data)
            }
        }
    }   
 
  
 
    let createListOfButtons=async()=>{
        let listOfButtons=[]
        let numberOfRows=0
        let response = await fetch(Commons.baseUrl+"/orderPack/count?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                numberOfRows = data[0].number 
            }
        }
        let numberOfPages = numberOfRows/4 
        numberOfPages = Math.ceil(numberOfPages) 

        for(let i=0; i<numberOfPages; i++){
            listOfButtons.push(<Button onClick={e=>doneOrders(i+1)} key={i} >{i+1}</Button>)
        }

        setListOfButtons(listOfButtons) 
    }

    let formatDate = (timestamp) => {
        let myDate = new Date(Number(timestamp))
        var yyyy = myDate.getFullYear();
        var mm = myDate.getMonth() + 1; // getMonth() is zero-based
        var dd = myDate.getDate();
        var hours = myDate.getHours()
        var minute = myDate.getMinutes()
        var seconds= myDate.getSeconds()
        return yyyy+"/"+mm+"/"+dd+" "+hours+":"+minute+":"+seconds
    }
    return(
 
        <Box >
            <Hide below="md">
                        { ( listOfDoneOrders.length==0) &&
                         <Box w={"100%"} mt={"200px"}minH={"100vh"} display={"flex"} flexDirection="column" alignItems={"center"} >
                            <Text fontSize="30px">You have not made any order yet </Text>
                            <Box><FrownOutlined style={{ fontSize: '30px', color: "green" }} /></Box>
                        </Box> } 
                        { ( listOfDoneOrders.length>0) &&
                    <TableContainer w={"100%"} minH={"100vh"}>
                        <Table variant='striped' colorScheme='teal'>
                            <TableCaption>  {listOfButtons}</TableCaption>
                            <Thead>
                            <Tr>
                                <Th>Date</Th>
                                <Hide below='md'>
                                    <Th>Pack Id</Th>
                                </Hide>
                                <Th>Total</Th>
                                <Th>Check details</Th>
                                <Th>Status</Th>
                            </Tr>
                            </Thead>
                            <Tbody>
                            {  listOfDoneOrders.map((order)=>
                            <Tr key={order.key}>
                                <Td>{formatDate(order.date)}</Td>
                                <Hide below='md'>
                                    <Td>{order.orderPackId}</Td>
                                </Hide>
                                
                                <Td>{order.total}</Td>
                                <Td><Link to={"/order/details/"+order.orderPackId} ><Button>Details</Button></Link></Td>
                                <Th>
                                    { order.status === "Pending" && <Badge colorScheme='yellow'>{order.status}</Badge>}
                                    { order.status === "Cancel" && <Badge colorScheme='red'>{order.status}</Badge>}
                                    { order.status === "In Progress" && <Badge colorScheme='orange'>{order.status}</Badge>}
                                    { order.status === "Finished" && <Badge colorScheme='green'>{order.status}</Badge>}
                                </Th>
                            </Tr>
                            )}

                            </Tbody>

                            <Tfoot>
                            <Tr>
                                <Th>Date</Th>
                                <Hide below='md'>
                                    <Th>Pack Id</Th>
                                </Hide>
                                <Th>Total</Th>
                                <Th>Check details</Th>
                                <Th>Status</Th>
                            </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>}
            </Hide>
            
            <Show below='md'>
                
                <Box minH={"100vh"}>
                        { ( listOfDoneOrders.length==0) &&
                         <Box w={"100%"} mt={"200px"} h={"50%"} display={"flex"} flexDirection="column" justifyContent="center" alignItems={"center"} >
                            <Text fontSize="30px">You have not made any order yet </Text>
                            <Box><FrownOutlined style={{ fontSize: '30px', color: "green" }} /></Box>
                        </Box> } 
                        { ( listOfDoneOrders.length>0) && 
                        listOfDoneOrders.map((order)=>
                 
                        <Box bg="lightblue" borderRadius='lg' flexDirection={"column"} m="20px" p={"10px"}   display={"flex"} justifyContent="center" alignItems={"center"}>
                            <Box mb={"5px"} display={"flex"} justifyContent="space-around" w={"90%"}>
                                <Box  display={"flex"} flexDirection="column" justifyContent={"space-around"} w="100%" >
                                    <Box >Order №{order.orderPackId }</Box>
                                    <Box > {formatDate(order.date)}</Box>
                                </Box>
                                <Box display={"flex"} flexDirection="column" alignItems="flex-start" >
                                    <Box display={"flex"} alignItems={"flex-end"}> {order.total}euro</Box>
                                    { order.status === "Pending" && <Box><Badge colorScheme='yellow'>Status: {order.status}</Badge></Box>}
                                    { order.status === "Cancel" &&  <Box><Badge colorScheme='red'>Status: {order.status}</Badge></Box>}
                                    { order.status === "In Progress" &&  <Box><Badge colorScheme='orange'>Status: {order.status}</Badge></Box>}
                                    { order.status === "Finished" &&  <Box><Badge colorScheme='green'>Status: {order.status}</Badge></Box>}
                                </Box>
                            </Box>
                            <Box w="100%" ><Link to={"/order/details/"+order.orderPackId} ><Button w={"100%"}>Details</Button></Link></Box>
                        </Box>)}
                        <Box  display={"flex"} justifyContent="center" > {listOfButtons}</Box>
                </Box>

            </Show>
    </Box>
    )
}