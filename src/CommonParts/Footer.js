
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
                >
                    <Box display={"flex"} justifyContent="center" w={["100%", "100%", "30%"]}> 
                        <PhoneIcon style={{ fontSize: ['40px'] }}/>
                        <Text  fontSize={["21px", "21px","16px"]} marginLeft={"6px"}>También puedes pedir por teléfono:  91 1933933 / 902 411 114</Text>
                    </Box>

                    <Box  display={"flex"} justifyContent="center" w={[ "100%","100%", "30%"]}  > 
                        <Text fontSize={["21px", "21px","16px"]} >TM & 2020 Burger King Corporation. Todos los derechos reservados.</Text>
                    </Box>

                    <Box  display={"flex"} justifyContent="center" w={[ "100%", "100%","30%"]} >
                        <Link to="https://www.facebook.com/">
                        <FacebookOutlined style={{ fontSize: '40px'  }}/>
                        </Link>
                        <InstagramOutlined style={{ fontSize: '40px' }}/>
                        <TwitterOutlined  style={{ fontSize: '40px' }}/>
                        <YoutubeOutlined  style={{ fontSize: '40px' }}/>
                    </Box>

                </Flex>
            </footer>
      
    )
}