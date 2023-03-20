import React,{useState, useEffect} from "react"
import { useNavigate   } from "react-router-dom";
import { Input,  Alert,AlertIcon,AlertTitle, AlertDescription, InputGroup,InputRightElement, Button, Box, Text} from '@chakra-ui/react'
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import Commons from "../Utility/Commons";

export default function LoginUser(props){

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [sms, setSms] = useState("")
    const [alert, setAlert] = useState(false)
    const navigate  = useNavigate();
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey',"percent","menyInScreen"]);

;

    let addEmail =(e)=>{
        setEmail(e.target.value)
    }

    
    let addPassword =(e)=>{
        setPassword(e.target.value)
    }


    let loginToProfile=async()=>{
            
        let response = await fetch (Commons.baseUrl+"/login",{
        
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
                if(data.messege === "admin"){
                    props.setAdmin(true)  
                }
                setObjectApiKey("apiKey", data.apiKey,{ path: '/'} )
                props.setProfileAvatar(data.name)  
                props.setLogin(true) 
                props.updateQuantity();
                props.setUserId(data.userId)
                props.setPercent("80%") 
                props.logOut.current = false
                props.setMenyInScreen("block")
                setObjectApiKey("percent","80%",{ path: '/'} )
                setObjectApiKey("menyInScreen", "block",{ path: '/'}  )
                if(props.url=="/login"){
                    navigate("/hamburgers/all")
                }else{
                    navigate(props.url)
                }
                
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

             <Box  minH={["100vh","100vh","100vh","100vh","100vh"]} display={"flex"}  justifyContent={["start","center","center","center","center"]}alignItems={["center"]} flexDirection="column" >
                { alert &&
                <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                    <Alert status='error' width={"300px"}  >
                        <AlertIcon />
                        <AlertTitle>{alert}</AlertTitle>
                    </Alert>
                </Box>}
                <Box   w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" >        
                    <Text m={"30"} >Login</Text>
                    <Input onChange={addEmail}
                        pr='4.5rem'
                        type="email"
                        placeholder='Enter email'
                        w={["80%","70%","50%","20%"]}
                        mb="10px"
                        aria-label="email"
                    />
                    <Input 
                        aria-label="pd"
                        onChange={addPassword}
                        type="text"
                        pr='4.5rem'
                        placeholder='Enter password'
                        w={["80%","70%","50%","20%"]}
                       
                    />
                    
                    <Button aria-label="cm" bg={["primary.500", "primary.500", "primary.500", "primary.500"]} color="white" onClick={loginToProfile} w={["80%","50%","30%","20%"]}  m={"2"}>
                        Continium
                    </Button> 
    

                    <Button data-testid="create-button" w={["80%","50%","30%","20%","10%"]} bg={"blue.200"} >
                        <Link to="/login/create-account" >Create account</Link>
                    </Button>
                </Box> 
            </Box> 
        </div>
    )
}