import React,{useState, useEffect} from "react"
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";


export default function ListHamburgers(){
    
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
<section>
    <article>
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
                    <Tr>
                        <Th>
                        <img src={"/images/"+hamburger.type+".png"} />
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

)
}