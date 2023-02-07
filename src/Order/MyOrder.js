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
import objectApiKey from "../ApiKey"



export default function MyOrder(){


    useEffect(()=>{
        checkListOfOrders()
        checkListOfDoneOrders()
    }, [])


    let [listOfOrders, setListOfOrders]=useState([])
    let [listOfDoneOrders, setListOfDoneOrders]=useState([])
    

    let checkListOfOrders =async()=>{
        let response = await fetch("http://localhost:2000/order/hamburgers?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfOrders(data)
            }
        }
    }

    let checkListOfDoneOrders =async()=>{
        let response = await fetch("http://localhost:2000/order/done?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfDoneOrders(data)
            }
        }
    }



    let complete =async ()=>{
        let response = await fetch("http://localhost:2000/order/complete?apiKey="+objectApiKey.apiKey,  
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
            }}
        )
        checkListOfOrders()
        checkListOfDoneOrders()
        
    }

    let totall= 0
    listOfOrders.map((order)=>
        totall+= order.price*order.number
    )

    let totallOfDone=0
    listOfDoneOrders.map((doneOrder)=>
        totallOfDone+=doneOrder.price*doneOrder.number
    )



    return(
        <Box  minH={"73.6vh"} display="flex" flexDirection={"column"} alignItems="center">
            <TableContainer w={"100%"}>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Your order</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Totall</Th>
                        <Th>Bill</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {  listOfOrders.map((order)=>
                    <Tr>
                        <Td>{order.type}</Td>
                        <Td>{order.price}</Td>
                        <Td>{order.number}</Td>
                        <Td>{order.number*order.price}</Td>
                    
                    </Tr>
                    )}
                    <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>{totall}</Td>
                    </Tr>
                    </Tbody>

                    <Tfoot>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Totall</Th>
                        <Th>Bil</Th>
                    </Tr>
                    </Tfoot>
            </Table>
            
            </TableContainer>
            <Button  onClick={complete} color="green" m={"30px"} w="10%">Complete order</Button>
            <Text textAlign={"center"}  rounded={"20px"}  color="white" bg={"green"} w="10%"  >History of orders</Text>


            <TableContainer w={"100%"}>
                <Table variant='striped' colorScheme='teal'>
                    <TableCaption>Your done orders</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Totall</Th>
                        <Th>Bill</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {  listOfDoneOrders.map((doneOrder)=>
                    <Tr>
                        <Td>{doneOrder.type}</Td>
                        <Td>{doneOrder.price}</Td>
                        <Td>{doneOrder.number}</Td>
                        <Td>{doneOrder.number*doneOrder.price}</Td>
                    
                    </Tr>
                    )}
                            <Tr>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td></Td>
                        <Td>{totallOfDone}</Td>
                    </Tr>
                    </Tbody>

                    <Tfoot>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Totall</Th>
                        <Th>Bil</Th>
                    </Tr>
                    </Tfoot>
            </Table>
            
            </TableContainer>
        </Box>

    )

}