
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
  const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);

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
            removeCookiObjectApiKey("apiKey", { path: '/' } )
            removeCookiObjectApiKey("userId",  { path: '/' })
            props.setPercent("100%") 
            navigate("/hamburgers/all")
        }
          
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
                    <Text display="block" >
                      <Link to="/hamburgers/all">
                        Home
                      </Link>
                    </Text>
                  

                  {props.admin &&
                    <Text display="block" >
                      <Link to="/hamburgers/addNew">
                        Add new Hamburger
                      </Link>
                    </Text>
                  }
                  
                  {props.admin &&
                    <Text display="block" >
                      <Link to="/hamburgers/status">
                      Status of orders
                      </Link>
                    </Text>
    
                  }  

                 
                  <Text display="block" >
                    <Link to="/hamburgers">
                      Hamburgers
                    </Link>
                  </Text>
                  


                
                  {props.login &&
                    <Text display="block" >
                      <Link to="/orderPack">
                        History of orders
                      </Link>
                    </Text>
                  }

                  {!props.login &&
                    <Text display="block" >
                      <Link to="/login">
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
                    <Button  bg={"none"} onClick={logOut}  >
                      Log out <ArrowForwardIcon/>
                    </Button>
                  }   
                </Stack>
              </Box>
         
        
      );

    };

    return (
      <header>
          <Flex  as="nav" align="center" justify={["space-between" ,"space-between" ,"space-between" ,"space-around" , "space-around"]} position={"fixed"}
               w={["100%","100%","100%","100%",props.percent]}  p={3} 
                bg={["primary.500", "primary.500", "primary.500", "primary.500"]}
              color={["white", "white", "white", "white"]}>

            <Img mr={"40px"} src="/images/logo.png" alt="Logo restaurant" ml={ ["50px","50px","50px","0","0"]}/>
            
            <Box 
              display={{ base: "block", lg: "none" }} onClick={toggle} >
              {props.isOpen ? <CloseIcon w={8} h={8}  onClick={()=>{ navigate(props.url)}}  /> : <HamburgerIcon onClick={()=>{ navigate("/menu")}}  w={8} h={8}/>}
              
            </Box>
            <MenuLinks/>
         

          </Flex>
          
      </header>
    )
  }