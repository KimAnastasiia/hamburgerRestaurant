import React, { useState, useEffect } from 'react';
import { Route, Routes, useHref } from "react-router-dom"
import ListOfHamburgers from './Hamburger/ListOfHamburgers';
import { Flex, Thead, Tbody, Tr, Th, Td, chakra, Button, Text, Image, Box, Stack } from "@chakra-ui/react";
import AddHamburger from './Hamburger/AddHamburger';
import Menu from './Menu';
import Hamburgers from './Hamburger/Hamburgers';
import Ditails from './Hamburger/BurgersDetails';
import MyOrder from './Order/MyOrder';
import LoginComponent from './Login';
import objectApiKey from "./ApiKey"
import MakeAccount from './MakeAccount';
import { PhoneIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined} from '@ant-design/icons';
import { Link } from "react-router-dom";
import PreviosOrders from './Order/PreviosOrders';
import PreviosOrdersDitails from './Order/DoneOrdersDetails';

export default function App(){
  let [login, setLogin] = useState(false)
  let[admin, setAdmin] = useState(false)
  return (
    <div>
      <br></br>
      <Menu setLogin={setLogin} login={login} admin={admin} setAdmin={setAdmin}/>

      <br></br>
      <br></br>
      <Routes>
        <Route path='/' element={<ListOfHamburgers/>} />
        <Route path='/hamburgers/all' element={<ListOfHamburgers/>} />
        <Route path='/hamburgers/addNew' element={<AddHamburger/>} />
        <Route path='/hamburgers/all' element={<ListOfHamburgers/>} />
        <Route path='/hamburgers' element={<Hamburgers/>} />
        <Route path='/orderPack' element={<PreviosOrders/>} />
        <Route path='/order/ditails/:doneOrdersDitailsId' element={<PreviosOrdersDitails/>} />
        <Route path='/order/:id' element={<Ditails login={login} />} />
        <Route path='/order/hamburgers' element={<MyOrder/>} />
        {!login && <Route path='/login' element={<LoginComponent login={login} setLogin={setLogin} setAdmin={setAdmin} />} />}
        <Route path='/login/create-account' element={<MakeAccount/>} />
      </Routes>
      <Box bg={["primary.500", "primary.500", "primary.500", "primary.500"]} w="100%">
      <footer >
        <Flex w="100%"
          margin="0 auto"
          px={12}
          color="white"
          justifyContent="space-between"
          alignItems="center"
        
          height={16}
        >
          <Box display={"flex"} justifyContent="center" w={"30%"}> 
            <PhoneIcon style={{ fontSize: '40px' }}/>
            <Text  marginLeft={"6px"}>También puedes pedir por teléfono:  91 1933933 / 902 411 114</Text>
          </Box>

          <Box  display={"flex"} justifyContent="center" w={"30%"}  > 
            <Text>TM & 2020 Burger King Corporation. Todos los derechos reservados</Text>
          </Box>

          <Box  display={"flex"} justifyContent="center"  w={"30%"} >
            <Link to="https://www.facebook.com/">
              <FacebookOutlined style={{ fontSize: '40px'  }}/>
            </Link>
            <InstagramOutlined style={{ fontSize: '40px' }}/>
            <TwitterOutlined  style={{ fontSize: '40px' }}/>
            <YoutubeOutlined  style={{ fontSize: '40px' }}/>
          </Box>

        </Flex>
      </footer>
    </Box>
    </div>
  )
}