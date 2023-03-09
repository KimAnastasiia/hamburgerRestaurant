import { Box, Flex, Text, Button, Stack, Img, Badge,Avatar,Link,Show } from "@chakra-ui/react";
import { PhoneIcon, CloseIcon, WarningIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie'; 
import { useNavigate   } from "react-router-dom";

export default function PhoneMenu(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    const navigate  = useNavigate();

    let logOut=async()=>{
        let response = await fetch (Commons.baseUrl+"/login/log-out?apiKey="+cookieObjectApiKey.apiKey,{
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            }
        })
        if(response.ok){
          let data = await response.json()
          if(data.messege === "done"){
              props.setLogin(false)   
              props.setAdmin(false) 
              props.setProfileAvatar("User")
              removeCookiObjectApiKey("apiKey", { path: '/' } )
              removeCookiObjectApiKey("userId",  { path: '/' })
              props.setPercent("100%") 
            
          }
            
        }  
    }
    return(
        <Show below='md'>
    <Box minH={"100vh"}>

    
        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
            <Text  as='b'>
              Hi  {props.profileAvatar} !
            </Text>
        </Box>

        <Box  h={"40px"} ml="30px" mr="30px"  display={"flex"} justifyContent="space-between" >
            <Text>
            Home
            </Text>
            <ChevronRightIcon onClick={()=>{navigate("/hamburgers/all") }}/> 
        </Box>

        {props.admin &&
        <Box h={"40px"} ml="30px" mr="30px"  display={"flex"} justifyContent="space-between" >
            <Text>
                Add new Hamburger
            </Text>
            <ChevronRightIcon onClick={()=>{navigate("/hamburgers/addNew") }}/> 
        </Box>}
        
        {props.admin &&
        <Box h={"40px"} ml="30px" mr="30px"  display={"flex"} justifyContent="space-between" >
            <Text>
                Status of orders
            </Text>
            <ChevronRightIcon onClick={()=>{navigate("/hamburgers/status") }}/> 
        </Box>}
        

        <Box h={"40px"} ml="30px" mr="30px"  display={"flex"} justifyContent="space-between" >
            <Text>
                Hamburgers
            </Text>
            <ChevronRightIcon onClick={()=>{navigate("/hamburgers") }}/> 
        </Box>
        {props.login &&    
        <Box h={"40px"} ml="30px" mr="30px"  display={"flex"} justifyContent="space-between" >
            <Text>
                History of orders
            </Text>
            <ChevronRightIcon onClick={()=>{navigate("/orderPack") }}/> 
        </Box>}

        {props.login &&
        <Box onClick={()=>{navigate('/user') }} h={"40px"} ml="30px" mr="30px"  display={"flex"} justifyContent="space-between" >
            <Text>
                Profile
            </Text>
            <ChevronRightIcon /> 
        </Box>}

        <Box  w={"100%"} h={"70px"} display={"flex"} justifyContent="center" alignItems={"center"} >
            {props.login && <Button w={"70%"} onClick={logOut}>Log out </Button>}
            {!props.login &&<Button w={"70%"} onClick={()=>{navigate("/login") }} > Login </Button>}
        </Box> 
    </Box>
    </Show>
    )


}