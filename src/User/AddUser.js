import React,{useState, useEffect} from "react"
import { useNavigate   } from "react-router-dom";
import { Input, AlertIcon,InputGroup,InputRightElement,Alert,AlertTitle,
     Button,VStack, Box, Text, Link, Heading, FormLabel,FormErrorMessage,
     FormControl, Select, Option} from '@chakra-ui/react'


export default function AddUser(props){

    let [email,setEmail] = useState("")
    let [password,setPassword] = useState("")

    let [emailDirty, setEmailDirty]=useState(false)
    let [passwordDirty, setPasswordDirty]=useState(false)

    let [emailError, setEmailError]=useState(false)
    let [passwordError, setPasswordError]=useState(false)
    let [nameError, setNameError]=useState(false)
    let [surnameError, setSurnameError]=useState(false)
    let [paymentError, setPaymentError]=useState(false)
    let [countryError, setCountryError]=useState(false)

    let [name, setName]=useState("")
    let [surname, setSurname]=useState("")
    let [payment, setPayment]=useState("")
    let [country, setCountry]=useState("")

    const navigate  = useNavigate();
 
    let addEmail =(e)=>{
        setEmail(e.target.value)
        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if(!re.test(String(e.target.value).toLowerCase())){
            setEmailError("Email is invalid")
        }else{
            setEmailError(false)
        }
    }

    
    let addtPassword =(e)=>{
        setPassword(e.target.value)
        if(e.target.value.length<3 || e.target.value.length>12 ){
            setPasswordError("Password must be longer then 3 and less then 8")
            if(!e.target.value){
                setPasswordError("Empty password")
            }
        }else{
            setPasswordError(false)
        }
    }

    let addName =(e)=>{
        setName(e.target.value)
        if(e.target.value.length<2 || !e.target.value){
            setNameError("Invalid value for name")
        }else{
            setNameError(false)
        }
    }

    let addSurname =(e)=>{
        setSurname(e.target.value)
        if(e.target.value.length<2 || !e.target.value){
            setSurnameError("Invalid value for surname")
        }else{
            setSurnameError(false)
        }
    }
    let addCountry =(e)=>{
        setCountry(e.target.value)
    }
    let addPayment =(e)=>{
        setPayment(e.target.value)
    }
    const blurHandler = (e)=>{

        if(e.target.name==="email"){
            setEmailDirty(true)
        }
        if ( e.target.name==="password"){
            setPasswordDirty(true)
        }
    }
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    let allUsers=async()=>{
     
        let response = await fetch ("http://localhost:2000/users?email="+email)
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                if(data.length>0){
                    setEmailError("Email is already taken")
                    return true
                }else{
                    return false
                }
            }
        }
    }

    let createAccount=async()=>{
        let userExist=allUsers()
       
        if ( !passwordError&& emailDirty && userExist){
            let response = await fetch ("http://localhost:2000/login/create-account",{

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            body:
                JSON.stringify( { 
                    email:email,
                    password:password,
                    name: name,
                    surname:surname,
                    country:country,
                    payment:payment
                })
            })
            navigate("/hamburgers/all")
        }
    }
    
    return(
        <div>
{       
           /* <VStack  p={32} alignItems="flex-start" bg={"pink"} display={"flex"} justifyContent="center">
            <Box minH={"73.6vh"} w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center"  bg={"gray"}>    
                
                <Heading as="h1"  >
                    Create your account
                </Heading>
                <FormControl>
                    <FormLabel  htmlFor="email">Email</FormLabel>
                    <Input 
                        onChange={addEmail}
                        pr='4.5rem'
                        type={"email"}
                        placeholder='Enter email'
                        w={"20%"}
                        id="email"
                    />
                    <FormErrorMessage>Write a email</FormErrorMessage>
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input onChange={addtPassword}
                        type="password"
                        pr='4.5rem'
                        placeholder='Enter password'
                        w={"20%"}
                        id="password"
                    />
                </FormControl>
                <br></br>
                <Button  onClick={createAccount} w="10%" m={"2"}>
                   Continium
                </Button> 
                <Button w="10%" >
                    <Link href={"/login"} >I already have account</Link>
                </Button>
            </Box> 
</VStack>*/ }
   
        <Box  w={"100%"} display={"flex"} flexDirection="column" justifyContent={"center"} alignItems="center" minH={"100vh"}>  
        <Text m={"30"} >Create your account</Text>
        {nameError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{nameError}</AlertTitle>
                        </Alert>
            </Box>}
        <Input mb={"15"} w={"20%"} pr='4.5rem'  placeholder="Enter name" onChange={addName}/>
        {surnameError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{surnameError}</AlertTitle>
                        </Alert>
            </Box>}
        <Input mb={"15"} w={"20%"} pr='4.5rem'  placeholder="Enter surname" onChange={addSurname}/>
        {countryError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{countryError}</AlertTitle>
                        </Alert>
            </Box>}
        <Select mb={"15"} w={"20%"} pr='4.5rem' onChange={addCountry} >
            {countryList.map((country)=> <option value={country}>{country}</option>)}
        </Select>
        {paymentError &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{paymentError}</AlertTitle>
                        </Alert>
            </Box>}
        <Input mb={"15"} w={"20%"} pr='4.5rem'  placeholder="Enter your payment" onChange={addPayment} />
        {(emailDirty && emailError) &&                 
        <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                    <Alert status='error' width={"500px"}  >
                        <AlertIcon />
                        <AlertTitle>{emailError}</AlertTitle>
                    </Alert>
        </Box>}
        <Input 
            mb={"15"}
            onBlur={e=>blurHandler(e)}
            onChange={addEmail}
            pr='4.5rem'
            type={"email"}
            placeholder='Enter email'
            w={"20%"}
            name="email"
            value={email}
        />
        {(passwordDirty && passwordError) &&                 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                        <Alert status='error' width={"500px"}  >
                            <AlertIcon />
                            <AlertTitle>{passwordError}</AlertTitle>
                        </Alert>
            </Box>}
        <Input 
            onBlur={e=>blurHandler(e)}
            onChange={addtPassword}
            type="password"
            pr='4.5rem'
            placeholder='Enter password'
            w={"20%"}
            name="password"
            value={password}
            mb={"15"}
        />
 
        <Button bg={["primary.500", "primary.500", "primary.500", "primary.500"]} color="white" onClick={createAccount} w="20%" m={"2"}>
            Continium
        </Button> 
        <Button w="10%" bg={"blue.200"} >
            <Link href={"/login"} >I already have account</Link>
        </Button>
        </Box> 
    </div>
)}