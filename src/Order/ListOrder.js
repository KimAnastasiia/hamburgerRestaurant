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
import { useCookies } from 'react-cookie';
import {DeleteIcon} from '@chakra-ui/icons'
import Commons from "../Utility/Commons";


export default function ListOrder(props){

   
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey', "userId"]);

    useEffect(()=>{
        checkListOfOrders()
    }, [])


    let checkListOfOrders =async()=>{
        let response = await fetch(Commons.baseUrl+"/order/hamburgers?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                props.setListOfOrders(data)
            }
        }
      
    }





    let complete =async ()=>{
        if(props.listOfOrders.length===0){
            return
        }
        
        let data 
        let total = 0
        props.listOfOrders.map((order)=>total = total + (order.number * order.price))
       
        let responseOrderPack = await fetch (Commons.baseUrl+"/orderPack?apiKey="+cookieObjectApiKey.apiKey,{

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
        let response = await fetch(Commons.baseUrl+"/order/complete?apiKey="+cookieObjectApiKey.apiKey,  
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
        props.setQuantityInMenu(0)
        props.setQuantity(0)
    }

    let totall= false
    props.listOfOrders.map((order)=>
        totall+= order.price*order.number
    )

    let minus = async(idOfHamburger)=>{
        let response = await fetch(Commons.baseUrl+"/order/"+idOfHamburger+"?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
              let listOfOrders = data;
              if(listOfOrders[0].number>1){
                   
                    let response = await fetch (Commons.baseUrl+"/order/"+idOfHamburger+"?apiKey="+cookieObjectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:
                    JSON.stringify( { 
                    number:listOfOrders[0].number-1
                    })
                    
                   
                    })
                    props.setQuantityInMenu(props.quantityInMenu-1)
                    checkListOfOrders()
                }
                if(listOfOrders[0].number===1){
                    let response = await fetch (Commons.baseUrl+"/order/"+idOfHamburger+"?apiKey="+cookieObjectApiKey.apiKey,{
                        method: 'DELETE',
                    })
                    
                    props.setQuantityInMenu(props.quantityInMenu-1)
                    checkListOfOrders()
                }
                if(props.hamburgerId==idOfHamburger){
                    props.setQuantity(listOfOrders[0].number-1)
                }
                console.log(listOfOrders)
            }
        }
    }

    let plus=async(idOfHamburger)=>{
        let response = await fetch(Commons.baseUrl+"/order/"+idOfHamburger+"?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                let listOfOrders = data;
                let response = await fetch (Commons.baseUrl+"/order/"+idOfHamburger+"?apiKey="+cookieObjectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },

                    body:
                    JSON.stringify( { 
                    number:listOfOrders[0].number+1
                    })
                })
                if(props.hamburgerId==idOfHamburger){
                    props.setQuantity(listOfOrders[0].number+1)
                }
                props.setQuantityInMenu(props.quantityInMenu+1)
            }
       
        }           
        checkListOfOrders()

    }

    let deleteAllOrder=async()=>{
        let response = await fetch (Commons.baseUrl+"/order/all?apiKey="+cookieObjectApiKey.apiKey,{
            method: 'DELETE' 
        })
        checkListOfOrders()
        props.setQuantity(0)
    }



    return(
      <div>
        { /*props.login &&
        <Box display="flex" flexDirection={"column"} alignItems="center">
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
           
                    </Box>*/}



            <Box bg={["primary.500", "primary.500", "primary.500", "primary.500"]}  w="20%" h={"100vh"}  position="fixed"  >
                <Box border={"1px"} borderColor={"gray"} display={"flex"} justifyContent="space-around" alignItems={"center"} h={"8%"} >
                    <Text color="white"> Your order </Text> 
                    <Button onClick={deleteAllOrder}> <DeleteIcon mr="10px"/> Delete all  </Button>
                </Box>
                <Box  h={"80%"} overflow="scroll" >
                {  props.listOfOrders.map((order)=>
                    <Box display={"flex"} justifyContent="space-around" >
                        <Box w={"25%"}> <img src={"/images/"+order.type+".png"} /></Box>
                        <Box   display={"flex"} justifyContent="space-around" w={"75%"}>
                            <Box  display={"flex"} flexDirection="column" justifyContent="center" w={"50%"} >
                                <Box color={"white"}> {order.type}</Box>
                                <Box display={"flex"} justifyContent="center"  >
                                    <Button mr="10px" onClick={(e)=>minus(order.hamburgerId)}>-</Button>
                                    {order.number}  
                                    <Button ml="10px" onClick={(e)=>plus(order.hamburgerId)}>+</Button> 
                                </Box>
                            </Box>
                            <Box color={"white"} w={"50%"} justifyContent="flex-end" display={"flex"} alignItems={"flex-end"}> {order.number*order.price} euro</Box>
                        </Box>
                    </Box>
                )}
                </Box>
                <Box  display={"flex"} flexDirection="column"   h="11%" justifyContent="flex-end" >
                    <Box mb={"20px"} color={"white"} alignItems="flex-end" display={"flex"} justifyContent="space-around"  h={"50%"}>
                        <Box>Total </Box>
                        <Box>{totall} euro</Box>
                    </Box>
                   <Box  h={"50%"} display={"flex"} justifyContent={"center"}  >
                        <Button w={"90%"} onClick={complete} >Complete order</Button>
                   </Box>
                   
                </Box>
            </Box>



   </div> )

}