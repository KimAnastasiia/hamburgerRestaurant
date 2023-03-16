import React,{useState, useEffect} from "react"
import { useCookies } from 'react-cookie';
import { Badge,Flex, Avatar, Text, Box, Select, Button,Input,
     AlertIcon,Alert,AlertTitle,Link,Stat,StatLabel,StatNumber,
     StatHelpText,Hide,Show} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, CheckIcon} from '@chakra-ui/icons'
import listOfCountries from "../Utility/ListOfCountries";
import ListDoneOrders from '../Order/ListDoneOrders';
import Commons from "../Utility/Commons";
import AddressInPhone from "./AddresInPhone";

export default function ProfileUser(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    let [user, setUser ] = useState({})

    let [emailError, setEmailError]=useState(false)
    let [surnameError, setSurnameError]=useState(false)
    let [nameError, setNameError]=useState(false)

    let [componentShow, setComponentShow] = useState("Private Data")

    let editProfile=(nameOfComponent)=>{
        setComponentShow(nameOfComponent)
    }

    useEffect (()=>{ 
        getInformationAboutUser()
    },[])

    let getInformationAboutUser=async()=>{  
        let response = await fetch(Commons.baseUrl+"/users/profile?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setUser(data[0])
            }
            props.setProfileAvatar(data[0].name)
        }  
    }

    let addName =(e)=>{

        setUser({...user,name:e.target.value})

       
        if(e.target.value.length<2 || !e.target.value){
            setNameError("Invalid value for name")
        }else{
            setNameError(false)
          
        }
       
    }
    let addSurname =(e)=>{
        setUser({...user,surname:e.target.value})
        if(e.target.value.length<2 || !e.target.value || e.target.value==" "){
            setSurnameError("Invalid value for surname")
        }else{
            setSurnameError(false)
        }
    }
    let addEmail =(e)=>{
        setUser({...user,email:e.target.value})
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Email is invalid")
        }else{
            setEmailError(false)
        }
    }
  
    let addCountry =(e)=>{
        setUser({...user,country:e.target.value})
    }

    let addPayment =(e)=>{
        setUser({...user,payment:e.target.value})

    }


    let save=async(value)=>{
        switch(value){
            case("name"):  
                await onChangeData(value, user.name )
            break;
            case("surname"):
                await onChangeData(value, user.surname )
            break;
            case("email"):
                await onChangeData(value, user.email )
            break;
            case("country"):
                await onChangeData(value, user.country )
            break;
            case("payment"):      
                await onChangeData(value, user.payment )
             break;
            default:
                console.log("error")
        }
        
    }

   
    let onChangeData = async(c,v)=>{
        let response = await fetch (Commons.baseUrl+"/users/editProfileInfo?apiKey="+cookieObjectApiKey.apiKey,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                colum:c,
                value:v
            })
        })
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                props.setProfileAvatar(user.name)
            }
        } 
       
    }
    return(
       
        <Box fontFamily={"Gerbera"}  minH={"100vh"}  >
            <Hide below="md">
                <Box flexWrap={"wrap"}  display={"flex"} justifyContent="flex-start" pt="5%" >

                    <Box display={"flex"} flexWrap="wrap" w="100%" justifyContent={"center"} alignItems="center" >
                        <Text  fontSize={["40px","40px","40px","60px"]}>Hello, {user.name} {user.surname} ! </Text>
                    
                    </Box>


                    <Box w={"100%"} display={"flex"} justifyContent="center" >
                        <Box  w={["80%","100%","40%","30%","30%","16%"]}>
                           
                            <Text marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Address")}>Address</Text>
                            <Text marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Points")}>
                                Points       
                                <Badge ml='1' colorScheme='yellow'>
                                    {user.points}
                                </Badge>
                            </Text>
                            <Link marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Private Data")} >Private data</Link>
                        </Box>

                        <Box w={["80%"]} bg={"white"}  fontSize='30px' border={"1px"} borderColor="lightGray" borderRadius='lg' >
                                
                              

                                {( componentShow=="Points") && 
                                
                                <Stat p="5%" >
                                    <StatNumber w={"100%"} fontSize="40px" >You have {user.points} points!</StatNumber>
                                    <StatHelpText w={"100%"} fontSize="20px" >{user.points} points  = {user.points} Euro</StatHelpText>
                                </Stat>}

                                {( componentShow=="Address") && 

                                <Box  m={"20px"} w={"100%"} display={"flex"} justifyContent={"center"} alignItems="center" flexDirection="column" >
                                   
                                    <Box  w={"80%"} ><AddressInPhone/> </Box> 
                                </Box> 
                                }

                                {( componentShow=="Private Data") && 
                            <Box p="5%" >
                    
                                <Box display={"flex"} w={"100%"}   mb="20px" flexDirection="column"  justifyContent={"space-between"}>
                                    
                                    {nameError &&                 
                                    <Box display={"flex"}  justifyContent="center" alignItems={"center"}   >
                                                <Alert status='error' width={"500px"}  >
                                                    <AlertIcon />
                                                    <AlertTitle>{nameError}</AlertTitle>
                                                </Alert>
                                    </Box>}
                                    <Box display={"flex"} justifyContent={"space-between"}>
                                        <Text w={"20%"} fontSize='30px'>Name:</Text>
                                        <Box display={"flex"} w={"75%"} >
                                            <Input 
                                                value={user.name}
                                                onChange={addName}
                                                placeholder="Change your name"
                                                h={"50px"}
                                            ></Input>
                                            <Button onClick={e=>save("name")}  isDisabled ={nameError}><CheckIcon/></Button>
                                        </Box>
                                    </Box>
                                </Box>

                                <Box display={"flex"}  w={"100%"}  flexDirection="column" justifyContent={"space-between"} mb="20px">
                                {surnameError &&                 
                                    <Box display={"flex"}  justifyContent="center" alignItems={"center"}   >
                                                <Alert status='error' width={"500px"}  >
                                                    <AlertIcon />
                                                    <AlertTitle>{surnameError}</AlertTitle>
                                                </Alert>
                                    </Box>}
                                    
                                    <Box display={"flex"} justifyContent={"space-between"}>   
                                        <Text  w={"20%"} fontSize='30px'>Surname: </Text>
                                    
                                        <Box display={"flex"} w={"75%"} >
                                            <Input 
                                            value={user.surname}
                                            onChange={addSurname}
                                            placeholder="Change your surname"
                                            h={"50px"}
                                            ></Input>
                                            <Button onClick={e=>save("surname", )} isDisabled = {surnameError}><CheckIcon/></Button>
                                        </Box>
                                    
                                    </Box>
                                </Box>

                                

                                <Box display={"flex"} w={"100%"}  mb="20px" flexDirection="column" justifyContent={"space-between"}>
                                    {emailError &&                 
                                    <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                                        <Alert status='error' width={"500px"}  >
                                            <AlertIcon />
                                            <AlertTitle>{emailError}</AlertTitle>
                                        </Alert>
                                    </Box>}
                                    <Box display={"flex"} justifyContent={"space-between"}>
                                        <Text  w={"20%"} fontSize='30px'> Email:  </Text>
                                        <Box display={"flex"} w={"75%"} >
                                            <Input 
                                            value={user.email}
                                            onChange={addEmail}
                                            placeholder="Change your email"
                                            ></Input>
                                            <Button onClick={e=>save("email")} isDisabled = {emailError}><CheckIcon/></Button>
                                        </Box>
                                    </Box>
                                </Box>


                                <Box  mb="20px" display={"flex"}  w={"100%"}  justifyContent={"space-between"}>
                                    <Text  w={"20%"} fontSize='30px'>Country:</Text>
                                    <Box display={"flex"}  w={"75%"} justifyContent="flex-end">
                                            <Select onChange={addCountry}  >
                                                {listOfCountries.map((country)=> <option key={country} selected={user.country==country} value={country}>{country}</option>)}
                                            </Select>
                                        <Button onClick={e=>save("country")}><CheckIcon/></Button>
                                    </Box>
                                </Box>


                                <Box  mb="20px" display={"flex"} w={"100%"}   justifyContent={"space-between"}>
                                    <Text w={"20%"} fontSize='30px'>Payment:</Text>
                                    <Box display={"flex"} w={"75%"}>
                                        <Select onChange={addPayment} >
                                            <option value="Cash"  selected={user.payment==="Cash"}>Cash</option>
                                            <option value='Cart'  selected={user.payment==="Cart"}>Cart</option>
                                            <option value='Pay Pal'  selected={user.payment==="Pay Pal"}>Pay Pal</option>
                                        </Select>
                                        <Button onClick={e=>save("payment")}> <CheckIcon/></Button>
                                    </Box>
                                </Box>
                            </Box>}
                        </Box>
                    </Box>
                </Box> 
            </Hide>
            <Show below='md'>
                <Box p="5%" >                
                        <Box display={"flex"} w={"100%"}   mb="20px" flexDirection="column"  justifyContent={"space-between"}>
                        
                        {nameError &&                 
                        <Box display={"flex"}  justifyContent="center" alignItems={"center"} mb="20px"  >
                                    <Alert status='error' width={"500px"}  >
                                        <AlertIcon />
                                        <AlertTitle>{nameError}</AlertTitle>
                                    </Alert>
                        </Box>}
                        <Box display={"flex"} justifyContent={"space-between"} alignItems="center" >
                            <Text w={"20%"} fontSize='20px'>Name</Text>
                            <Box display={"flex"} w={"75%"} justifyContent="space-around" >
                                <Input 
                                    value={user.name}
                                    onChange={addName}
                                    placeholder="Change your name"
                                    h={"50px"}
                                ></Input>
                                <Button onClick={e=>save("name")}  isDisabled ={nameError}><CheckIcon/></Button>
                            </Box>
                        </Box>
                    </Box>

                    <Box display={"flex"}  w={"100%"}  flexDirection="column" justifyContent={"space-between"} mb="20px">
                    {surnameError &&                 
                        <Box  mb="20px" display={"flex"}  justifyContent="center" alignItems={"center"}   >
                                    <Alert status='error' width={"500px"}  >
                                        <AlertIcon />
                                        <AlertTitle>{surnameError}</AlertTitle>
                                    </Alert>
                        </Box>}
                        
                        <Box display={"flex"} justifyContent={"space-between"} >   
                            <Text  w={"20%"} fontSize='20px' >Surname </Text>
                        
                            <Box justifyContent="space-around" display={"flex"} w={"75%"} >
                                <Input 
                            
                                value={user.surname}
                                onChange={addSurname}
                                placeholder="Change your surname"
                                h={"50px"}
                                ></Input>
                                <Button onClick={e=>save("surname", )} isDisabled = {surnameError}><CheckIcon/></Button>
                            </Box>
                        
                        </Box>
                    </Box>

                    

                    <Box display={"flex"} w={"100%"}  mb="20px" flexDirection="column" justifyContent={"space-between"}>
                        {emailError &&                 
                        <Box   mb="20px"display={"flex"}  justifyContent="center" alignItems={"center"}  >
                            <Alert status='error' width={"500px"}  >
                                <AlertIcon />
                                <AlertTitle>{emailError}</AlertTitle>
                            </Alert>
                        </Box>}
                        <Box display={"flex"} justifyContent={"space-between"}>
                            <Text  w={"20%"} fontSize='20px'> Email  </Text>
                            <Box display={"flex"} w={"75%"} >
                                <Input 
                                value={user.email}
                                onChange={addEmail}
                                placeholder="Change your email"
                                ></Input>
                                <Button onClick={e=>save("email")} isDisabled = {emailError}><CheckIcon/></Button>
                            </Box>
                        </Box>
                    </Box>


                    <Box  mb="20px" display={"flex"}  w={"100%"}  justifyContent={"space-between"}>
                        <Text  w={"20%"} fontSize='20px'>Country</Text>
                        <Box display={"flex"}  w={"75%"} justifyContent="flex-end">
                                <Select onChange={addCountry}  >
                                    {listOfCountries.map((country)=> <option key={country} selected={user.country==country} value={country}>{country}</option>)}
                                </Select>
                            <Button onClick={e=>save("country")}><CheckIcon/></Button>
                        </Box>
                    </Box>


                    <Box  mb="20px" display={"flex"} w={"100%"}   justifyContent={"space-between"}>
                        <Text w={"20%"} fontSize='20px'>Payment</Text>
                        <Box display={"flex"} w={"75%"}>
                            <Select onChange={addPayment} >
                                <option value="Cash"  selected={user.payment==="Cash"}>Cash</option>
                                <option value='Cart'  selected={user.payment==="Cart"}>Cart</option>
                                <option value='Pay Pal'  selected={user.payment==="Pay Pal"}>Pay Pal</option>
                            </Select>
                            <Button onClick={e=>save("payment")}> <CheckIcon/></Button>
                        </Box>
                    </Box>
                </Box>
            </Show>
        </Box>
    )

}