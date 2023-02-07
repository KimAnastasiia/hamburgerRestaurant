import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Flex, Spacer, Text, Center, Square, Box, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function Hamburgers(){

    let [listOfHamburgers, setListOfHamburgers ] = useState([])

    useEffect (()=>{ 
        showAll()
    },[])

    let showAll=async()=>{
        let response = await fetch("http://localhost:2000/hamburgers")
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfHamburgers(data)
            }
        }
    }

    return(
        <Flex  flexWrap="wrap" alignItems="center" w="100%" justifyContent="center" max={"3"}   minH={"73.6vh"}>
             {listOfHamburgers.map((hamburger)=>
            <Box  w={["50%","33%","25%","16%"]}>
                <Box m={"3"} bg={"hsl(40, 47%, 82%)"}  borderRadius='20px' display="flex" flexDirection={"column"}>
                    <Box  h="70%" display="flex" justifyContent={"center"} alignItems="flex-end" > 
                        <Image borderRadius='20px' w="70%"  src={"/images/"+hamburger.type+".png"} />
                    </Box>
                    <Box  w="100%"  h="30%" display="flex"><Text w="100%"  h="30%" display="flex"  justifyContent={"center"} alignItems="flex-start" color={"blue"}><Link to={"/order/"+hamburger.Id}  >  {hamburger.type}</Link></Text></Box>
                </Box>
            </Box>
              )}
        </Flex>
)
}