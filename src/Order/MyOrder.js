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



export default function MyOrder(props){

    let [listOfOrders, setListOfOrders]=useState([]) 

    useEffect(()=>{
        checkListOfOrders()
    
    }, [])

    let checkListOfOrders =async()=>{
        let response = await fetch("http://localhost:2000/order/hamburgers?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfOrders(data)
               
            }
        }
      
    }





    let complete =async ()=>{
        let  data 
        let total = 0
         listOfOrders.map((order)=>
        total = total + order.number * order.price)

        let responseOrderPack = await fetch ("http://localhost:2000/orderPack?apiKey="+objectApiKey.apiKey,{

            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:
            JSON.stringify( { 
               total: total
            })

        })
        if(responseOrderPack.ok){
            data = await responseOrderPack.json()
            console.log(data.rows.insertId)
        }
        let response = await fetch("http://localhost:2000/order/complete?apiKey="+objectApiKey.apiKey,  
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify( { 
                        orderPackId:data.rows.insertId
                    })
                }
        )
      
        checkListOfOrders()
     
    }

    let totall= false
    listOfOrders.map((order)=>
        totall+= order.price*order.number
    )

    let minus = async(idOfHamburger)=>{
        let response = await fetch("http://localhost:2000/order/"+idOfHamburger+"?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
              let listOfOrders = data;
              if(listOfOrders[0].number>0){
                   
                    let response = await fetch ("http://localhost:2000/order/"+idOfHamburger+"?apiKey="+objectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:
                    JSON.stringify( { 
                    number:listOfOrders[0].number-1
                    })
                    
                   
                    })
               
                
                    checkListOfOrders()
                }
                if(listOfOrders[0].number===1){
                    let response = await fetch ("http://localhost:2000/order/"+idOfHamburger+"?apiKey="+objectApiKey.apiKey,{
                        method: 'DELETE',
                    })
                    checkListOfOrders()
                }
                console.log(listOfOrders)
            }
        }
    }

    let plus=async(idOfHamburger)=>{
        let response = await fetch("http://localhost:2000/order/"+idOfHamburger+"?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                let listOfOrders = data;
                let response = await fetch ("http://localhost:2000/order/"+idOfHamburger+"?apiKey="+objectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },

                    body:
                    JSON.stringify( { 
                    number:listOfOrders[0].number+1
                    })
                })
            }
       
        }           
        checkListOfOrders()
    }





    return(
        <Box  minH={"73.6vh"} display="flex" flexDirection={"column"} alignItems="center">
            <TableContainer w={"100%"}>
                <Table variant='striped' colorScheme='teal'>
               { totall && <TableCaption>Your order</TableCaption>}
               { !totall &&<TableCaption>Your order empty</TableCaption>}
                    <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Price</Th>
                        <Th>Quantity</Th>
                        <Th>Totall</Th>
                        <Th>Delete</Th>
                        <Th>Bill</Th>
                    </Tr>
                    </Thead>
                    <Tbody>
                    {  listOfOrders.map((order)=>
                    <Tr>
                        <Td>{order.hamburgerId} {order.type}</Td>
                        <Td>{order.price}</Td>
                        <Td>{order.number}</Td>
                        <Td>{order.number*order.price}</Td>
                        <Th>
                            <Button onClick={(e)=>minus(order.hamburgerId)}>-</Button>
                            <Button onClick={(e)=>plus(order.hamburgerId)}>+</Button>
                        </Th>
                    
                    </Tr>
                    )}
                    <Tr>
                        <Td></Td>
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
                        <Th>Delete</Th>
                        <Th>Bil</Th>
                    </Tr>
                    </Tfoot>
            </Table>
            
            </TableContainer>
            <Button  onClick={complete} color="green" m={"30px"} w="10%">Complete order</Button>
           
        </Box>

    )

}