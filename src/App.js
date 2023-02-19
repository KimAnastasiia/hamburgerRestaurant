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




export default function App(){
  let [login, setLogin] = useState(false)
  let [admin, setAdmin] = useState(false)
  let [quantityInMenu, setQuantityInMenu]= useState(0)
  let [profileAvatar, setProfileAvatar]= useState("")


  return (
    <div>
      <Menu setLogin={setLogin} login={login} admin={admin} setAdmin={setAdmin} setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu} profileAvatar={profileAvatar} setProfileAvatar={setProfileAvatar}/>
      <Routes>
        <Route path='/' element={<ListHamburgers/>} />
        <Route path='/hamburgers/all' element={<ListHamburgers/>} />
        <Route path='/hamburgers/addNew' element={<AddHamburgers/>} />
        <Route path='/hamburgers' element={<TableHamburgers/>} />
        {login &&<Route path='/orderPack' element={<ListDoneOrders/>} />}
        {login && <Route path='/user' element={<ProfileUser/>} />}
        <Route path='/order/details/:doneOrdersDetailsId' element={<DetailsDoneOrders/>} />
        <Route path='/order/:id' element={<DetailsHamburgers login={login}   setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />
        {login &&<Route path='/order/hamburgers' element={<ListOrder login={login} setQuantityInMenu={setQuantityInMenu} quantityInMenu={quantityInMenu}/>} />}
        {!login && <Route path='/login' element={<LoginUser setProfileAvatar={setProfileAvatar} login={login} setLogin={setLogin} setAdmin={setAdmin} />} />}
        <Route path='/login/create-account' element={<AddUser/>} />
        
      </Routes>
      <Footer/>
    
    </div>
  )
}