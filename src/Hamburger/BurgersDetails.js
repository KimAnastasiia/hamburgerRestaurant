
import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Button, Text, Image, Box, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { PhoneIcon, ArrowBackIcon,  ArrowForwardIcon} from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import objectApiKey from "../ApiKey"
import { RowSelection } from "@tanstack/react-table";

export default function Ditails(props){

    const {id} = useParams()
    let [hamburger, setHamburger ] = useState([])
    let [quantity, setQuantity] = useState(0)
    let [listOfOrders, setListOfOrders]=useState([])

    useEffect (()=>{ 
        showAll()
        informationAboutHamburger()
        checkListOfOrders()

    },[])
    let checkListOfOrders =async()=>{
        let response = await fetch("http://localhost:2000/order/hamburgers?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfOrders(data)
               
            }
        }
        props.setQuantityInOrder(listOfOrders.length)
    }
    let showAll=async()=>{
        let response = await fetch("http://localhost:2000/hamburgers/"+id)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setHamburger(data[0])
            }
        }
    }
    let informationAboutHamburger=async()=>{
        let response = await fetch("http://localhost:2000/order/"+id+"?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                if(data.length==0){
                    setQuantity(0)
                }
                else{
                    setQuantity(data[0].number)
                }
               
            }
        }
    }

    let makeOrder= async()=>{
       let response = await fetch("http://localhost:2000/order/"+id+"?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
              let listOfOrders = data;
              if(listOfOrders.length==0){

                    let response = await fetch ("http://localhost:2000/order?apiKey="+objectApiKey.apiKey,{
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
                    setQuantity(1)
                    checkListOfOrders()
                    props.setQuantityInOrder(listOfOrders.length)
                }else{
                   
                    let response = await fetch ("http://localhost:2000/order/"+id+"?apiKey="+objectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },

                    body:
                    JSON.stringify( { 
                      number:listOfOrders[0].number+1
                    })
                    
                   
                })
                   
                setQuantity(listOfOrders[0].number+1)
                checkListOfOrders()
                props.setQuantityInOrder(listOfOrders.length)
                
                }
                console.log(listOfOrders)
            }
        }
    

    }
    
    let minus = async()=>{
        let response = await fetch("http://localhost:2000/order/"+id+"?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
              let listOfOrders = data;
              if(listOfOrders[0].number>0){
                   
                    let response = await fetch ("http://localhost:2000/order/"+id+"?apiKey="+objectApiKey.apiKey,{

                    method: 'PUT',
                    headers: {
                    'Content-Type': 'application/json'
                    },
                    body:
                    JSON.stringify( { 
                    number:listOfOrders[0].number-1
                    })
                    
                   
                    })
               
                    if(listOfOrders[0].number>0){
                        setQuantity(listOfOrders[0].number-1)
                    }
                    checkListOfOrders()
                    props.setQuantityInOrder(props.quantityInOrder-1)
                }
                if(listOfOrders[0].number===1){
                    let response = await fetch ("http://localhost:2000/order/"+id+"?apiKey="+objectApiKey.apiKey,{
                        method: 'DELETE',
                    })
                }
                console.log(listOfOrders)
            }
        }
    
    }


    return(
    <div>
        <Stack align='start'>
            <Button  marginLeft={"600px"} leftIcon={<ArrowBackIcon />} colorScheme='teal' variant='outline'><Link to="/hamburgers" >
                Back
            </Link>
            </Button>
        </Stack>
        <Box display={"flex"} justifyContent="center" alignItems={"center"} flexDirection="column" >
            <Image w={["100%", "30%"]} src={"/images/"+hamburger.type+".png"} ></Image>
            <Box display={"flex"} flexDirection="column" justifyContent="center" alignItems="center" h="400" w="30%">
                <Text h="30%" w="100%"  >{hamburger.description}</Text>
                <Text w="100%" >price: {hamburger.price} euro</Text>

                {props.login && <Box>
                    <Text color="green" >Quantity in cart {quantity}</Text>
                    <Box  display={"flex"} justifyContent="center" alignItems={"center"} >
                        <Button onClick={minus} >-</Button>
                        <Button onClick={makeOrder} >+</Button>
                    </Box>
                </Box>}

                {!props.login &&<Box>
                    <Text color="green" >Add in cart</Text>
                    <Box  display={"flex"} justifyContent="center" alignItems={"center"} >
                        <Button><Link to="/login" >Login</Link></Button>
                    </Box>
                </Box>}
            </Box>
        </Box>
    </div>
    )
}