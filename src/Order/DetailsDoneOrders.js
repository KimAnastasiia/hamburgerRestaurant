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
import { useParams } from "react-router-dom";
import objectApiKey from "../Utility/ApiKey"
import { PhoneIcon, ArrowBackIcon,  ArrowForwardIcon} from '@chakra-ui/icons'
import { Link } from "react-router-dom";

export default function DetailsDoneOrders(props){

    let [listOfDoneOrdersDetails, setListOfDoneOrdersDetails] = useState([])
    const {doneOrdersDetailsId: doneOrdersDetailsId}= useParams()
    let date 
    useEffect(()=>{
        doneOrdersDetails()
    
    }, [])

    let doneOrdersDetails =async()=>{
        let response = await fetch("http://localhost:2000/order/details/"+doneOrdersDetailsId+"?apiKey="+objectApiKey.apiKey)
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
    return(
        <div>
            <Button  marginLeft={"400px"} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'>
                <Link to="/orderPack" >
                    Back
                </Link>
            </Button>
            <TableContainer marginLeft={"400"} marginTop="100" w={"60%"}  minH={"100vh"}>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Your order</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Type</Th>
                            <Th>Quantity</Th>
                            <Th>Price</Th>
                            <Th>In check</Th>
                            <Th>Date</Th>
                            <Th>Totall</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {  listOfDoneOrdersDetails.map((order)=>
                        <Tr>
                            <Td>{order.type}</Td>
                            <Td>{order.number}</Td>
                            <Td>{order.price}</Td>
                            <Td>{order.price*order.number} euro</Td>
                        </Tr>
                        
                        )}
                        <Tr>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td></Td>
                            <Td>{date}</Td>
                            <Td>{totall} euro</Td>
                        </Tr>
                    </Tbody>

                    <Tfoot>
                        <Tr>
                            <Th>Type</Th>
                            <Th>Quantity</Th>
                            <Th>Price</Th>
                            <Th>In check</Th>
                            <Th>Date</Th>
                            <Th>Total</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            
            </TableContainer>
          
            </div>
    )
}
