import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { Input, Text } from '@chakra-ui/react'
import { Button, Stack } from '@chakra-ui/react'




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
        let response = await fetch("http://localhost:2000/hamburgers")
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfHamburgers(data)
            }
        }
    }   


    let addHamburger=async()=>{
        let response = await fetch ("http://localhost:2000/hamburgers",{

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
            
        <body>
            <main>
                <section>
                    <article>

                            <Stack minH={"30vh"} direction="column" spacing={3} align="flex-start">
                                <Text w={["100%"]}  textAlign="center" >Make new Hamburger</Text>
                                <Input
                                    isInvalid
                                    errorBorderColor='crimson'
                                    placeholder='new Hamburger'
                                    onChange={addType}
                                /> 
                                
                                <Input
                                    isInvalid
                                    errorBorderColor='crimson'
                                    placeholder='Price'
                                    onChange={addPrice}
                                /> 
                                
                                <Input
                                    isInvalid
                                    errorBorderColor='crimson'
                                    placeholder='Description'
                                    onChange={addDescription}
                                />
                                <Button colorScheme='teal' variant='outline' onClick={addHamburger} >
                                    Add Hamburder
                                </Button>
                            </Stack>
                    </article>
                </section>
                <section>
                    <article>
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
                                    <Tr>
                                        <Th>
                                            {hamburger.type}
                                        </Th>
                                        <Th>
                                            {hamburger.price}
                                        </Th>
                                        <Th>
                                            {hamburger.description}
                                        </Th>
                                        <Th>
                                            {hamburger.id}
                                        </Th>
                                    </Tr>
                                    )}
                            </Tbody>
                        </Table>
                    </article>
                </section>
            </main>
        </body>   
  
    )
}