import React,{useState, useEffect, useRef} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra,Form,Alert,Input, Text,Box ,Button, Stack,AlertIcon,AlertTitle } from "@chakra-ui/react";
import Commons from "../Utility/Commons";



export default function AddHamburger(){


    let [listOfHamburgers, setListOfHamburgers ] = useState([])
    let [name, setName]=useState("")
    let [price, setPrice]=useState("")
    let [description, setDescription]=useState("")
    const [selectedFile, setSelectedFile] = useState(null);
    const [alert, setAlert]=useState(false)
    const [alertDone, setAlertDone]=useState(false)
    const img = useRef(null)

    let addName =(e)=>{
        setName(e.target.value)
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
        formData.append('name', name);
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

                    if(data.messege=="done"){ 
                        setListOfHamburgers((prev) => 
                            [...prev, {
                                name: name,
                                price: price,
                                description:description,
                                id: data.rows.insertId
                            }]
                            
                        )
                        setAlertDone("Hamburger "+ name + " added")
                    }else{
                        setAlert(data.messege)
                    }
                }
               
            } 
            setSelectedFile("")
            setName("")
            setDescription("")
            setPrice("")
            img.current.value=""
    }



    return(
            
<Box minH={"100vh"}>
    <Box display={"flex"} justifyContent="center" >
        <Stack direction="column" spacing={3} align="center" w={["80%","70%","60%","50%","50%"]}>
                <Text w={["100%"]}  textAlign="center" >Make new Hamburger</Text>
                {alert &&                 
                <Box w={["90%","90%","80%","80%","60%"]} display={"flex"}  justifyContent="center" alignItems={"center"}  >
                            <Alert status='error'  borderRadius='10px' width={"500px"}  >
                                <AlertIcon />
                                <AlertTitle>{alert}</AlertTitle>
                            </Alert>
                </Box>
                }
                {alertDone &&                 
                <Box w={["90%","90%","80%","80%","60%"]} display={"flex"}  justifyContent="center" alignItems={"center"}  >
                            <Alert status='success'  borderRadius='10px' width={"500px"}  >
                                <AlertIcon />
                                <AlertTitle>{alertDone}</AlertTitle>
                            </Alert>
                </Box>
                }
                <Input
                    name="name"
                    errorBorderColor='crimson'
                    placeholder='Name'
                    onChange={addName}
                    value={name}
                /> 

                <Input
                    name="price"
                    errorBorderColor='crimson'
                    placeholder='Price'
                    onChange={addPrice}
                    value={price}
                /> 

                <Input
                    name="description"
                    errorBorderColor='crimson'
                    placeholder='Description'
                    onChange={addDescription}ç
                    value={description}
                />
                <Input
                    errorBorderColor='crimson'
                    name="myImage" 
                    type="file"
                    accept=".png" 
                    onChange={onChangeFile}
                    ref={img}
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