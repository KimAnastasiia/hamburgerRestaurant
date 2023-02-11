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
    Button,Text
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import objectApiKey from "../Utility/ApiKey"



export default function ListDoneOrders(props){

    let [listOfDoneOrders, setListOfDoneOrders] = useState([])
 

    useEffect(()=>{
        doneOrders()
    }, [])


    let doneOrders=async()=>{
        let response = await fetch("http://localhost:2000/orderPack?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfDoneOrders(data)
            }
        }
    }   
 


    return(
        <TableContainer w={"100%"}  minH={"100vh"}>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>Your order</TableCaption>
            <Thead>
            <Tr>
                <Th>Date</Th>
                <Th>Pack Id</Th>
                <Th>Total</Th>
                <Th>Check details</Th>
            </Tr>
            </Thead>
            <Tbody>
            {  listOfDoneOrders.map((order)=>
            <Tr>
                <Td>{order.date}</Td>
                <Td>{order.orderPackId}</Td>
                <Td>{order.total}</Td>
                <Td><Link to={"/order/details/"+order.orderPackId} ><Button>Details</Button></Link></Td>
            </Tr>
            )}

            </Tbody>

            <Tfoot>
            <Tr>
                <Th>Date</Th>
                <Th>Pack Id</Th>
                <Th>Total</Th>
                <Th>Check details</Th>
            </Tr>
            </Tfoot>
    </Table>
    
    </TableContainer>
    )
}