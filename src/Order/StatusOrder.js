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
    Button,Text,Select,Hide,Badge
} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import Commons from "../Utility/Commons";
import { useNavigate   } from "react-router-dom";


export default function StatusOrder(props){
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey', "userId"]);
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
        let response = await fetch(Commons.baseUrl+"/orderPack/status?apiKey="+cookieObjectApiKey.apiKey)
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
        let response = await fetch (Commons.baseUrl+"/orderPack?apiKey="+cookieObjectApiKey.apiKey,{
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
        <TableContainer w={"100%"}  minH={"100vh"}>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>Your order</TableCaption>
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
            {  listOfDoneOrders.sort((a, b) => b.date-a.date)
            .map((order)=>
            <Tr key={order.orderPackId} >
                <Td>{formatDate(order.date)}</Td>
                <Hide below='md'>
                    <Td>{order.orderPackId}</Td>
                </Hide>
                <Td>{order.total}</Td>
                <Td><Link to={"/order/details/"+order.orderPackId} ><Button>Details</Button></Link></Td>
                <Td><Select onChange={e =>chanheStatusOfOrder(e, order.orderPackId)} >
                    <option value="Pending"  defaultValue={order.status==="Pending"}><Badge colorScheme='green'>Pending</Badge></option>
                    <option value="Cancel" colorScheme='red' >Cancel</option>
                    <option value="In Progress" colorScheme='purple' defaultValue={order.status==="In Progress"}>In Progress</option>
                    <option value="Finished" colorScheme='blue'>Finished</option>
                </Select></Td>
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
    
    </TableContainer>

    
    )
}