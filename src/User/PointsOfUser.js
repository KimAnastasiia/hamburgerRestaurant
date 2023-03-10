import { Box,
 Stat,StatNumber,
StatHelpText} from '@chakra-ui/react'
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie';
import React,{useState, useEffect} from "react"

export default function PointsOfUser(props){
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    let [user, setUser ] = useState({})

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
           
        }  
    }
 return  ( 
    <Box minH={"100vh"} display="flex" justifyContent="center" w={"100%"} >
        <Stat h={"20%"} w={"50%"} bg={"white"}  fontSize='30px' border={"1px"} borderColor="lightGray" borderRadius='lg'  p="55px" m={"30px"} >
            <StatNumber w={"100%"} fontSize="40px" >You have {user.points} points!</StatNumber>
            <StatHelpText w={"100%"} fontSize="20px" >{user.points} points  = {user.points} Euro</StatHelpText>
        </Stat>
    </Box>)
}