import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra,Form } from "@chakra-ui/react";
import { Input, Text,Box } from '@chakra-ui/react'
import { Button, Stack } from '@chakra-ui/react'
import Commons from "../Utility/Commons";



export default function AddHamburger(){


    let [listOfHamburgers, setListOfHamburgers ] = useState([])
    let [type, setType]=useState("")
    let [price, setPrice]=useState("")
    let [description, setDescription]=useState("")
    const [selectedFile, setSelectedFile] = useState(null);

    let addType =(e)=>{
        setType(e.target.value)
    }

    let addPrice=(e)=>{
        setPrice(e.target.value)
    }

    let addDescription=(e)=>{
        setDescription(e.target.value)
    }

    const onChangeFile = (event) => {
        setSelectedFile(event.target.files[0]);
      };


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



    let createNewHamburger=async()=>{


        const formData = new FormData();
        formData.append('name', type);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('myImage', selectedFile);
        
        let response = await fetch (Commons.baseUrl+"/hamburgers",{
            method: 'POST',
            body:formData
        })
    
            if(response.ok){
                let data = await response.json()
                
    
                console.log(data)
                if(!data.error){
                    setListOfHamburgers((prev) => 
                        [...prev, {
                            name: type,
                            price: price,
                            description:description,
                            id: data.rows.insertId
                        }]
                        
                    )
                }
            } 
        
    }



    return(
            
<Box minH={"100vh"}>
    <Box display={"flex"} justifyContent="center" >
        <Stack direction="column" spacing={3} align="flex-start" w={["80%","70%","60%","50%","50%"]}>
                <Text w={["100%"]}  textAlign="center" >Make new Hamburger</Text>
                <Input
                    name="name"
                    errorBorderColor='crimson'
                    placeholder='Name'
                    onChange={addType}
                /> 

                <Input
                    name="price"
                    errorBorderColor='crimson'
                    placeholder='Price'
                    onChange={addPrice}
                /> 

                <Input
                    name="description"
                    errorBorderColor='crimson'
                    placeholder='Description'
                    onChange={addDescription}
                />
                <Input
                    errorBorderColor='crimson'
                    name="myImage" 
                    type="file"
                    accept=".png" 
                    onChange={onChangeFile}
                />
                <Box  w="100%"  display={"flex"} justifyContent="center" >
                    <Button colorScheme='teal' variant='outline' onClick={createNewHamburger} >
                        Add Hamburder
                    </Button>
                </Box>
            </Stack>
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
</Box>

    )
}