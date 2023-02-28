
import React,{useState, useEffect} from "react"
import { HamburgerIcon, CloseIcon,ArrowForwardIcon} from '@chakra-ui/icons';
import { Box, Flex, Text, Button, Stack, Img, Badge,Avatar } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate   } from "react-router-dom";
import ProfileUser from "../User/ProfileUser";
import { useCookies } from 'react-cookie'; 



export default function Menu(props){
  
  const navigate  = useNavigate();
  const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);

  useEffect(()=>{
      props.updateQuantity()
  },[])


  let logOut=async()=>{
      let response = await fetch ("http://localhost:2000/login/log-out?apiKey="+cookieObjectApiKey.apiKey,{
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
            navigate("/hamburgers/all")
        }
          
      }  
  }

    
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);


    const MenuLinks = ({ isOpen }) => {
      return (
       
              <Box
                display={{ base: isOpen ? "block" : "none",  lg: "block" }}
                flexBasis={{ base: "100%", lg: "auto" }}
              >
                <Stack
                  spacing={8}
                  align="center"
                  justify={"center"}
                  direction={["column", "column", "column","row", "row"]}
                  pt={[4, 4, 0, 0]}
                  marginRight={["0px","0px","0px","200px"]}
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
                      <Link to="/order/hamburgers">
                        My order  <Badge colorScheme='red'>{props.quantityInMenu} </Badge>
                      </Link>
                    </Text>
                  }

                
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
          <Flex  as="nav" align="center" justify="space-between"
              wrap="wrap"  w="100%"  p={3} 
              bg={["primary.500", "primary.500", "primary.500", "primary.500"]}
              color={["white", "white", "white", "white"]}>
            <Img marginLeft={["100px" ,"100px" ,"100px" ,"50px" ,"200px" ]}src="/images/logo.png" alt="Logo restaurant" />
            <Box 
              display={{ base: "block", lg: "none" }} onClick={toggle} >
              {isOpen ? <CloseIcon w={8} h={8}/> : <HamburgerIcon  w={8} h={8}/>}
            </Box>
            <MenuLinks
              isOpen={isOpen} />
          </Flex>
      </header>
    )
  }