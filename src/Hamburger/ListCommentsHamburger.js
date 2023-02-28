
import React,{useState, useEffect, useRef} from "react"
import { Button, 
    Text, Box,  Input,Avatar,
    Textarea, Alert, AlertTitle,AlertIcon  } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {  ExternalLinkIcon, DeleteIcon, EditIcon, CheckIcon} from '@chakra-ui/icons'
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie'; 

export default function ListCommentsHamburger(props){

    const [cookieObjectApiKey, setObjectApiKey, removeCookiObjectApiKey] = useCookies(['apiKey']);
    let [listOfComments, setListOfComments]=useState([])
    let [changeButtons, setChangeButtons]=useState(false)
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
        setOriginalComment(e.target.value)

    }

    let listComments=async()=>{
        let response = await fetch("http://localhost:2000/comments")
        if(response.ok){
            let data = await response.json()
            if(!data.error){
                setListOfComments(data)
               
            }
        }
       
    }
    
    let addComments=async()=>{
        if(props.login){
            let response = await fetch ("http://localhost:2000/users/comments?apiKey="+cookieObjectApiKey.apiKey,{

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
        let response = await fetch ("http://localhost:2000/users/"+comment.id+"/"+comment.hamburgerId+"?apiKey="+cookieObjectApiKey.apiKey,{
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
        setChangeButtons(true)
    }
    
    let onChangeData = async()=>{
        let response = await fetch ("http://localhost:2000/users/"+selectedCommentId.current+"?apiKey="+cookieObjectApiKey.apiKey,{
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
        setChangeButtons(false)
        setComments("")
        selectedCommentId.current =-1
    }

return(
    <Box>
              { alert && <Box display={"flex"}  justifyContent="center" alignItems={"center"}  >
                    <Alert status='error' width={"400px"}  >
                        <AlertIcon />
                        <AlertTitle>For add comments enter your profile   <Link to="/login" ><ExternalLinkIcon/></Link>  </AlertTitle>
                    </Alert>
                </Box>}
                <Text textAlign={"center"} fontSize={"25"} >Rewiews</Text>
                <Textarea  
                    placeholder="Comments this hamburge Shoul be 3 items and more"
                    w={400}
                    onChange={addFirstComment}
                    value={originalComment}
                    
                />
                <Button onClick={addComments} isDisabled={!originalComment} >Sent</Button>
              
                { 
                listOfComments.sort((a, b) => b.date-a.date )
                .map((comment)=>{


                    if(comment.hamburgerId == id){
                       return <Box key={comment.id} >
                        <Box display={"flex"}  >
                            <Avatar size='sm' name={comment.name} /> 
                            <Text ml={"3"} >{comment.name}</Text>       
                        </Box>  


                      { !changeButtons && 

                        <Box display={"flex"}  justifyContent={"space-between"} >
                            <Text>{comment.comment}</Text>
                            {(props.userId==comment.userId) && <Box>
                                <Button onClick={(e)=>deleteComment(comment)} ><DeleteIcon/></Button>  
                                <Button onClick={(e)=>changeData(comment)} ><EditIcon/></Button>
                            </Box>}
                        </Box>}


                        {(props.userId==comment.userId && selectedCommentId.current==comment.id) &&
                            <Box display={"flex"}>
                               <Input 
                               ref={inputCommentRef}
                               placeholder="Change your comment"
                               value={comments}
                               onChange={userComment}
                               ></Input>
                               { changeButtons && 
                               <Button onClick={onChangeData} isDisabled={!comments}><CheckIcon/></Button>}
                            </Box>
                        }


                            <Text>Date: { 
                              formatDate(comment.date)}
                            </Text>
                        </Box>
                    }
                    
                })}
            </Box>)
}

