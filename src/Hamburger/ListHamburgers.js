import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra,Box,Show,Hide } from "@chakra-ui/react";
import Commons from "../Utility/Commons";

export default function ListHamburgers(){
    
    let [listOfHamburgers, setListOfHamburgers ] = useState([])

    useEffect (()=>{ 
        showAll()
    },[])

    let showAll=async()=>{
        let response = await fetch(Commons.baseUrl+"/hamburgers")
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfHamburgers(data)
            }
        }
    }

    return(
    <Box data-testid="list-hamburger" >
        <Hide below="md">
            <Table minH={"100vh"}>
                <Thead >
                        <Tr >
                            <Th color="red">
                        TYPE
                            </Th>
                            <Th color="red">
                        PRICE
                            </Th>
                            <Th color="red">
                        DESCRIPTION
                            </Th>
                        </Tr>
                </Thead>

                <Tbody>
                        {listOfHamburgers.map((hamburger)=>
                        <Tr key={hamburger.Id}>
                            <Th>
                            <img src={Commons.baseUrl+"/images/"+hamburger.type+".png"} />
                                {hamburger.type}
                            </Th>
                            <Th>
                                {hamburger.price} euro
                            </Th>
                            <Th>
                                {hamburger.description}
                            </Th>
                        </Tr>
                        )}
                </Tbody>
            </Table>
        </Hide>

        <Show below='md'  minH={"100vh"}> 
            {listOfHamburgers.map((hamburger)=>     
            <Box mb={"20px"} w={"95%"} display={"flex"} flexDirection="column" justifyContent="center" alignItems="center" key={hamburger.Id}>
                <Box w={"80%"} mb="20px" >
                    <img src={Commons.baseUrl+"/images/"+hamburger.type+".png"} /> 
                </Box>
                <Box mb={"20px"} w={"80%"} display={"flex"} justifyContent="space-between">
                    <Box> {hamburger.type}</Box>
                    <Box> {hamburger.price} euro</Box>
                </Box>
                <Box w={"80%"} >{hamburger.description}</Box>
            </Box>
            )}
        </Show>  

        </Box>

)
}