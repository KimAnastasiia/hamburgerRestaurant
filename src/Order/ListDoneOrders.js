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
import { useNavigate   } from "react-router-dom";


export default function ListDoneOrders(props){

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
        let response = await fetch("http://localhost:2000/orderPack?p="+p+"&apiKey="+objectApiKey.apiKey)
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
        let response = await fetch("http://localhost:2000/orderPack/count?apiKey="+objectApiKey.apiKey)
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

    return(
        <Box >
            <TableContainer w={"100%"} >
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>  {listOfButtons}</TableCaption>
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
                    <Tr key={order.key}>
                        <Td>{order.date}</Td>
                        <Td>{order.orderPackId}</Td>
                        <Td>{order.total}</Td>
                        <Td><Link to={"/order/details/"+order.orderPackId} ><Button>Details</Button></Link></Td>
                        <Th>{order.status}</Th>
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
        
    </Box>
    )
}