
import { Flex, Text, Box, } from "@chakra-ui/react";
import { PhoneIcon } from '@chakra-ui/icons'
import { Link } from "react-router-dom";
import { InstagramOutlined, FacebookOutlined, TwitterOutlined, YoutubeOutlined} from '@ant-design/icons';

export default function Footer(props){

 return(
        <Box  bg={["primary.500", "primary.500", "primary.500", "primary.500"]} w="100%">
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
    )
}