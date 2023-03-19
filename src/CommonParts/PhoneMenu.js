import { Box, Flex, Text, Button, Stack, Img, Badge,Avatar,Link,Show } from "@chakra-ui/react";
import { PhoneIcon, CloseIcon, WarningIcon, ChevronRightIcon } from '@chakra-ui/icons'
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie'; 
import { useNavigate   } from "react-router-dom";
import { useState } from "react";
import { HourglassOutlined, HomeOutlined, FileDoneOutlined, 
    UserOutlined,PlusSquareOutlined,ContainerOutlined,EuroOutlined,CompassOutlined, ShoppingCartOutlined} from '@ant-design/icons';


export default function PhoneMenu(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey',"percent","menyInScreen"]);
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
              //props.setPercent("100%") 
              //props.setMenyInScreen("none")
              setObjectApiKey("percent","100%", { path: '/' } )
              setObjectApiKey("menyInScreen","none", { path: '/' } )
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

        
            <Box display={"flex"} justifyContent="center" alignItems={"center"} m="35px">
                <Text  as='b'>
                    Hi  {props.profileAvatar} !
                </Text>
            </Box>

            <Box m={"10px"} borderRadius="lg" borderWidth={"2px"} onClick={()=>{goToComponent("/hamburgers/all") }}  h={"40px"}  p="30px"   display={"flex"} justifyContent="space-between" alignItems={"center"} >
                <Box display={"flex"}  alignItems={"center"}> 
                    <HomeOutlined/> 
                    <Text ml={"20px"} >Home</Text>
                </Box>
                <ChevronRightIcon /> 
            </Box>

            {props.admin &&
            <Box  alignItems={"center"} borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent("/hamburgers/addNew") }} h={"40px"} p="30px" display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <PlusSquareOutlined />
                    <Text ml={"20px"} >Add new Hamburger</Text> 
                </Box>
                <ChevronRightIcon/> 
            </Box>}
            
            {props.admin &&
            <Box  alignItems={"center"}borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent("/hamburgers/status") }} h={"40px"}  p="30px"   display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <HourglassOutlined /> 
                    <Text ml={"20px"} >Status of orders</Text> 
                </Box>
                <ChevronRightIcon /> 
            </Box>}
            

            <Box  alignItems={"center"}borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent("/hamburgers") }} h={"40px"}  p="30px"   display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <ContainerOutlined /> 
                    <Text ml={"20px"} >Hamburgers</Text> 
                </Box>
                <ChevronRightIcon /> 
            </Box>

            {props.login &&    
            <Box  alignItems={"center"}borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent("/completeOrder") }} h={"40px"}  p="30px"  display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <ShoppingCartOutlined style={{ fontSize: '20px'}} />
                    <Text ml={"20px"} >Cart</Text> 
                </Box>
                <ChevronRightIcon/> 
            </Box>}

            {props.login &&    
            <Box  alignItems={"center"}borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent("/orderPack") }} h={"40px"}  p="30px"  display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <FileDoneOutlined /> 
                    <Text ml={"20px"} >History of orders</Text> 
                </Box>
                <ChevronRightIcon/> 
            </Box>}
            
            {props.login &&    
            <Box  alignItems={"center"} borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent("/user/points") }} h={"40px"}  p="30px"  display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <EuroOutlined /> 
                    <Text ml={"20px"} >Points</Text> 
                </Box>
                <ChevronRightIcon/> 
            </Box>}

            {props.login &&
            <Box  alignItems={"center"}borderWidth={"2px"} m={"10px"}  borderRadius="lg" onClick={()=>{goToComponent('/user') }} h={"40px"}  p="30px"  display={"flex"} justifyContent="space-between" >
                <Box display={"flex"}  alignItems={"center"}> 
                    <UserOutlined />
                    <Text ml={"20px"} > Profile </Text> 
                </Box>
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