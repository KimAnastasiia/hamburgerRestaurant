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
import objectApiKey from './Utility/ApiKey';
import StatusOrder from './Order/StatusOrder';



export default function App(){
  
  let [login, setLogin] = useState(false)
  let [admin, setAdmin] = useState(false)
  let [quantityInMenu, setQuantityInMenu]= useState(0)
  let [profileAvatar, setProfileAvatar]= useState("")

  let updateQuantity =async()=>{
      let response = await fetch("http://localhost:2000/order/basket?apiKey="+objectApiKey.apiKey)
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

  useEffect(()=>{
    updateQuantity()
  },[])


  return (
    <div>
      <Menu updateQuantity={updateQuantity} setLogin={setLogin} login={login} admin={admin} setAdmin={setAdmin} setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu} profileAvatar={profileAvatar} setProfileAvatar={setProfileAvatar}/>
      <Routes>
        <Route path='/' element={<ListHamburgers/>} />
        <Route path='/hamburgers/all' element={<ListHamburgers/>} />
       { admin && <Route path='/hamburgers/addNew' element={<AddHamburgers/>} />}
       { admin && <Route path='/hamburgers/status' element={<StatusOrder  login={login}/>} />}
        <Route path='/hamburgers' element={<TableHamburgers/>} />
        <Route path='/orderPack' element={<ListDoneOrders login={login} />} />
        {login && <Route path='/user' element={<ProfileUser/>} />}
        <Route path='/order/details/:doneOrdersDetailsId' element={<DetailsDoneOrders/>} />
        <Route path='/order/:id' element={<DetailsHamburgers login={login}   setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />
        <Route path='/order/hamburgers' element={<ListOrder login={login} setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />
        {!login && <Route path='/login' element={<LoginUser updateQuantity={updateQuantity} setProfileAvatar={setProfileAvatar} login={login} setLogin={setLogin} setAdmin={setAdmin} />} />}
        <Route path='/login/create-account' element={<AddUser setLogin={setLogin} setAdmin={setAdmin}  setProfileAvatar={setProfileAvatar}/>} />
        
      </Routes>
      <Footer/>
    
    </div>
  )
}