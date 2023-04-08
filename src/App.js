import React, { useState, useEffect, useRef } from 'react';
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
import PointsOfUser from './User/PointsOfUser';
import CompleteOrder from './Order/CompleteOrder';
import AddressUser from './User/AddressUser';

export default function App(props){
  const [percent, setPercent]=useState("80%")
  const [quantity, setQuantity] = useState(0)
  const [hamburgerId, setHamburgerId]=useState(0)

  const [login, setLogin] = useState(false)
  const logOut = useRef(false)


  const [admin, setAdmin] = useState(false)

  const [userId, setUserId] = useState(-1)
  const [quantityInMenu, setQuantityInMenu]= useState(0)
  const [profileAvatar, setProfileAvatar]= useState("")

  const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey',"percent","menyInScreen" ]);


  const [listOfOrders, setListOfOrders]=useState([]) 
  const [isOpen, setIsOpen] = useState(false);

  const [menyInScreen, setMenyInScreen]=useState("block")

  const [url, setUrl]= useState("")
  const [urlGoBackAfterDetailsOrder, setUrlGoBackAfterDetailsOrder]=useState("")



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

      }
    }
  }


  useEffect(()=>{
    console.log(cookieObjectApiKey)
    
    if (cookieObjectApiKey.apiKey != "null" && cookieObjectApiKey.apiKey != "" && cookieObjectApiKey.apiKey != null  ){
      setLogin(true)  
      getInformationUser()
     
    }else{
      setPercent("100%")
      setObjectApiKey("percent","100%",{ path: '/'})
      setObjectApiKey("menyInScreen","none",{ path: '/'})
      setMenyInScreen("none")
      setLogin(false)  
    }

    updateQuantity()
  },[])


  return (
    <Box display={"flex"}>
      <Box w={{ base: "none", xl: percent }} >
        <Menu logOut={logOut} setMenyInScreen={setMenyInScreen}  setUrlGoBackAfterDetailsOrder={setUrlGoBackAfterDetailsOrder} url={url} setUrl={setUrl}   isOpen={isOpen} setIsOpen={setIsOpen} percent={percent} setPercent={setPercent} updateQuantity={updateQuantity} setLogin={setLogin} login={login} admin={admin} setAdmin={setAdmin} setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu} profileAvatar={profileAvatar} setProfileAvatar={setProfileAvatar}/>
          <Box pt={["100px","100px","100px","100px"]}>
          <Routes>
            <Route path='/' element={<ListHamburgers/>} />
            <Route  path='/hamburgers/all' element={<ListHamburgers/>} />
          { admin && <Route path='/hamburgers/addNew' element={<AddHamburgers/>} />}
          { admin && <Route path='/hamburgers/status' element={<StatusOrder login={login}/>} />}
            <Route path='/hamburgers' element={<TableHamburgers setUrl={setUrl}/>} />
            <Route path='/orderPack' element={<ListDoneOrders login={login} />} />
            <Route path='/order/details/:doneOrdersDetailsId' element={<DetailsDoneOrders admin={admin} urlGoBackAfterDetailsOrder={urlGoBackAfterDetailsOrder}/>} />
            <Route path='/order/:id' element={<DetailsHamburgers setUrl={setUrl} setHamburgerId={setHamburgerId} hamburgerId={hamburgerId} setQuantity={setQuantity} quantity={quantity}  listOfOrders={listOfOrders} setListOfOrders={setListOfOrders}  login={login} userId={userId}  setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}  />} />
            <Route path='/order/hamburgers' element={<ListOrder setMenyInScreen={setMenyInScreen} setPercent={setPercent}  login={login}  setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />
            {!login && <Route path='/login' element={<LoginUser url={url} setUrl={setUrl}  logOut={logOut} setMenyInScreen={setMenyInScreen}  setPercent={setPercent} setUserId={setUserId} updateQuantity={updateQuantity} setProfileAvatar={setProfileAvatar} login={login} setLogin={setLogin} setAdmin={setAdmin} />} />}
            <Route path='/login/create-account' element={<AddUser url={url}  logOut={logOut} updateQuantity={updateQuantity}  setMenyInScreen={setMenyInScreen}  setPercent={setPercent} setUserId={setUserId} setLogin={setLogin} setAdmin={setAdmin}  setProfileAvatar={setProfileAvatar}/>} />
            {login && <Route path='/user' element={<ProfileUser login={login} setProfileAvatar={setProfileAvatar} />} />}
            {login && <Route path='/user/points' element={<PointsOfUser />} />}
            {login && <Route path='/user/address' element={<AddressUser />} />}
            {login && <Route path='/completeOrder' element={<CompleteOrder  setHamburgerId={setHamburgerId} hamburgerId={hamburgerId}  setUrl={setUrl}  logOut={logOut} login={login} setPercent={setPercent} setMenyInScreen={setMenyInScreen} setProfileAvatar={setProfileAvatar} setListOfOrders={setListOfOrders} setQuantityInMenu={setQuantityInMenu} setQuantity={setQuantity}   listOfOrders={listOfOrders}/>} />}
            <Route path='/menu' element={<PhoneMenu setMenyInScreen={setMenyInScreen}  setUrl={setUrl}  isOpen={isOpen} setIsOpen={setIsOpen} admin={admin}  profileAvatar={profileAvatar}  login={login} setPercent={setPercent} setProfileAvatar={setProfileAvatar} setLogin={setLogin} setAdmin={setAdmin} />} />
          </Routes>
        </Box>
        <Footer/>
      </Box>

      <Box  display={{ base: "none", xl:menyInScreen }} > 
        {login && 
          <ListOrder  url={url} setUrl={setUrl}  setHamburgerId={setHamburgerId} hamburgerId={hamburgerId} setQuantity={setQuantity} quantity={quantity} listOfOrders={listOfOrders} setListOfOrders={setListOfOrders}  login={login}  setQuantityInMenu={setQuantityInMenu} setPercent={setPercent} quantityInMenu={quantityInMenu}/>
        }
        </Box>
      </Box>
  )
}