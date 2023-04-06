
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
    let [listOfUsersComments, setListOfUsersComments]=useState([])

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
       if(originalComment.length<1){
        setAlert(false)
       }
    },[originalComment])

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
                setListOfUsersComments(data)
               
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
                    id="userComment"
                    placeholder="Comments this hamburge Shoul be 3 items and more"
                    w={["90%","80%","70%","60%","30%"]}
                    onChange={addFirstComment}
                    value={originalComment}
                    
                />
                <Button id="sentComment" colorScheme='green' variant='outline' mt="20px" onClick={addComments} isDisabled={!originalComment || !props.login}  w={["50%","40%","30%","20%","10%"]}>Send</Button>
            </Box  >   
                { 
                listOfUsersComments.sort((a, b) => b.date-a.date )
                .map((usersComment)=>{


                    if(usersComment.hamburgerId == id){
                       return (
                    <Box id={usersComment.id} w={"100%"}  justifyContent="space-between" display={"flex"} p="20px" alignItems={"center"} flexDirection={"column"} key={usersComment.id}   >
                        <Box w={"100%"} justifyContent="center" flexDirection={"column"}  display={"flex"} alignItems={"center"}  >  
                           
                            <Box w={["90%","80%","70%","60%","30%"]}  display={"flex"} justifyContent="space-between">
                                <Box display={"flex"}>
                                    <Avatar size='sm' name={usersComment.userName} /> 
                                    <Text ml={"3"} >{usersComment.userName} </Text>    
                                </Box>
                                <Text ml="30px">Date: { 
                                    formatDate(usersComment.date)}
                                </Text>  
                            </Box>
                                
                         


                            {(props.userId==usersComment.userId && selectedCommentId.current==usersComment.id) &&
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

                            { (selectedCommentId.current != usersComment.id ) &&

                            <Box w={["90%","80%","70%","60%","30%"]}  >
                                <Container>
                                    <Text  id={"comment-"+usersComment.id}  mt={"10px"}>{usersComment.comment} </Text>
                                </Container>
                            </Box>}

                        
                        {( selectedCommentId.current != usersComment.id && props.userId==usersComment.userId ) && 
                            <Box w={["90%","80%","70%","60%","30%"]} display="flex" justifyContent={"end"}  >
                                <Box  display={"flex"} justifyContent="end" >
                                    <Button  id={"delete-comment-"+usersComment.id} colorScheme='green' variant='outline'  onClick={(e)=>deleteComment(usersComment)} mr="2px" ><DeleteIcon/></Button>  
                                    <Button  edit={"edit-comment-"+usersComment.id} colorScheme='green' variant='outline'  onClick={(e)=>changeData(usersComment)} ml="2px"><EditIcon/></Button>
                                </Box>
                            </Box>}

                       

                        </Box>  
                    
                    </Box>)}
                    
                })}
    </Box>)
}

