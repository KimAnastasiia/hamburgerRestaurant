import React,{useState, useEffect} from "react"
import { useNavigate   } from "react-router-dom";
import objectApiKey from "../Utility/ApiKey"
import { Input,  Alert,AlertIcon,AlertTitle, AlertDescription, InputGroup,InputRightElement, Button, Box, Text} from '@chakra-ui/react'
import { Link } from "react-router-dom";


export default function LoginUser(props){

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")
    let [sms, setSms] = useState("")
    let [alert, setAlert] = useState(false)
    const navigate  = useNavigate();


    let addEmail =(e)=>{
        setEmail(e.target.value)
    }

    
    let addPassword =(e)=>{
        setPassword(e.target.value)
    }


    let loginToProfile=async()=>{
            
        let response = await fetch ("http://localhost:2000/login",{
        
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email : email,
                password: password
            })
        })
        if(response.ok){
            let data = await response.json()
            if(data.apiKey){
                if(data.messege === "user"){
                    objectApiKey.apiKey=data.apiKey 
                    objectApiKey.userId=data.userId  
                    props.setLogin(true)
                    props.updateQuantity();  
                    navigate("/hamburgers/all")
                }
                if(data.messege === "admin"){
                    objectApiKey.apiKey=data.apiKey
                    objectApiKey.userId=data.userId
                    props.setLogin(true)  
                    props.setAdmin(true)  
                    props.updateQuantity();            
                    navigate("/hamburgers/all")
                }
              props.setProfileAvatar(data.name)  
            }
            else if(!data.apiKey){
                if(data.messege ==="Incorrect email or password"){
                    setAlert(data.messege)
                }
                
            }
            else{
                setSms("Error")
            }
        }   
     
    }

    return(
        <div> 

             <Box  minH={"100vh"} display={"flex"}  justifyContent="center" alignItems={"center"} flexDirection="column" >
                { alert &&
                <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                    <Alert status='error' width={"300px"}  >
                        <AlertIcon />
                        <AlertTitle>{alert}</AlertTitle>
                    </Alert>
                </Box>}
                <Box  w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" >        
                    <Text m={"30"} >Login</Text>
                    <Input onChange={addEmail}
                        pr='4.5rem'
                        type={"email"}
                        placeholder='Enter email'
                        w={"20%"}
                    />
                    <Input onChange={addPassword}
                        type="password"
                        pr='4.5rem'
                        placeholder='Enter password'
                        w={"20%"}
                    />
                    <br></br>
                    <Button bg={["primary.500", "primary.500", "primary.500", "primary.500"]} color="white" onClick={loginToProfile} w="20%" m={"2"}>
                        Continium
                    </Button> 
                    <Button w="10%" bg={"blue.200"} >
                        <Link to="/login/create-account" >Create account</Link>
                    </Button>
                
                </Box> 
            </Box> 
        </div>
    )
}