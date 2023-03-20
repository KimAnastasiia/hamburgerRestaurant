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
import { Space } from 'antd';
import { ReadOutlined} from '@ant-design/icons';
import { useNavigate   } from "react-router-dom";
import { useCookies } from 'react-cookie';
import {DeleteIcon} from '@chakra-ui/icons'
import Commons from "../Utility/Commons";


export default function ListOrder(props){
    const navigate  = useNavigate();
   
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey', "userId","percent","menyInScreen"]);

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

        checkListOfOrders()
        props.setQuantityInMenu(0)
        props.setQuantity(0)
        navigate("/completeOrder")
        props.setPercent("100%")
        setObjectApiKey("percent", "100%", { path: '/'})
        props.setMenyInScreen("none")
        setObjectApiKey("menyInScreen", "none", { path: '/'})
       
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
          { ( props.listOfOrders.length == 0) &&
          
            <Box  w="20%" h={"100vh"}  position="fixed"  >
                <Box  bg={["#0F5736"]} border={"1px"} borderColor={"gray"} display={"flex"} justifyContent="center" alignItems={"center"} h={"8.2%"} >
                    <Text fontSize={"25px"} color="white"> Your order </Text> 
                </Box>
                <Box borderLeft={"1px"} borderColor={"gray"} alignItems="center" flexDirection={"column"} justifyContent={"center"} display={"flex"} h={"92%"}>
                    <Text mb={"20px"} fontSinavigateze={["16px","16px","16px","16px","16px","19px","23px","25px"]} >You haven't placed any order yet</Text>
                    <Button bg={["primary.500", "primary.500", "primary.500", "primary.500"]}  w="80%" onClick={()=>{navigate("/hamburgers")}}>
                        <ReadOutlined style={{ fontSize: '20px', color: 'white' }} /> 
                        <Text color={"white"} ml="10px">See menu </Text>
                    </Button>
                </Box>
            </Box>}
            { ( props.listOfOrders.length > 0) &&
            <Box bg={["#0F5736"]}  w="20%" h={"100vh"}  position="fixed"  >
            
                <Box borderColor={"gray"} display={"flex"} justifyContent="space-around" alignItems={"center"} h={"8%"} >
                    <Text color="white" fontSize={"2xl"}> Your order </Text> 
                </Box>
                <Box  h={"80%"} overflowY="scroll" >
                {  props.listOfOrders.map((order)=>
                    <Box mt={"20px"} display={"flex"} justifyContent="space-around" >
                        <Box w={"25%"}> <img src={Commons.baseUrl+"/images/"+order.type+".png"} /></Box>
                        <Box   display={"flex"} justifyContent="space-around" w={"75%"}>
                            <Box  display={"flex"} flexDirection="column" justifyContent="center" w={"50%"} >
                                <Box color={"white"} mb={"10px"}> {order.type}</Box>
                                <Box display={"flex"} justifyContent="center"  >
                                    <Button mr="10px" bg={"#04BA34"} color={"white"}  onClick={(e)=>minus(order.hamburgerId)}>-</Button>
                                    <Text  color={"white"} display="flex" alignItems="center"> {order.number}  </Text>
                                    <Button ml="10px" bg={"#04BA34"} color={"white"}  onClick={(e)=>plus(order.hamburgerId)}>+</Button> 
                                </Box>
                            </Box>
                            <Box mr={"20px"} color={"white"} w={"50%"} justifyContent="flex-end" display={"flex"} alignItems={"flex-end"}> {order.number*order.price} €</Box>
                        </Box>
                    </Box>
                )}
                </Box>
                <Box  display={"flex"} flexDirection="column"   h="11%" justifyContent="flex-end" >
                    <Box mb={"20px"} color={"white"} alignItems="flex-end" display={"flex"} justifyContent="space-around"  h={"50%"}>
                        <Box>Total </Box>
                        <Box fontSize={"xl"} >{totall} €</Box>
                    </Box>
                   <Box  h={"50%"} display={"flex"} justifyContent={"center"}  >
                        <Button margin={"10px"} onClick={deleteAllOrder} color="white" colorScheme='black' variant='outline' > <DeleteIcon ml="20px" mr="10px"/><Text mr={"20px"}>Delete all</Text> </Button>
                        <Button margin={"10px"} bg={"#04BA34"} color={"white"}  w={"90%"} onClick={complete} >Complete order</Button>
                   </Box>
                   
                </Box>
            </Box>}
   </div> )

}