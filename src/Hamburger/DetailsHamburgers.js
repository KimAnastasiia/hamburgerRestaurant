
import React,{useState, useEffect, useRef} from "react"
import { Button, 
Text, Image, Box, Stack,  } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import {  ArrowBackIcon} from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import ListCommentsHamburger from "./ListCommentsHamburger";
import { useCookies } from 'react-cookie'; 
import Commons from "../Utility/Commons";
import { useNavigate   } from "react-router-dom";

export default function DetailsHamburgers(props){

    const {id} = useParams()
    let [hamburger, setHamburger ] = useState([])
    const navigate  = useNavigate();
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);

    useEffect (()=>{ 
        showAll()
        informationAboutHamburger()
        props.setHamburgerId(id)
    },[])

    let showAll=async()=>{
        let response = await fetch(Commons.baseUrl+"/hamburgers/"+id)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setHamburger(data[0])
            }
        }
    }
    let checkListOfOrders = async()=>{
        let response = await fetch(Commons.baseUrl+"/order/hamburgers?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                props.setListOfOrders(data)
            }
        }
      
    }

    let informationAboutHamburger=async()=>{
        let response = await fetch(Commons.baseUrl+"/order/"+id+"?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                if(data.length==0){
                    props.setQuantity(0)
                }
                else{
                    props.setQuantity(data[0].number)
                }
               
            }
        }
    }

    let makeOrder= async()=>{
       let response = await fetch(Commons.baseUrl+"/order/"+id+"?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
              let listOfOrders = data;
              if(listOfOrders.length==0){

                    let response = await fetch (Commons.baseUrl+"/order?apiKey="+cookieObjectApiKey.apiKey,{
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json'
                        },

                        body:
                        JSON.stringify( { 
                            id:id,
                            number:1
                        })
            
                    })
                    props.setQuantity(1)
                    props.setQuantityInMenu(props.quantityInMenu+1)
                   
                }else{
                   
                    let response = await fetch (Commons.baseUrl+"/order/"+id+"?apiKey="+cookieObjectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },

                    body:
                    JSON.stringify( { 
                      number:listOfOrders[0].number+1
                    })
                    
                   
                })
                   
                props.setQuantity(listOfOrders[0].number+1)
                props.setQuantityInMenu(props.quantityInMenu+1)
                
                }
                console.log(listOfOrders)
                checkListOfOrders()
            }
        }
    

    }
    
    let minus = async()=>{
        let response = await fetch(Commons.baseUrl+"/order/"+id+"?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
              let listOfOrders = data;
              if(listOfOrders[0].number>1){
                   
                    let response = await fetch (Commons.baseUrl+"/order/"+id+"?apiKey="+cookieObjectApiKey.apiKey,{
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body:
                            JSON.stringify( { 
                            number:listOfOrders[0].number-1
                        })
                    })

                    if(response.ok){
                        let data = await response.json()
                        if(data.error==null){ 
                            if(listOfOrders[0].number>0){
                                props.setQuantity(listOfOrders[0].number-1)
                            }
                            props.setQuantityInMenu(props.quantityInMenu-1)
                        }
                    }
                }
                if(listOfOrders[0].number===1){
                    let response = await fetch (Commons.baseUrl+"/order/"+id+"?apiKey="+cookieObjectApiKey.apiKey,{
                        method: 'DELETE',
                    })
                    props.setQuantityInMenu(props.quantityInMenu-1)
                }
                console.log(listOfOrders)
                checkListOfOrders()
            }
        }
    
    }


    let updateUrlForMenu=()=>{
        navigate("/hamburgers")
        props.setUrl("/hamburgers")
    }

   
    return(
    <Box minH={"100vh"} >
        <Stack align='start' mt={"20px"}>
            <Button onClick={updateUrlForMenu} mb="20px"  marginLeft={["10","100px","200px","300px","400px","600px"]} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'>
               
                    Back
               
            </Button>
        </Stack>
        <Box display={"flex"} justifyContent="center" alignItems={"center"} flexDirection="column" >
            <Image  w={["90%","90%","70%", "50%","30%"]} src={Commons.baseUrl+"/images/"+hamburger.type+".png"} ></Image>
            <Box display={"flex"} flexDirection="column" justifyContent="center" alignItems="center"  w={["80%","70%","60%","50%","40%","30%"]}>
                <Text w="100%"  >{hamburger.description}</Text>
                <Text fontSize='3xl' m={"10px"}>Price: <Text as='b'>{hamburger.price}</Text> € </Text>

                {props.login && 
                <Box mt="30px">
                    <Text color="green" >{"Quantity in cart "+ props.quantity}</Text>
                    <Box  display={"flex"} justifyContent="center" alignItems={"center"} >
                        <Button bg="primary.500" color="white" id={hamburger.type+"Minus"} onClick={minus} mr="8px" >-</Button>
                        <Button bg={"primary.500"} color="white"  id={hamburger.type+"Plus"} onClick={makeOrder} >+</Button>
                    </Box>
                </Box>}

                {!props.login &&
                <Box mt="30px" >
                    <Text color="green" >Add in cart</Text>
                    <Box  display={"flex"} justifyContent="center" alignItems={"center"} >
                        <Link to="/login" >
                            <Button bg={"primary.500"} color="white" fontSize="2xl" pt="20px" pb="20px" pr="40px" pl="40px">
                                Login
                           </Button>
                        </Link>
                    </Box>
                </Box>}
            </Box> 
        </Box>

        <Box display={"flex"} justifyContent="center">
            <ListCommentsHamburger login={props.login} userId={props.userId}/>
        </Box>
        
    </Box>
    )
}