import React,{useState, useEffect} from "react"
import {
    Checkbox,AlertIcon,Alert,
    Input,AlertTitle,
    Textarea,SliderTrack,
    Box,Slider,SliderThumb,SliderFilledTrack,
    Button,Text,Select,Switch,Stack
} from '@chakra-ui/react'
import { ReadOutlined} from '@ant-design/icons';
import Commons from "../Utility/Commons";
import { useCookies } from 'react-cookie';
import { useNavigate   } from "react-router-dom";

export default function CompleteOrder(props){
    
    const navigate  = useNavigate();
    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    const [user, setUser ] = useState({})
    const [spendPoints, setSpendPoints]=useState(false)
    const [sliderValue, setSliderValue]=useState(0)
    const [commentForAddress,setCommentForAddress]=useState("")
    const [commentForOrder,setCommentForOrder]=useState("")

    const [call, setCall]=useState(0)
    const [alert, setAlert] = useState(false)
    const [time, setTime]=useState("in time")
    const [date, setDate]=useState("in time")

    const [putDate, setPutDate]=useState(false)

    const [payment, setPayment]=useState("Cash")
    
    useEffect (()=>{ 
        getInformationAboutUser()
        props.setPercent("100%")
        props.setMenyInScreen("none")
    },[])

    useEffect(() => {
        return () => {
            props.setPercent("80%")
            props.setMenyInScreen("block")
        };
      }, []);

    let addPayment =(e)=>{
        setPayment(e.target.value)
    }
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
    let callBefore=()=>{

        if(call===0){
            setCall(1)
        }else{
            setCall(0)
        }

    }
    let deliveryTime=(e)=>{
        if(e.target.value==="Delayed Delivery"){
            setPutDate(true)
        }
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
    let orderPackid

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
               total: total-sliderValue
            })

        })
        if(responseOrderPack.ok){
            data = await responseOrderPack.json()
            console.log(data.rows.insertId)
            orderPackid=data.rows.insertId
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
        setCommentForOrder("")
        setCommentForAddress("")
        setSliderValue(0)
        setSpendPoints(false)
        updateDetailsOfOrserInOrserPack()
    }

    let updateAdress=async()=>{
        
        let response = await fetch(Commons.baseUrl+"/users/address?apiKey="+cookieObjectApiKey.apiKey,  

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ 
                    street:user.street,
                    entrance:user.entrance,
                    floor:user.floor,
                    apartment:user.apartment,
                    intercom:user.intercom,
                    points: user.points-sliderValue,
                    payment: payment
                })
            }

        )
    }

    let updateDetailsOfOrserInOrserPack=async()=>{

        let response = await fetch(Commons.baseUrl+"/orderPack/orderDetails?apiKey="+cookieObjectApiKey.apiKey,  

        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body:
                JSON.stringify({ 
                    call:call,
                    deliveryDate:date,
                    deliveryTime:time,
                    commentForAdress:commentForAddress,
                    commentForOrder:commentForOrder,
                    id:orderPackid
                })
            }

        )
        setPutDate(false)
        updateAdress()
    }

    

    let controlPoints=(val)=>{
        if(val===(user.points/100)*80){
            setAlert("You can pay a maximum of 80% of the total amount with points")
        }
        if(val<=(user.points/100)*80){
            setSliderValue(val)
        }
        if(val<(user.points/100)*80){
            setAlert(false)
        }
    }


    return(
        <Box  minH={"100vh"}   pt={"50px"} alignItems="center" justifyContent={"space-around"} >
            {(props.listOfOrders.length == 0 )&&
            <Box h={"600px"} display={"flex"} justifyContent="center" flexDirection={"column"} alignItems="center" > 
                <Text mb={"20px"} fontSize={["16px","16px","16px","16px","16px","19px","23px","25px"]} >You haven't placed any order yet</Text>
                <Button bg={["primary.500", "primary.500", "primary.500", "primary.500"]}  w="80%" onClick={()=>{navigate("/hamburgers")}}>
                    <ReadOutlined style={{ fontSize: '20px', color: 'white' }} /> 
                    <Text color={"white"} ml="10px">See menu </Text>
                </Button>
            </Box>
             }
            {(props.listOfOrders.length >0 )&&
            <div>
            <Text mb="20px" textAlign={"center"} fontSize={"50px"} w="100%">Your order</Text>
            <Box   fontSize={"20px"}  display={["flex"]} alignItems={["center","center","flex-start","flex-start","flex-start"]} flexDirection={["column","column","row","row","row"]} justifyContent={["center"]}  w={["100%"]}>
                <Box display={"flex"} flexDirection="column" justifyContent={["center"]} alignItems="center" >
                    <Box w={["90%","90%","80%","80%","80%"]} border={"1px"} borderColor="lightGray" borderRadius='lg' mb={"30px"}  minH={"400px"}  p={"20px"}>
                        <Text fontSize={"25px"} mb="10px">Address</Text>
                        <Box  mb={"10px"} display={"flex"} alignItems="center" justifyContent={"space-between"}>
                            <Text mr={"20px"} w="30%" mb='8px'>street:</Text>
                            <Input w={"70%"} value={user.street} required onChange={(e)=>setUser({...user, street:e.target.value})} placeholder="street" mb={"10px"} ></Input>
                        </Box>
                        <Box  mb={"10px"} display={"flex"}alignItems="center" justifyContent={"space-between"}>
                            <Text  mr={"20px"} w="30%" mb='8px'>entrance:</Text>
                            <Input value={user.entrance} onChange={(e)=>setUser({...user, entrance:e.target.value})}w={"70%"}  placeholder="entrance" ></Input>
                        </Box>
                        <Box  mb={"10px"} display={"flex"}alignItems="center" justifyContent={"space-between"}>
                            <Text  mr={"20px"} w="30%" mb='8px'>floor:</Text>
                            <Input value={user.floor} onChange={(e)=>setUser({...user, floor:e.target.value})} w={"70%"}  placeholder="floor"></Input>
                        </Box>    
                        <Box  mb={"10px"} display={"flex"} alignItems="center" justifyContent={"space-between"}>
                            <Text mr={"20px"} w="30%" mb='8px'>apartment:</Text>
                            <Input value={user.apartment} onChange={(e)=>setUser({...user, apartment:e.target.value})} w={"70%"}  placeholder="apartment"></Input>
                        </Box>    
                        <Box  mb={"10px"} display={"flex"} alignItems="center" justifyContent={"space-between"}>
                            <Text  mr={"20px"} w="30%" mb='8px'>intercom:</Text>
                            <Input value={user.intercom} onChange={(e)=>setUser({...user, intercom:e.target.value})} w={"70%"}  placeholder="intercom" ></Input>
                        </Box>
                        <Textarea value={commentForAddress} onChange={e=>{setCommentForAddress(e.target.value)}}  mb="10px" placeholder="comments for adress" ></Textarea>
                        <Checkbox defaultChecked  mb="15px" onChange={callBefore} >Do not call to check the order </Checkbox>
                        <Text fontSize={"25px"} mb="10px" >Delivery time</Text>
                        <Select onChange={deliveryTime} >
                            <option value='Delayed Delivery'>Delayed Delivery</option>
                            <option  selected value='As fast as possible'>As fast as possible</option>
                        </Select>
                        {putDate &&
                        <Box>
                            <Input  mt="10px" w={"23%"} type="date" onChange={(e)=>setDate(e.target.value)}  mr={[0,0,0,0,"10px"]}></Input>
                            <Input  mt="10px" w={"23%"} type="time" onChange={(e)=>setTime(e.target.value)}  ></Input>
                        </Box>}
                    </Box>

                    <Box w={["90%","90%","80%","80%","80%"]} border={"1px"} borderColor="lightGray" borderRadius='lg' p={"20px"} mb="20px" >

                        <Text fontSize={"25px"} mb="10px" >Dishes in order</Text>
                        <Textarea w={"100%"} value={commentForOrder} onChange={(e)=>{setCommentForOrder(e.target.value)}} placeholder="comment for order" ></Textarea>
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
        
                <Box display={"flex"} justifyContent="center" flexDirection={"column"}  border={"1px"} borderColor="lightGray" borderRadius='lg'  p={"20px"} mb="30px" w={["90%","90%","60%","60%","30%"]}>
                    <Text  fontSize={"25px"} mb="10px">Payment</Text>
                    <Select onChange={addPayment} >
                        <option value="Cash"  selected={user.payment==="Cash"}>Cash</option>
                        <option value='Cart'  selected={user.payment==="Cart"}>Cart</option>
                        <option value='Pay Pal'  selected={user.payment==="Pay Pal"}>Pay Pal</option>
                    </Select>
                    <>
                   { (user.points>0) &&
                   <Box  display={"flex"} flexDirection="column" justifyContent="space-around" >
                     { alert &&
                        <Box  mt={"10px"} display={"flex"}  justifyContent="center" alignItems={"center"}  >
                            <Alert borderRadius='lg'  status='error' width={"90%"}  >
                                <AlertIcon />
                                <AlertTitle>{alert}</AlertTitle>
                            </Alert>
                        </Box>}
                       <Box display={"flex"} justifyContent="space-around">
                            <Text>Spend points  {user.points}</Text>
                            <Stack  align='center' direction='row'>
                            { (totall <= 0 ) && <Switch size='sm' htmlFor='isFocusable'  />}
                            { (totall > 0 ) && <Switch size='sm' onChange={showSlider}  />}
                            </Stack>
                        </Box>
                    </Box>}

                  { spendPoints &&  
                    <Box>
                        <Slider aria-label='slider-ex-1' defaultValue={0}  onChange={(val)=>{controlPoints(val)}}  value={sliderValue}  min={0} max={user.points}>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                        <Text textAlign={"center"} > {sliderValue} points will be deducted</Text>
            
                    </Box>
                    }

                    </>
                    { (user.points>0) &&
                    <div>
                    <Box mt={"10px"} display={"flex"} justifyContent="space-between" >
                        <Text>Meal cost </Text>
                        <Text> {totall} euro</Text>
                    </Box>
                   <Box mt={"10px"} display={"flex"} justifyContent="space-between">
                        <Text>Points</Text>
                        <Text>{sliderValue} euro</Text>
                    </Box>
                    </div>}
                    <Box mt={"10px"} display={"flex"} justifyContent="space-between">
                        <Text>To pay</Text>
                        <Text>{totall-sliderValue} euro</Text>
                    </Box>
                    <Box mt={"10px"} display={"flex"} justifyContent={"center"}>
                        <Button w="80%" bg={"lightblue"} fontSize={"25px"} onClick={complete}>Order</Button>
                    </Box>
                
                  
                </Box>
        
            </Box>
            </div>}
        </Box>
    )
}