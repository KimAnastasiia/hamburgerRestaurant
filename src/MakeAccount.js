import React,{useState, useEffect} from "react"
import { useNavigate   } from "react-router-dom";
import objectApiKey from "./ApiKey"

import { Input, InputGroup,InputRightElement, Button, Box, Text, Link} from '@chakra-ui/react'

export default function MakeAccount(props){

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    const navigate  = useNavigate();
    let [sms, setSms] = useState("")
    let addEmail =(e)=>{
        setEmail(e.target.value)
    }

    
    let addtPassword =(e)=>{
        setPassword(e.target.value)
    }

    let createAccount=async()=>{
        let response = await fetch ("http://localhost:2000/login/create-account",{

        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },

        body:
        JSON.stringify( { 
           email:email,
           password:password
        })
        })
        navigate("/hamburgers/all")
    }
    
    return(
        <div> 
            <Box  w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center">        
                <Text m={"30"} >Create your account</Text>
                <Input onChange={addEmail}
                    pr='4.5rem'
                    type={"email"}
                    placeholder='Enter email'
                    w={"20%"}
                />
                <Input onChange={addtPassword}
                    type="password"
                    pr='4.5rem'
                    placeholder='Enter password'
                    w={"20%"}
                />
                <br></br>
                <Button  onClick={createAccount} w="10%" m={"2"}>
                   Continium
                </Button> 
                <Button w="10%" >
                    <Link href={"/login"} >I already have account</Link>
                </Button>
            </Box>  
        </div>
    )
}