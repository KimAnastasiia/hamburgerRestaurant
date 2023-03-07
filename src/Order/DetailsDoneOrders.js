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
    Button,Text,
    Hide,Show
} from '@chakra-ui/react'
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import { PhoneIcon, ArrowBackIcon,  ArrowForwardIcon} from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import Commons from "../Utility/Commons";

export default function DetailsDoneOrders(props){

    let [listOfDoneOrdersDetails, setListOfDoneOrdersDetails] = useState([])
    const {doneOrdersDetailsId}= useParams()
    let date 
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    useEffect(()=>{
        doneOrdersDetails()
    
    }, [])

    let doneOrdersDetails =async()=>{
        let response = await fetch(Commons.baseUrl+"/order/details/"+doneOrdersDetailsId+"?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfDoneOrdersDetails(data)
            }
        }
       
    }
    listOfDoneOrdersDetails.map((details)=>
        date=details.date
    )
    
    let totall= 0
    listOfDoneOrdersDetails.map((order)=>
        totall+= order.price*order.number
    )
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
        <Box minH={"100vh"}>
            <Button  mt={"20px"} marginLeft={["50px","100px","100px","300px","400px","600px"]} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'>
                <Link to="/orderPack" >
                    Back
                </Link>
            </Button>


        <Box display={"flex"} alignItems={"center"} justifyContent={"center"}>
                <TableContainer w={["100%","100%","100%","70%","60%"]} >
                    <Table variant='striped' colorScheme='teal'>

                        <TableCaption>Your order</TableCaption>
                       
                        <Thead>

                            <Tr>
                                <Th >Type</Th>
                                <Th >Quantity</Th>
                                <Th >Price</Th>
                                <Hide below='md'>
                                    <Th >In check</Th>
                                    <Th>Date</Th>
                                    <Th>Total</Th>
                                </Hide>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {  listOfDoneOrdersDetails.map((order)=>
                            <Tr key={order.key} >
                                <Td>{order.type}</Td>
                                <Td>{order.number}</Td>
                                <Td>{order.price}</Td>
                                <Hide below='md'>   
                                    <Td>{order.price*order.number} euro</Td>
                                    <Td></Td>
                                    <Td></Td>
                                </Hide>
                            </Tr>
                            
                            )}
                            <Tr>
                                <Td></Td>
                                <Td></Td>
                                <Td></Td>
                                
                                <Hide below='md'>
                                    <Td></Td>
                                    <Td >{formatDate(date)}</Td>
                                    <Td>{totall} euro</Td>
                                </Hide>
                                
                            </Tr>
                        </Tbody>

                        <Tfoot>
                            <Tr>
                                <Th>Type</Th>
                                <Th>Quantity</Th>
                                <Th >Price</Th>
                                <Hide below='md'>
                                    <Th>In check</Th>
                                    <Th>Date</Th>
                                    <Th>Total</Th>
                                </Hide>
                            </Tr>
                        </Tfoot>
                    </Table>
                   
                    <Box display={["block","block","none","none","none"]} fontSize={"20px"} >
                        Total: {totall} euro
                    </Box>
                </TableContainer>
            </Box>  
        </Box>
    )
}
