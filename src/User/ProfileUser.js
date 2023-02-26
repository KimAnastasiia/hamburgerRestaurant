import React,{useState, useEffect} from "react"
import objectApiKey from "../Utility/ApiKey"
import { Badge,Flex, Avatar, Text, Box, Select, Button,Input, AlertIcon,Alert,AlertTitle,Link} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, CheckIcon} from '@chakra-ui/icons'
import listOfCountries from "../Utility/ListOfCountries";

import ListDoneOrders from '../Order/ListDoneOrders';


export default function ProfileUser(props){


    let [user, setUser ] = useState({})

    let [emailError, setEmailError]=useState(false)
    let [surnameError, setSurnameError]=useState(false)
    let [nameError, setNameError]=useState(false)

   
    let [componentShow, setComponentShow] = useState("Your Orders")

    let editProfile=(nameOfComponent)=>{
         setComponentShow(nameOfComponent)
    }

    useEffect (()=>{ 
        getInformationAboutUser()
    },[])

    let getInformationAboutUser=async()=>{  
        let response = await fetch("http://localhost:2000/users/profile?apiKey="+objectApiKey.apiKey)
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
        let response = await fetch ("http://localhost:2000/users/editProfileInfo?apiKey="+objectApiKey.apiKey,{
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
       
        <Box fontFamily={"Gerbera"}  bg={"lightBlue"} minH={"100vh"}  >

            <Box flexWrap={"wrap"}  display={"flex"} justifyContent="flex-start" ml={"20%"}  mr={"20%"} pt="5%" >
                <Box display={"flex"} w="100%" justifyContent={"space-between"} alignItems="center" >
                    <Text fontSize='6xl'>Hello, {user.name} {user.surname} ! </Text>
                    <Link to="/ty" ><Text fontSize='25px'>Log out of profile</Text></Link>
                </Box>
                <Box w={"100%"} display={"flex"} >
                    <Box w="15%">
                        <Link marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Your Orders")}>Your orders</Link>
                        <Text marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Adresses")}>Adresses</Text>
                        <Text marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Points")}>Points</Text>
                        <Link marginBottom={"10px"} fontSize='30px' onClick={()=>editProfile("Private Data")} >Private data</Link>
                    </Box>

                    <Box w="85%" bg={"white"} ml="5%" fontSize='30px'>
                            {(componentShow=="Your Orders") && 
                                <ListDoneOrders login={props.login} />
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
                                            {listOfCountries.map((country)=> <option key={country} defaultValue={user.country===country} value={country}>{country}</option>)}
                                        </Select>
                                    <Button onClick={e=>save("country")}><CheckIcon/></Button>
                                </Box>
                            </Box>


                            <Box  mb="20px" display={"flex"} w={"100%"}   justifyContent={"space-between"}>
                                <Text w={"20%"} fontSize='30px'>Payment:</Text>
                                <Box display={"flex"} w={"75%"}>
                                    <Select onChange={addPayment} >
                                        <option value="Cash"  defaultValue={user.payment==="Cash"}>Cash</option>
                                        <option value='Cart'  defaultValue={user.payment==="Cart"}>Cart</option>
                                        <option value='Pay Pal'  defaultValue={user.payment==="Pay Pal"}>Pay Pal</option>
                                    </Select>
                                    <Button onClick={e=>save("payment")}> <CheckIcon/></Button>
                                </Box>
                            </Box>
                        </Box>}
                    </Box>
                </Box>
            </Box> 
        </Box>
    )

}