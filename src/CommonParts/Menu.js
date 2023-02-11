
import React from 'react';
import { HamburgerIcon, CloseIcon,ArrowForwardIcon} from '@chakra-ui/icons';
import { Box, Flex, Text, Button, Stack, Img } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useNavigate   } from "react-router-dom";
import objectApiKey from "../Utility/ApiKey"

export default function Menu(props){
  const navigate  = useNavigate();

  let logOut=async()=>{
      let response = await fetch ("http://localhost:2000/login/log-out?apiKey="+objectApiKey.apiKey,{
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
            navigate("/hamburgers/all")
        }
          
      }  
  }
  
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const MenuLinks = ({ isOpen }) => {
      return (
        <div>
            <header>
              <Box
                display={{ base: isOpen ? "block" : "none", md: "block" }}
                flexBasis={{ base: "100%", md: "auto" }}
              >
                <Stack
                  spacing={8}
                  align="center"
                  justify={["center", "space-between", "flex-end", "flex-end"]}
                  direction={["column", "row", "row", "row"]}
                  pt={[4, 4, 0, 0]}
                
                  marginRight={"200px"}
                >

                  <Link to="/hamburgers/all">
                    <Text display="block" >
                      Home
                    </Text>
                  </Link>

                  {props.admin &&<Link to="/hamburgers/addNew">
                    <Text display="block" >
                      Add new Hamburger
                    </Text>
                  </Link>
                  }
                    
                  <Link to="/hamburgers">
                    <Text display="block" >
                      Hamburgers
                    </Text>
                  </Link>

                  {props.login &&
                  <Link to="/order/hamburgers">
                    <Text display="block" >
                      My order 
                    </Text>
                  </Link>}

                
                  {props.login &&<Link to="/orderPack">
                    <Text display="block" >
                      History of orders
                    </Text>
                  </Link>}

                  {!props.login &&
                  <Link to="/login">
                    <Text display="block" >
                      Login
                    </Text>
                  </Link>}
                  
                  {props.login &&
                    <Button  bg={"none"} onClick={logOut}  >
                      Log out <ArrowForwardIcon/>
                    </Button>
                  }
              

                </Stack>
              </Box>
            </header>   
          </div>
      );

    };

    return (
      <body>
        <Flex  as="nav" align="center" justify="space-between"
            wrap="wrap"  w="100%" mb={8}  p={3} 
            bg={["primary.500", "primary.500", "primary.500", "primary.500"]}
            color={["white", "white", "white", "white"]}>
          <Img marginLeft="200" src="/images/logo.png" alt="Logo restaurant" />
          <Box 
            display={{ base: "block", md: "none" }} onClick={toggle} >
            {isOpen ? <CloseIcon w={8} h={8}/> : <HamburgerIcon  w={8} h={8}/>}
          </Box>
          <MenuLinks
          isOpen={isOpen} />
        </Flex>
      </body>
    )
  }