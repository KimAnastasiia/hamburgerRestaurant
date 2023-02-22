import React,{useState, useEffect} from "react"
import objectApiKey from "../Utility/ApiKey"
import { Badge,Flex, Avatar, Text, Box, Select, Button} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, CheckIcon} from '@chakra-ui/icons'

export default function ProfileUser(props){
    let [user, setUser ] = useState({})
    let [changeData, setChangeData]=useState(false)

    useEffect (()=>{ 
        InformachionAboutUser()
    },[])

    let updateInfo=()=>{
        setChangeData(true)
    }

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
        <div>
        <Flex minH={"100vh"} w="100%">
            <Avatar size='sm' name={user.name} />
            <Box ml='3' w="100%"
            >
                <Text fontWeight='bold'>
                    {user.name} {user.surname}
                </Text>
                <Text fontSize='sm'>Email:  {user.email}</Text>
                <Text fontSize='sm'>Country: {user.country}</Text>
                <Text fontSize='sm'>Payment: {user.payment}</Text>
                <Button  onClick={updateInfo}  >  Change data</Button>
            </Box>
            
      </Flex>

                

      <div>
               {changeData && 
               <div>
               <Box display={"flex"} w={"20%"}  justifyContent={"space-between"}>
           
                    <Text fontSize='30px'> Email:  {user.email}</Text>
                    <Box>
                        <Button><DeleteIcon/></Button>  
                        <Button><EditIcon/></Button>
                    </Box>
                </Box>


                <Box display={"flex"}  w={"20%"}  justifyContent={"space-between"}>
                    <Text fontSize='30px'>Country: {user.country}</Text>
                    <Box>
                        <Button><DeleteIcon/></Button>  
                        <Button><EditIcon/></Button>
                    </Box>
                </Box>


                <Box display={"flex"}  w={"20%"}  justifyContent={"space-between"}>
                    <Text fontSize='30px'>Payment: {user.payment}</Text>
                    <Box>
                        <Button><DeleteIcon/></Button>  
                        <Button><EditIcon/></Button>
                    </Box>
                </Box>
                </div>
                }
                </div>

                <Select  placeholder= {user.payment}>
                    <option value="Cash">Cash</option>
                    <option value='Cart'>Cart</option>
                    <option value='Pay Pal'>Pay Pal</option>
                </Select>
            </div>
    )

}