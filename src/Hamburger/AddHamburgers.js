import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { Input, Text,Box } from '@chakra-ui/react'
import { Button, Stack } from '@chakra-ui/react'
import Commons from "../Utility/Commons";



export default function AddHamburger(){


    let [listOfHamburgers, setListOfHamburgers ] = useState([])
    let [type, setType]=useState("")
    let [price, setPrice]=useState("")
    let [description, setDescription]=useState("")


    let addType =(e)=>{
        setType(e.target.value)
    }

    let addPrice=(e)=>{
        setPrice(e.target.value)
    }

    let addDescription=(e)=>{
        setDescription(e.target.value)
    }

 
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


    let addHamburger=async()=>{
        let response = await fetch (Commons.baseUrl+"/hamburgers",{

        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },

        body:
        JSON.stringify( { 
            type: type,
            price: price,
            description:description
        })
        
        
    })
    if(response.ok){
        let data = await response.json()
        

        console.log(data)
        if(!data.error){
            setListOfHamburgers((prev) => 
                [...prev, {
                    type: type,
                    price: price,
                    description:description,
                    id: data.rows.insertId
                }]
                
            )
        }
    } 

    }


    return(
            
   <div>

    <Box mt={"20px"} w="100%" display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" >
    
            <Text mb="10px" textAlign="center" >Make new Hamburger</Text>
            <Input
                isInvalid
                errorBorderColor='crimson'
                placeholder='new Hamburger'
                onChange={addType}
                w={["80%","50%","40%","30%","20%"]}
                mb="10px"
            /> 
            
            <Input
                isInvalid
                errorBorderColor='crimson'
                placeholder='Price'
                onChange={addPrice}
                w={["80%","50%","40%","30%","20%"]}
                mb="10px"
            /> 
            
            <Input
                isInvalid
                errorBorderColor='crimson'
                placeholder='Description'
                onChange={addDescription}
                w={["80%","50%","40%","30%","20%"]}
                mb="10px"
            />
        </Box>
     
        <Box display={"flex"} justifyContent={"center"} w={"100%"} mt="10px">
            <Button  colorScheme='teal' variant='outline' onClick={addHamburger} >
                Add
            </Button>
        </Box>

<Table minH={"100vh"}>
    <Thead>
            <Tr>
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
            <Tr key={hamburger.Id} >
                <Th>
                    {hamburger.type}
                </Th>
                <Th>
                    {hamburger.price}
                </Th>
                <Th>
                    {hamburger.description}
                </Th>
             
            </Tr>
            )}
    </Tbody>
</Table>
 </div>

    )
}