import React, { useState, useEffect } from 'react';
import { Route, Routes, useHref } from "react-router-dom"
import ListHamburgers from './Hamburger/ListHamburgers';
import AddHamburgers from './Hamburger/AddHamburgers';
import Menu from './CommonParts/Menu';
import TableHamburgers from './Hamburger/TableHamburgers';
import DetailsHamburgers from './Hamburger/DetailsHamburgers';
import ListOrder from './Order/ListOrder';
import LoginUser from './User/LoginUser';
import AddUser from './User/AddUser';
import ListDoneOrders from './Order/ListDoneOrders';
import DetailsDoneOrders from './Order/DetailsDoneOrders';
import Footer from './CommonParts/Footer';
import ProfileUser from './User/ProfileUser';
import { useCookies } from 'react-cookie'; 
import StatusOrder from './Order/StatusOrder';
import {Box, Hide, Show} from '@chakra-ui/react'
import Commons from './Utility/Commons';
import PhoneMenu from './CommonParts/PhoneMenu';


export default function App(props){
  let [percent, setPercent]=useState("80%")
  let [quantity, setQuantity] = useState(0)
  let [hamburgerId, setHamburgerId]=useState(0)
  let [login, setLogin] = useState(false)
  let [admin, setAdmin] = useState(false)
  let [userId, setUserId] = useState(-1)
  let [quantityInMenu, setQuantityInMenu]= useState(0)
  let [profileAvatar, setProfileAvatar]= useState("")
  const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
  let [listOfOrders, setListOfOrders]=useState([]) 




  let updateQuantity =async()=>{
      let response = await fetch(Commons.baseUrl+"/order/basket?apiKey="+cookieObjectApiKey.apiKey)
      if(response.ok){
          let data = await response.json()
          if(!data.error){
            if(data[0].number){
              setQuantityInMenu(data[0].number)
            }
            if(data[0].number==null){
              setQuantityInMenu(0)
            }
         
          }
      }
  }

  let getInformationUser=async()=>{

   let response = await fetch(Commons.baseUrl+"/users/profile?apiKey="+cookieObjectApiKey.apiKey)
    if(response.ok){
      let data = await response.json()
      if(!data.error){
        let name = data[0].name
        if(name){
          setProfileAvatar(name)
        }
        let admin = data[0].admin
        if(admin=="true"){
          setAdmin(true)

        }
        if(data[0].id){
          setUserId(data[0].id)
        }
        setPercent("80%")
      }
    }
  }


  useEffect(()=>{

    if (cookieObjectApiKey.apiKey != null && cookieObjectApiKey.apiKey != ""){
      setLogin(true)  
      //setProfileAvatar(cookieObjectApiKey.userName)
      getInformationUser()

    }else{
      setPercent("100%")
    }

    updateQuantity()
  },[])


  return (
    <Box display={"flex"}>
      <Box w={["100%","100%","100%","100%",percent]} >
   
        <Menu percent={percent} setPercent={setPercent} updateQuantity={updateQuantity} setLogin={setLogin} login={login} admin={admin} setAdmin={setAdmin} setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu} profileAvatar={profileAvatar} setProfileAvatar={setProfileAvatar}/>
  
        <Box pt={["100px","100px","100px","100px"]}>
          <Routes>
            <Route path='/' element={<ListHamburgers/>} />
            <Route  path='/hamburgers/all' element={<ListHamburgers/>} />
          { admin && <Route path='/hamburgers/addNew' element={<AddHamburgers/>} />}
          { admin && <Route path='/hamburgers/status' element={<StatusOrder  login={login}/>} />}
            <Route path='/hamburgers' element={<TableHamburgers/>} />
            <Route path='/orderPack' element={<ListDoneOrders login={login} />} />
            <Route path='/order/details/:doneOrdersDetailsId' element={<DetailsDoneOrders/>} />
            <Route path='/order/:id' element={<DetailsHamburgers setHamburgerId={setHamburgerId} hamburgerId={hamburgerId} setQuantity={setQuantity} quantity={quantity}  listOfOrders={listOfOrders} setListOfOrders={setListOfOrders}  login={login} userId={userId}  setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />
            <Route path='/order/hamburgers' element={<ListOrder login={login}  setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />
            {!login && <Route path='/login' element={<LoginUser  setPercent={setPercent} setUserId={setUserId} updateQuantity={updateQuantity} setProfileAvatar={setProfileAvatar} login={login} setLogin={setLogin} setAdmin={setAdmin} />} />}
            <Route path='/login/create-account' element={<AddUser setLogin={setLogin} setAdmin={setAdmin}  setProfileAvatar={setProfileAvatar}/>} />
            {login && <Route path='/user' element={<ProfileUser login={login} setProfileAvatar={setProfileAvatar} />} />}
            <Route path='/menu' element={<PhoneMenu admin={admin}  profileAvatar={profileAvatar}  login={login} setPercent={setPercent} setProfileAvatar={setProfileAvatar} setLogin={setLogin} setAdmin={setAdmin} />} />
          </Routes>
        </Box>
        <Footer/>
      </Box>

      <Box  display={{ base: "none", xl: "block" }} > {login && 
        <ListOrder setHamburgerId={setHamburgerId} hamburgerId={hamburgerId} setQuantity={setQuantity} quantity={quantity} listOfOrders={listOfOrders} setListOfOrders={setListOfOrders}  login={login}  setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>}
        </Box>
      </Box>
  )
}