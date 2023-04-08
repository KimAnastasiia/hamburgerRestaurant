import React,{useState, useEffect} from "react"
import { useNavigate   } from "react-router-dom";
import { Input, AlertIcon,InputGroup,InputRightElement,Alert,AlertTitle,
     Button,VStack, Box, Text, Link, Heading, FormLabel,FormErrorMessage,
     FormControl, Select, Option, Radio, RadioGroup, Stack } from '@chakra-ui/react'

import listOfCountries from "../Utility/ListOfCountries";
import { useCookies } from 'react-cookie'; 
import Commons from "../Utility/Commons";

export default function AddUser(props){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [emailInput, setEmailInput]=useState(false)
    const [passwordInput, setPasswordInput]=useState(false)

    const [emailError, setEmailError]=useState(false)
    const [passwordError, setPasswordError]=useState(false)
    const [nameError, setNameError]=useState(false)
    const [surnameError, setSurnameError]=useState(false)
    const [countryError, setCountryError]=useState(false)

    const [name, setName]=useState("")
    const [surname, setSurname]=useState("")
    const [payment, setPayment]=useState('Cash')
    const [country, setCountry]=useState("")

    const [enoughData, setEnoughData]=useState(false)

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey',"percent","menyInScreen"]);
    const navigate  = useNavigate();

    useEffect (()=>{ 
        setEnoughData(false)

        if(name.length<1){
            setNameError(false)
        }
        if(surname.length<1){
            setSurnameError(false)
        }
        if(password.length<1){
            setPasswordError(false)
        }
        if(email.length<1){
            setEmailError(false)
        }
        setCountryError(false)
    
    },[name,surname,country,password,email,payment])

    let addEmail =(e)=>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Email is invalid")
        }else{
            setEmailError(false)
        }
    }
    
    let addtPassword =(e)=>{
        setPassword(e.target.value)
        if(e.target.value.length<3 || e.target.value.length>12 ){
            setPasswordError("Password must be longer then 3 and less then 8")
            if(!e.target.value){
                setPasswordError("Empty password")
            }
        }else{
            setPasswordError(false)
        }
    }

    let addName =(e)=>{
        setName(e.target.value)
        if(e.target.value.length<2 || !e.target.value){
            setNameError("Invalid value for name")
        }else{
            setNameError(false)
        }
    }

    let addSurname =(e)=>{
        setSurname(e.target.value)
        if(e.target.value.length<2 || !e.target.value){
            setSurnameError("Invalid value for surname")
        }else{
            setSurnameError(false)
        }
    }
    let addCountry =(e)=>{
        setCountry(e.target.value)
    }
    
    let addPayment =(e)=>{
        setPayment(e)
    }
    
    const blurHandler = (e)=>{

        if(e.target.name==="email"){
            setEmailInput(true)
        }
        if ( e.target.name==="password"){
            setPasswordInput(true)
        }
    }

    let checkIfEmailExists=async()=>{
     
        let response = await fetch (Commons.baseUrl+"/login?email="+email)
        if(response.ok){
            let data = await response.json()
            if(data.error){
                setEmailError("Email is already taken")
                return true
            }else{
                return false 
            }
        }
        
    }

    let createUser =async()=>{
      
        if(email.length<1 || password.length<1 || name.length<1 ||surname.length<1 ||payment.length<1 ){
            setEnoughData(true)
        }
        if(country==""){
            setCountryError(true)
        }else{
            setEnoughData(false)
            let emailExists = await checkIfEmailExists()
        
            if ( !passwordError && emailInput && !emailExists){
                let response = await fetch (Commons.baseUrl+"/login/create-account",{

                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body:
                    JSON.stringify({ 
                        email:email,
                        password:password,
                        name: name,
                        surname:surname,
                        country:country,
                        payment:payment
                    })
                })
                if(response.ok){
                    let data = await response.json()
                    if(data.apiKey){
                        if(data.messege === "admin"){
                            props.setAdmin(true)              
                        }
                        setObjectApiKey("apiKey", data.apiKey, { path: '/' } )
                        setObjectApiKey("percent","80%",{ path: '/'} )
                        setObjectApiKey("menyInScreen", "block",{ path: '/'}  )
                        props.updateQuantity();
                        props.setUserId(data.userId)
                        props.setPercent("80%") 
                        props.setMenyInScreen("block")
                        props.setLogin(true)
                        props.setProfileAvatar(data.name)  
                        props.logOut.current = false
                        if(props.url=="/login"){
                            navigate("/hamburgers/all")
                        }else{
                            navigate(props.url)
                        }
                    }
                }
            }
        }
       
    }
    
    return(

   
        <Box   w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"}>  
            <Text m={"30"}>Create your account</Text>

            {enoughData &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>You have not entered all the data</AlertTitle>
                        </Alert>
            </Box>}


            {nameError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{nameError}</AlertTitle>
                        </Alert>
            </Box>}

            <Input mb={"15"} w={["80%","80%","20%","20%","20%"]} pr='4.5rem'  placeholder="Enter name" onChange={addName}/>
        
            {surnameError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{surnameError}</AlertTitle>
                        </Alert>
            </Box>}
            <Input mb={"15"} w={["80%","80%","20%","20%","20%"]}  pr='4.5rem'  placeholder="Enter surname" onChange={addSurname}/>
            
            {countryError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>You didnt select your country</AlertTitle>
                        </Alert>
            </Box>
            }

            <Box  pr='4.5rem' w={["80%","80%","20%","20%","20%"]} mb={"15"} >
                <Select onChange={addCountry} placeholder='Select country' >
                    {listOfCountries.map((country)=> <option value={country}>{country}</option>)}
                </Select>
            </Box>

         

            <RadioGroup onChange={addPayment} defaultValue={'Cash'} > 
                <Stack direction='row'>
                    <Radio value='Cash' defaultChecked>Cash</Radio>
                    <Radio value='Cart'>Cart</Radio>
                    <Radio value='Pay Pal'>Pay Pal</Radio>
                </Stack>
            </RadioGroup>
            



            {(emailInput && emailError) &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{emailError}</AlertTitle>
                        </Alert>
            </Box>}

            <Input 
                mb={"15"}
                onBlur={e=>blurHandler(e)}
                onChange={addEmail}
                pr='4.5rem'
                type={"email"}
                placeholder='Enter email'
                w={["80%","80%","20%","20%","20%"]} 
                name="email"
                value={email}
            />

            {(passwordInput && passwordError) &&                 
                <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                            <Alert status='error' width={"500px"}  >
                                <AlertIcon />
                                <AlertTitle>{passwordError}</AlertTitle>
                            </Alert>
                </Box>
            }

            <Input 
                onBlur={e=>blurHandler(e)}
                onChange={addtPassword}
                type="password"
                pr='4.5rem'
                placeholder='Enter password'
                w={["80%","80%","20%","20%","20%"]} 
                name="password"
                value={password}
                mb={"15"}
            />

            <Button bg={["primary.500", "primary.500", "primary.500", "primary.500"]} color="white" onClick={createUser} w="20%" m={"2"}>
                Continium
            </Button> 


            <Box  w={["80%","80%","20%","20%","20%"]} justifyContent={"center"} display={"flex"}>
                <Link href={"/login"} >
                    <Button  bg={"blue.200"} >
                        I already have account
                    </Button>
                </Link> 
            </Box>
        </Box> 

)}