
import React,{useState, useEffect, useRef} from "react"
import { Button, 
    Text, Box,  Input,Avatar,
    Textarea, Alert, AlertTitle,AlertIcon,Container  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {  ExternalLinkIcon, DeleteIcon, EditIcon, CheckIcon} from '@chakra-ui/icons'
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'; 
import Commons from "../Utility/Commons";
export default function ListCommentsHamburger(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    let [listOfComments, setListOfComments]=useState([])

    let [comments, setComments]=useState("")
    let [originalComment, setOriginalComment]=useState("")
    let inputCommentRef = useRef(null)
    let selectedCommentId = useRef(-1)
    let [alert, setAlert]=useState(false)
    const {id} = useParams()



    useEffect (()=>{  
        listComments()
    },[])


    useEffect (()=>{ 
        if (inputCommentRef != null && inputCommentRef.current != null ) {
            inputCommentRef.current.focus();
        }
    },[comments])


    let userComment=(e)=>{
      
        setComments(e.target.value)
    }
    let addFirstComment=(e)=>{
        if(!props.login){
            setAlert(true) 
        }
        setOriginalComment(e.target.value)

    }

    let listComments=async()=>{
        let response = await fetch(Commons.baseUrl+"/comments")
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfComments(data)
               
            }
        }
       
    }
    
    let addComments=async()=>{
        if(props.login){
            let response = await fetch (Commons.baseUrl+"/users/comments?apiKey="+cookieObjectApiKey.apiKey,{

                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },

                body:
                JSON.stringify( { 
                    hamburgerId: id,
                    comment:originalComment
                })
            })
            listComments()
            setComments("")
            setOriginalComment("")
        }else{
            setAlert(true)
        }

    }
    let deleteComment=async(comment)=>{
        let response = await fetch (Commons.baseUrl+"/users/"+comment.id+"/"+comment.hamburgerId+"?apiKey="+cookieObjectApiKey.apiKey,{
            method: 'DELETE' 
        })
        listComments()
    }
    
    let formatDate = (timestamp) => {
        let myDate = new Date(Number(timestamp))
        var yyyy = myDate.getFullYear();
        var mm = myDate.getMonth() + 1; // getMonth() is zero-based
        var dd = myDate.getDate();

        var hours = myDate.getHours()
        var minute = myDate.getMinutes()
        var seconds= myDate.getSeconds()

        return yyyy+"/"+mm+"/"+dd+" "+hours+":"+minute+":"+seconds
    }


    let changeData=async(comment)=>{
        selectedCommentId.current = comment.id
        setComments(comment.comment)

    }
    
    let onChangeData = async()=>{
        let response = await fetch (Commons.baseUrl+"/users/"+selectedCommentId.current+"?apiKey="+cookieObjectApiKey.apiKey,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                comment:comments,
                hamburgerId:id
                })
        })
        listComments()
      
        setComments("")
        selectedCommentId.current =-1
    }

return(
    <Box w={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"} >
            { alert && 
            <Box display={"flex"}  justifyContent="center" alignItems={"center"} mt="20px"  >
                <Alert status='error' width={"400px"}  >
                    <AlertIcon />
                    <AlertTitle>For add comments enter your profile    </AlertTitle>
                </Alert>
            </Box>}
            <Box w={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"} >   
                <Text textAlign={"center"} fontSize={"25"} m="20px" >Rewiews</Text>
                <Textarea  
                    placeholder="Comments this hamburge Shoul be 3 items and more"
                    w={["90%","80%","70%","60%","30%"]}
                    onChange={addFirstComment}
                    value={originalComment}
                />
                <Button  colorScheme='green' variant='outline' mt="20px" onClick={addComments} isDisabled={!originalComment || !props.login}  w={["50%","40%","30%","20%","10%"]}>Send</Button>
            </Box  >   
                { 
                listOfComments.sort((a, b) => b.date-a.date )
                .map((comment)=>{


                    if(comment.hamburgerId == id){
                       return (
                    <Box w={"100%"}  justifyContent="space-between" display={"flex"} p="20px" alignItems={"center"} flexDirection={"column"} key={comment.id}   >
                        <Box w={"100%"} justifyContent="center" flexDirection={"column"}  display={"flex"} alignItems={"center"}  >  
                           
                            <Box w={["90%","80%","70%","60%","30%"]}  display={"flex"} justifyContent="space-between">
                                <Box display={"flex"}>
                                    <Avatar size='sm' name={comment.name} /> 
                                    <Text ml={"3"} >{comment.name} </Text>    
                                </Box>
                                <Text ml="30px">Date: { 
                                    formatDate(comment.date)}
                                </Text>  
                            </Box>
                                
                         


                            {(props.userId==comment.userId && selectedCommentId.current==comment.id) &&
                                <Box mt={"10px"}  w={["90%","80%","70%","60%","30%"]} display={"flex"} >
                                    <Textarea 
                                    minH="150px"
                                    ref={inputCommentRef}
                                    placeholder="Change your comment"
                                    value={comments}
                                    onChange={userComment}
                                    />
                                  
                                    <Button colorScheme='green' variant='outline'  onClick={onChangeData} isDisabled={!comments}><CheckIcon/></Button>
                                </Box>
                            }

                            { (selectedCommentId.current != comment.id ) &&

                            <Box w={["90%","80%","70%","60%","30%"]}  >
                                <Container >
                                    <Text   mt={"10px"}>{comment.comment} </Text>
                                </Container>
                            </Box>}

                        
                        {( selectedCommentId.current != comment.id && props.userId==comment.userId ) && 
                            <Box w={["90%","80%","70%","60%","30%"]} display="flex" justifyContent={"end"}  >
                                <Box  display={"flex"} justifyContent="end" >
                                    <Button colorScheme='green' variant='outline'  onClick={(e)=>deleteComment(comment)} mr="2px" ><DeleteIcon/></Button>  
                                    <Button colorScheme='green' variant='outline'  onClick={(e)=>changeData(comment)} ml="2px"><EditIcon/></Button>
                                </Box>
                            </Box>}

                       

                        </Box>  
                    
                    </Box>)}
                    
                })}
    </Box>)
}

