import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra, Flex, Spacer, Text, Center, Square, Box, Image} from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function TableHamburgers(){

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
        <Flex  flexWrap="wrap" alignItems="center" m="0" p="0" w="100%" justifyContent="center"  minH={"100vh"}>
             {listOfHamburgers.map((hamburger)=>
            <Box  w={["50%","50%","30%","24%","24%","23%","23%","22%","22%","20%","20%"]} key={hamburger.Id} >

                <Link to={"/order/"+hamburger.Id}>
                    <Box m={"3"} bg={"hsl(40, 47%, 82%)"}  borderRadius='20px' display="flex" flexDirection={"column"} >
                        <Box  h="70%" display="flex" justifyContent={"center"} alignItems="flex-end" > 
                            <Image borderRadius='20px' w="70%"  src={"/images/"+hamburger.type+".png"} />
                        </Box>
                        <Box  w="100%"  h="30%" display="flex"><Text w="100%"  h="30%" display="flex"  justifyContent={"center"} alignItems="flex-start" color={"blue"}>{hamburger.type}</Text></Box>
                    </Box>
                </Link>
            </Box>
              )}
        </Flex>
)
}