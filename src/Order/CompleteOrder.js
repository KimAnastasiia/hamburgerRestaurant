import React,{useState, useEffect} from "react"
import {
    Checkbox,
    Input,
    Textarea,SliderTrack,
    Box,Slider,SliderThumb,SliderFilledTrack,
    Button,Text,Select,Switch,Stack
} from '@chakra-ui/react'
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie';

export default function CompleteOrder(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    const [user, setUser ] = useState({})
    const [spendPoints, setSpendPoints]=useState(false)
    const [sliderValue, setSliderValue]=useState(0)
    
    const [street, setStreet]=useState("")
    const [entrance, setEntrance]=useState("")
    const [floor, setFloor]=useState("")
    const [apartment, setApartment]=useState("")
    const [intercom, setIntercom]=useState("")
    const [call, setCall]=useState(false)
    const [time, setTime]=useState("in time")
    const [date, setDate]=useState("in time")


    useEffect (()=>{ 
        getInformationAboutUser()
        
    },[])

    let getInformationAboutUser=async()=>{  
        let response = await fetch(Commons.baseUrl+"/users/profile?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setUser(data[0])
            }
            props.setProfileAvatar(data[0].name)
        }  
    }
    let showSlider=()=>{
        setSpendPoints(!spendPoints)
        setSliderValue(0)
    }

    let totall= false
    props.listOfOrders.map((order)=>
        totall+= order.price*order.number
    )
    
    let checkListOfOrders =async()=>{
        let response = await fetch(Commons.baseUrl+"/order/hamburgers?apiKey="+cookieObjectApiKey.apiKey)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                props.setListOfOrders(data)
            }
        }
      
    }
    let complete =async ()=>{

        if(props.listOfOrders.length===0){
            return
        }
        
        let data 
        let total = 0
        props.listOfOrders.map((order)=>total = total + (order.number * order.price))
       
        let responseOrderPack = await fetch (Commons.baseUrl+"/orderPack?apiKey="+cookieObjectApiKey.apiKey,{

            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body:
            JSON.stringify( { 
               total: total,
               call:call,
               deliveryTime:time,
               deliveryDate:date
            })

        })
        if(responseOrderPack.ok){
            data = await responseOrderPack.json()
            console.log(data.rows.insertId)
        }

        let response = await fetch(Commons.baseUrl+"/order/complete?apiKey="+cookieObjectApiKey.apiKey,  
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:
                    JSON.stringify({ 
                        orderPackId:data.rows.insertId
                    })
                }
        )
      
        checkListOfOrders()
        props.setQuantityInMenu(0)
        props.setQuantity(0)
        updateAdress()
    }

    let updateAdress=async()=>{
        
        let response = await fetch(Commons.baseUrl+"/users/adress?apiKey="+cookieObjectApiKey.apiKey,  

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ 
                    street:street,
                    entrance:entrance,
                    floor:floor,
                    apartment:apartment,
                    intercom:intercom
                })
            }

    )}

    

    let controlPoints=(val)=>{
        
        if(val<totall){
            setSliderValue(val)
        }
    }
    return(
        <Box minH={"100vh"} pl={["300px","0px","90px","100px","300px"] } pr={["300px","300px","0px","300px","300px"]} pt={"50px"}>
            <Text mb="20px" fontSize={"50px"} w="100%">Your order</Text>
            <Box fontSize={"20px"}  display={["flex","block","flex","flex","flex"]}  justifyContent="space-between"  w="100%">
                <Box w={["60%","100%","60%","60%","60%"]}>
                    <Box  mb={"30px"}  minH={"400px"}  p={"20px"} bg={"lightblue"} >
                        <Text fontSize={"25px"} mb="10px">Adress</Text>
                        <Input required onChange={(e)=>setStreet(e.target.value)} placeholder="street" mb={"10px"} ></Input>
                        <Box  display={"flex"} justifyContent="space-between" w={"100%"} mb="10px">
                            <Input onChange={(e)=>setEntrance(e.target.value)} w={"23%"} placeholder="entrance" ></Input>
                            <Input onChange={(e)=>setFloor(e.target.value)} w={"23%"} placeholder="floor"></Input>
                            <Input onChange={(e)=>setApartment(e.target.value)} w={"23%"} placeholder="apartment"></Input>
                            <Input onChange={(e)=>setIntercom(e.target.value)} w={"23%"} placeholder="intercom" ></Input>
                        </Box>
                        <Textarea  mb="10px" placeholder="comments for adress" ></Textarea>
                        <Checkbox defaultChecked  mb="15px" onChange={()=>setCall(!call)} >Do not call to check the order </Checkbox>
                        <Text fontSize={"25px"} mb="10px" >Delivery time</Text>
                        <Select placeholder='As fast as possible'>
                            <option value='option1'>Delayed Delivery</option>
                        </Select>
                        <Input  mt="10px" w={"23%"} type="date" onChange={(e)=>setDate(e.target.value)}  mr={"10px"}></Input>
                        <Input  mt="10px" w={"23%"} type="time" onChange={(e)=>setTime(e.target.value)}  ></Input>
                    </Box>

                    <Box p={"20px"} mb="20px" bg={"lightblue"} >

                        <Text fontSize={"25px"} mb="10px" >Dishes in order</Text>
                        <Input w={"90%"} placeholder="comment for order" ></Input>
                        {  props.listOfOrders.map((order)=>
                            <Box mt={"20px"} display={"flex"} justifyContent="space-around" >
                                <Box w={"25%"}> <img src={Commons.baseUrl+"/images/"+order.type+".png"} /></Box>
                                <Box   display={"flex"} justifyContent="space-around" w={"75%"}>
                                    <Box  display={"flex"} flexDirection="column" justifyContent="center" w={"50%"} >
                                        <Box color={"white"}> {order.type}</Box>
                                    </Box>
                                    <Box color={"white"} w={"50%"} justifyContent="space-between" display={"flex"} alignItems={"center"}>
                                        <Text ml={"20px"} display="flex" alignItems="center"> {order.number}  </Text>
                                        <Text>  {order.number*order.price} euro</Text>
                                    </Box>
                                </Box>
                            </Box>
                        )}
                    </Box>
                </Box>
        
                <Box ml={["0%","0%","60%","45%","25%","31%","35%"]} position={["none", "none", "fixed", "fixed", "fixed" ]} h={"400px"}  p={"20px"} bg={"lightblue"} w="30%">
                    <Text  fontSize={"25px"} mb="10px">Payment</Text>
                    <Select mb="10px" placeholder='Cash to courier'>
                        <option value='By card online'>By card online</option>
                        <option value='By card to the courier'>By card to the courier</option>
                        <option value='Fast payment system'>Fast payment system</option>
                    </Select>
                    <>
                    <Box  display={"flex"} justifyContent="space-around" >
                        <Text>Spend points  {user.points}</Text>
                        <Stack  align='center' direction='row'>
                        { (totall <= 0 ) && <Switch size='sm' htmlFor='isFocusable'  />}
                        { (totall > 0 ) && <Switch size='sm' onChange={showSlider}  />}
                        </Stack>
                    </Box>

                  { spendPoints &&  
                    <Box>
                        <Slider aria-label='slider-ex-1' defaultValue={0}  onChange={(val)=>{controlPoints(val)}}  value={sliderValue}  min={0} max={10}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text> {sliderValue} points will be deducted</Text>
            
                    </Box>
                    }

                    </>
                   
                    <Box mt={"10px"} display={"flex"} justifyContent="space-between" >
                        <Text>Meal cost </Text>
                        <Text> {totall} euro</Text>
                    </Box>
                    <Box mt={"10px"} display={"flex"} justifyContent="space-between">
                        <Text>Points</Text>
                        <Text>{sliderValue} euro</Text>
                    </Box>
                    <Box mt={"10px"} display={"flex"} justifyContent="space-between">
                        <Text>To pay</Text>
                        <Text>{totall-sliderValue} euro</Text>
                    </Box>
                    <Box mt={"10px"} display={"flex"} justifyContent={"center"}>
                        <Button w="80%" fontSize={"25px"} onClick={complete}>Order</Button>
                    </Box>
                
                  
                </Box>
        
            </Box>
        </Box>
    )
}