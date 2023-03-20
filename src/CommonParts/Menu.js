
import React,{useState, useEffect} from "react"
import { HamburgerIcon, CloseIcon,ArrowForwardIcon} from '@chakra-ui/icons';
import { Box, Flex, Text, Button, Stack, Img, Badge,Avatar,Hide,Show } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate   } from "react-router-dom";
import ProfileUser from "../User/ProfileUser";
import { useCookies } from 'react-cookie'; 
import ListOrder from "../Order/ListOrder";
import Commons from "../Utility/Commons";


export default function Menu(props){
  
  const navigate  = useNavigate();
  const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey',"percent","menyInScreen"]);

  const toggle = () => props.setIsOpen(!props.isOpen);


  useEffect(()=>{
      props.updateQuantity()
  },[])


  let logOut=async()=>{
      let response = await fetch (Commons.baseUrl+"/login/log-out?apiKey="+cookieObjectApiKey.apiKey,{
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          }
      })
      if(response.ok){
        let data = await response.json()
        if(data.messege === "done"){
            props.setLogin(false)   
            props.setAdmin(false) 
            props.setProfileAvatar("User")
            props.logOut.current=true
            //removeCookiObjectApiKey("apiKey", { path: '/' } )
            setObjectApiKey("apiKey", null,  { path: '/' } )
            removeCookiObjectApiKey("userId",  { path: '/' })
            props.setPercent("100%") 
            setObjectApiKey("percent", "100%",  { path: '/' } )
            props.setMenyInScreen("none")
            setObjectApiKey("menyInScreen", "none",  { path: '/' } )
            navigate("/hamburgers/all")
        }
          
      }  
  }

    let navigateClick=()=>{
      if(props.url!="/login"){
        navigate(props.url)
      }
    }



    const MenuLinks = ({isOpen }) => {
      return (
       
              <Box
                display={{ base: isOpen ? "flex" : "none",  lg: "flex" }}
                flexBasis={{ base: "100%", lg: "auto" }}
                justifyContent="flex-end"
               
                
              >
                <Stack
                  
                  spacing={8}
                  align="center"
                  justify={"end"}
                  direction={["column", "column", "column","row", "row"]}
                  pt={[4, 4, 0, 0]}
               
                  w={'100%'}
                 
                >
                    <Button  variant='link' color={"white"}  display="block" >
                      <Link to="/hamburgers/all">
                        Home
                      </Link>
                    </Button>
                  

                  {props.admin &&
                    <Button  variant='link' color={"white"}  display="block" >
                      <Link to="/hamburgers/addNew">
                        Add new Hamburger
                      </Link>
                    </Button>
                  }
                  
                  {props.admin &&
                    <Button variant='link' color={"white"} display="block" onClick={()=>props.setUrlGoBackAfterDetailsOrder("/hamburgers/status" )} >
                      <Link to="/hamburgers/status" >
                      Status of orders
                      </Link>
                    </Button>
    
                  }  

                 
                  <Button variant='link' color={"white"} display="block" >
                    <Link aria-label="hamburgers" to="/hamburgers">
                      Hamburgers
                    </Link>
                  </Button>
                  


                
                  {props.login &&
                    <Button display="block" variant='link' color={"white"} onClick={()=>props.setUrlGoBackAfterDetailsOrder("/orderPack")}>
                      <Link to="/orderPack">
                        History of orders
                      </Link>
                    </Button>
                  }

                  {!props.login &&
                    <Text display="block"  onClick={()=>props.setUrl("/login")} >
                      <Link aria-label="login" to="/login">
                        Login
                      </Link>
                    </Text>
                   }
                  
                  {props.login &&<Link to='/user' >
                    <Avatar size='sm' name={props.profileAvatar}/>
                  </Link>
                  }
                  {!props.login &&<Link to="/login/create-account" >
                    <Avatar size='sm'/>
                  </Link>}
                  

                  {props.login &&
                    <Button  variant='link' color={"white"}  bg={"none"} onClick={logOut}  >
                      Log out <ArrowForwardIcon/>
                    </Button>
                  }   
                </Stack>
              </Box>
         
        
      );

    };

    return (
      <header>
          <Flex zIndex="sticky" as="nav" align="center" justify={["space-between" ,"space-between" ,"space-between" ,"space-around" , "space-around"]} position={"fixed"}
               w={["100%","100%","100%","100%",cookieObjectApiKey.percent]}  p={3} 
                bg={["primary.500", "primary.500", "primary.500", "primary.500"]}
              color={["white", "white", "white", "white"]}>

            <Img mr={"40px"} src="/images/logo.png" alt="Logo restaurant" ml={ ["50px","50px","50px","0","0"]}/>
            
            <Box 
              display={{ base: "block", lg: "none" }} onClick={toggle} >
              {props.isOpen ? <CloseIcon w={8} h={8}  onClick={navigateClick}  /> : <HamburgerIcon onClick={()=>{ navigate("/menu")}}  w={8} h={8}/>}
              
            </Box>
            <MenuLinks/>
         

          </Flex>
          
      </header>
    )
  }