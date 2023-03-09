import { Box, Flex, Text, Button, Stack, Img, Badge,Avatar,Link,Show } from "@chakra-ui/react";
import { PhoneIcon, CloseIcon, WarningIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie'; 
import { useNavigate   } from "react-router-dom";
import { useState } from "react";

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


    let goToComponent=(url)=>{
        props.setIsOpen(false)
        navigate(url)
        props.setUrl(url)
    }




    return(
    <Show below='md'>
        <Box minH={"100vh"}>

        
            <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                <Text  as='b'>
                Hi  {props.profileAvatar} !
                </Text>
            </Box>

            <Box onClick={()=>{goToComponent("/hamburgers/all") }}  h={"40px"}  m="30px"   display={"flex"} justifyContent="space-between" >
                <Text>
                Home
                </Text>
                <ChevronRightIcon /> 
            </Box>

            {props.admin &&
            <Box  onClick={()=>{goToComponent("/hamburgers/addNew") }} h={"40px"} m="30px"  display={"flex"} justifyContent="space-between" >
                <Text>
                    Add new Hamburger
                </Text>
                <ChevronRightIcon/> 
            </Box>}
            
            {props.admin &&
            <Box onClick={()=>{goToComponent("/hamburgers/status") }} h={"40px"}  m="30px"   display={"flex"} justifyContent="space-between" >
                <Text>
                    Status of orders
                </Text>
                <ChevronRightIcon /> 
            </Box>}
            

            <Box onClick={()=>{goToComponent("/hamburgers") }} h={"40px"}  m="30px"   display={"flex"} justifyContent="space-between" >
                <Text>
                    Hamburgers
                </Text>
                <ChevronRightIcon /> 
            </Box>
            {props.login &&    
            <Box  onClick={()=>{goToComponent("/orderPack") }} h={"40px"}  m="30px"  display={"flex"} justifyContent="space-between" >
                <Text>
                    History of orders
                </Text>
                <ChevronRightIcon/> 
            </Box>}

            {props.login &&
            <Box onClick={()=>{goToComponent('/user') }} h={"40px"}  m="30px"  display={"flex"} justifyContent="space-between" >
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