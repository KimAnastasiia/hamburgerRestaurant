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
    Button,Text,Select
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import objectApiKey from "../Utility/ApiKey"
import { useNavigate   } from "react-router-dom";


export default function StatusOrder(props){

    let [listOfDoneOrders, setListOfDoneOrders] = useState([])
  
    const navigate  = useNavigate();

    useEffect(()=>{

        if(props.login){
            doneOrders()
        } else {
            navigate("/login")
        }


    }, [])


    let doneOrders=async()=>{
        let response = await fetch("http://localhost:2000/orderPack/status?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfDoneOrders(data)
            }
        }
    }   
 
    let chanheStatusOfOrder =async(e, id)=>{


        let statusOfOrder= e.target.value
     
        //id
        let response = await fetch ("http://localhost:2000/orderPack?apiKey="+objectApiKey.apiKey,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                status:statusOfOrder,
                id:id
                })
        })
        doneOrders()
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
                <Th>Status</Th>
            </Tr>
            </Thead>
            <Tbody>
            {  listOfDoneOrders.map((order)=>
            <Tr>
                <Td>{order.date}</Td>
                <Td>{order.orderPackId}</Td>
                <Td>{order.total}</Td>
                <Td><Link to={"/order/details/"+order.orderPackId} ><Button>Details</Button></Link></Td>
                <Td><Select onChange={e =>chanheStatusOfOrder(e, order.orderPackId)} >
                    <option value="Pending" selected={order.status==="Pending"}>Pending</option>
                    <option value="Cancel" >Cancel</option>
                    <option value="In Progress" selected={order.status==="In Progress"}>In Progress</option>
                    <option value="Finished">Finished</option>
                </Select></Td>
            </Tr>
            )}

            </Tbody>

            <Tfoot>
            <Tr>
                <Th>Date</Th>
                <Th>Pack Id</Th>
                <Th>Total</Th>
                <Th>Check details</Th>
                <Th>Status</Th>
            </Tr>
            </Tfoot>
    </Table>
    
    </TableContainer>
    )
}