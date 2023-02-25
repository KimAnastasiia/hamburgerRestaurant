import React,{useState, useEffect} from "react"
import { useNavigate   } from "react-router-dom";
import { Input, AlertIcon,InputGroup,InputRightElement,Alert,AlertTitle,
     Button,VStack, Box, Text, Link, Heading, FormLabel,FormErrorMessage,
     FormControl, Select, Option, Radio, RadioGroup, Stack } from '@chakra-ui/react'

import listOfCountries from "../Utility/ListOfCountries";
import objectApiKey from "../Utility/ApiKey"

export default function AddUser(props){

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let [emailInput, setEmailInput]=useState(false)
    let [passwordInput, setPasswordInput]=useState(false)

    let [emailError, setEmailError]=useState(false)
    let [passwordError, setPasswordError]=useState(false)
    let [nameError, setNameError]=useState(false)
    let [surnameError, setSurnameError]=useState(false)
    let [paymentError, setPaymentError]=useState(false)
    let [countryError, setCountryError]=useState(false)

    let [name, setName]=useState("")
    let [surname, setSurname]=useState("")
    let [payment, setPayment]=useState('Cash')
    let [country, setCountry]=useState(listOfCountries[0])

    const navigate  = useNavigate();
 
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
     
        let response = await fetch ("http://localhost:2000/login?email="+email)
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
      
        let emailExists = await checkIfEmailExists()
       
        if ( !passwordError && emailInput && !emailExists){
            let response = await fetch ("http://localhost:2000/login/create-account",{

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
                    if(data.messege === "user"){
                        objectApiKey.apiKey=data.apiKey 
                        objectApiKey.userId=data.userId  
                        props.setLogin(true)
                        navigate("/hamburgers/all")
                    }
                    if(data.messege === "admin"){
                        objectApiKey.apiKey=data.apiKey
                        objectApiKey.userId=data.userId
                        props.setLogin(true)  
                        props.setAdmin(true)              
                        navigate("/hamburgers/all")
                    }
                props.setProfileAvatar(data.name)  
            }
           
        }
        }
       
    }
    
    return(
        <div>
{       
           /* <VStack  p={32} alignItems="flex-start" bg={"pink"} display={"flex"} justifyContent="center">
            <Box minH={"73.6vh"} w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center"  bg={"gray"}>    
                
                <Heading as="h1"  >
                    Create your account
                </Heading>
                <FormControl>
                    <FormLabel  htmlFor="email">Email</FormLabel>
                    <Input 
                        onChange={addEmail}
                        pr='4.5rem'
                        type={"email"}
                        placeholder='Enter email'
                        w={"20%"}
                        id="email"
                    />
                    <FormErrorMessage>Write a email</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input onChange={addtPassword}
                        type="password"
                        pr='4.5rem'
                        placeholder='Enter password'
                        w={"20%"}
                        id="password"
                    />
                </FormControl>
                <br></br>
                <Button  onClick={createAccount} w="10%" m={"2"}>
                   Continium
                </Button> 
                <Button w="10%" >
                    <Link href={"/login"} >I already have account</Link>
                </Button>
            </Box> 
</VStack>*/ }
   
        <Box  w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"}>  
        <Text m={"30"} >Create your account</Text>
        {nameError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{nameError}</AlertTitle>
                        </Alert>
            </Box>}



        <Input mb={"15"} w={"20%"} pr='4.5rem'  placeholder="Enter name" onChange={addName}/>
        {surnameError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{surnameError}</AlertTitle>
                        </Alert>
            </Box>}
        <Input mb={"15"} w={"20%"} pr='4.5rem'  placeholder="Enter surname" onChange={addSurname}/>
        {countryError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{countryError}</AlertTitle>
                        </Alert>
            </Box>
        }

            <Box  pr='4.5rem' w={"20%"} mb={"15"} >
                <Select onChange={addCountry} placeholder='Select country' >
                    {listOfCountries.map((country)=> <option value={country}>{country}</option>)}
                </Select>
            </Box>

        {paymentError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{paymentError}</AlertTitle>
                        </Alert>
            </Box>
        }

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
            w={"20%"}
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
            w={"20%"}
            name="password"
            value={password}
            mb={"15"}
        />

        <Button bg={["primary.500", "primary.500", "primary.500", "primary.500"]} color="white" onClick={createUser} w="20%" m={"2"}>
            Continium
        </Button> 




        <Button w="10%" bg={"blue.200"} >
            <Link href={"/login"} >I already have account</Link>
        </Button>
        </Box> 
    </div>
)}