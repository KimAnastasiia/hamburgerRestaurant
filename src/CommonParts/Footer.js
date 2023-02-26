
import { Flex, Text, Box, } from "@chakra-ui/react";
import { PhoneIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined} from '@ant-design/icons';

export default function Footer(props){

 return(
        
            <footer >
                <Flex w="100%"
                margin="0 auto"
                px={12}
                color="white"
                justifyContent="space-between"
                alignItems="center"
                flexWrap={"wrap"}
                height={"20%"}
                bg={["primary.500", "primary.500", "primary.500", "primary.500"]} 
                minHeight={"70px"}
                >
                    <Box display={"flex"} justifyContent="center" w={["100%", "100%", "30%"]}  mb={["2px","2px","20px"]} mt={"20px"}> 
                        <PhoneIcon style={{ fontSize: ["20px"] }}/>
                        <Text  fontSize={["12px","12px","16px"]} marginLeft={"6px"}>También puedes pedir por teléfono:  91 1933933 / 902 411 114</Text>
                    </Box>

                    <Box  display={"flex"} justifyContent="center" w={[ "100%","100%", "30%"]}  mb={"20px"} mt={"20px"}> 
                        <Text fontSize={["12px","12px","16px"]} >TM & 2020 Burger King Corporation. Todos los derechos reservados.</Text>
                    </Box>

                    <Box  display={"flex"} justifyContent="center" w={[ "100%", "100%","30%"]}  mt={["2px","2px","20px"]} mb={["20px","2px","20px"]} >
                        <Box marginRight={"20px"} >
                            <Link to="https://www.facebook.com/">
                                <FacebookOutlined style={{ fontSize: '30px'  }} />
                            </Link>
                        </Box>
                        <Box marginRight={["20px"]} >
                            <InstagramOutlined style={{ fontSize: '30px' }}/>
                        </Box>
                        <Box marginRight={"20px"} >
                            <TwitterOutlined  style={{ fontSize: '30px' }}/>
                        </Box>
                        <Box marginRight={"20px"} >
                            <YoutubeOutlined  style={{ fontSize: '30px' }}/>
                        </Box>
                    </Box>

                </Flex>
            </footer>
      
    )
}