import React,{useState, useEffect} from "react"
import {
    Checkbox,
    Input,
    Textarea,SliderTrack,
    Box,Slider,SliderThumb,SliderFilledTrack,
    Button,Text,Select,Switch,Stack
} from '@chakra-ui/react'
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie';


export default function AddressUser(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    const [user, setUser ] = useState({})


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

    let updateAdress=async()=>{
        
        let response = await fetch(Commons.baseUrl+"/users/address?apiKey="+cookieObjectApiKey.apiKey,  

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ 
                    street:user.street,
                    entrance:user.entrance,
                    floor:user.floor,
                    apartment:user.apartment,
                    intercom:user.intercom
                })
            }

        )
    }

    return(
        <Box  minH={["100vh","100vh",0,0,0]}   >
            <Box w={["90%","100%","100%","100%","100%"]} ml="30px" display="flex" justifyContent={"center"} flexDirection="column" >
                <Text textAlign="center" w={"100%"} fontSize={"25px"}  mb="10px">Adress</Text>
                <Box  mb={"10px"} display={"flex"} alignItems="center" >
                    <Text mr={"20px"} w="20%"  mb='8px'>street:</Text>
                    <Input w={["80%","60%","50%","50%","50%"]} id="street" value={user.street} required onChange={(e)=>setUser({...user, street:e.target.value})} placeholder="street"  ></Input>
                </Box>
                <Box  mb={"10px"} display={"flex"} alignItems="center">
                    <Text  mr={"20px"} w="20%" mb='8px'>entrance:</Text>
                    <Input w={["80%","60%","50%","50%","50%"]}id="entrance" value={user.entrance} onChange={(e)=>setUser({...user, entrance:e.target.value})}  placeholder="entrance" ></Input>
                </Box>
                <Box  mb={"10px"}  display={"flex"}alignItems="center">
                    <Text  mr={"20px"} w="20%"mb='8px'>floor:</Text>
                    <Input w={["80%","60%","50%","50%","50%"]} id="floor" value={user.floor} onChange={(e)=>setUser({...user, floor:e.target.value})} placeholder="floor"></Input>
                </Box>
                <Box   mb={"10px"} display={"flex"}alignItems="center">
                    <Text mr={"20px"} w="20%" mb='8px'>apartment:</Text>
                    <Input w={["80%","60%","50%","50%","50%"]} id="apartment" value={user.apartment} onChange={(e)=>setUser({...user, apartment:e.target.value})} placeholder="apartment"></Input>
                </Box>
                <Box   mb={"10px"} display={"flex"}alignItems="center">
                    <Text  mr={"20px"} w="20%"mb='8px'>intercom:</Text>
                    <Input w={["80%","60%","50%","50%","50%"]} id="intercom" value={user.intercom} onChange={(e)=>setUser({...user, intercom:e.target.value})} placeholder="intercom" ></Input>
                </Box>
                <Box display="flex" justifyContent={"center"} ><Button  w={"30%"} onClick={updateAdress} >Complete</Button></Box>
            </Box>
        </Box>
        )

    
}
