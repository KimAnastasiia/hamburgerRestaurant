import React,{useState, useEffect} from "react"
import objectApiKey from "../Utility/ApiKey"
import { Badge,Flex, Avatar, Text, Box} from '@chakra-ui/react'

export default function ProfileUser(props){
    let [user, setUser ] = useState({})

    useEffect (()=>{ 
        InformachionAboutUser()
    },[])

    let InformachionAboutUser=async()=>{
        let avatarName
        let response = await fetch("http://localhost:2000/users/profile?apiKey="+objectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setUser(data[0])
                avatarName=data[0]
            }
            props.setProfileAvatar(avatarName.name)
        }  
    }
    return(
        <Flex minH={"100vh"} >
            <Avatar size='sm' name={user.name} />
            <Box ml='3'>
                <Text fontWeight='bold'>
                    {user.name} {user.surname}
                </Text>
                <Text fontSize='sm'>Email:  {user.email}</Text>
                <Text fontSize='sm'>Country: {user.country}</Text>
                <Text fontSize='sm'>Payment: {user.payment}</Text>
            </Box>
      </Flex>
    )

}