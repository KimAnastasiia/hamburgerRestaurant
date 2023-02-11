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
import objectApiKey from "../ApiKey"



export default function PreviosOrders(props){

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
        <TableContainer w={"100%"}  minH={"73.6vh"}>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>Your order</TableCaption>
            <Thead>
            <Tr>
                <Th>Date</Th>
                <Th>Pack Id</Th>
                <Th>Totall</Th>
                <Th>Check ditails</Th>
            </Tr>
            </Thead>
            <Tbody>
            {  listOfDoneOrders.map((order)=>
            <Tr>
                <Td>{order.date}</Td>
                <Td>{order.orderPackId}</Td>
                <Td>Totall</Td>
                <Td><Link to={"/order/ditails/"+order.orderPackId} ><Button>Ditails</Button></Link></Td>
            </Tr>
            )}

            </Tbody>

            <Tfoot>
            <Tr>
                <Th>Date</Th>
                <Th>Pack Id</Th>
                <Th>Totall</Th>
                <Th>Check ditails</Th>
            </Tr>
            </Tfoot>
    </Table>
    
    </TableContainer>
    )
}