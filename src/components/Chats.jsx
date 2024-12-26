import React, { useContext, useEffect, useState } from "react";
import {doc, onSnapshot} from "firebase/firestore";
import {db} from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";

const Chats=()=>{
    const [chats,setChats] = useState([]);
    const {currentUser} = useContext(AuthContext);
    const {dispatch} = useContext(ChatContext);

    useEffect(()=>{
        const getChats =()=>{
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
             });
             return ()=>{
                 unsub()
             }
        }
        currentUser.uid && getChats()
    },[currentUser.uid]);
    // console.log(Object.entries(chats))
    const handleSelect = (u)=>{
        dispatch({type:"CHANGE_USER", payload: u })
    }
    const getMessageSentTime = (timestamp) => {
        if (!timestamp) {
          return ''; 
        }
        const date = timestamp.toDate(); 
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return date.toLocaleString('en-US', options);
      };

    return (
        <div className="chats" >
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat)=>(
            <div className="userChat" key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} >
                <img src={chat[1].userInfo.photoURL} alt="imgg" />
                <div className="userChatInfo" >
                    <span>{chat[1].userInfo.displayName}</span>
                    <div className='TimeMessage'>
                       <span className='lastMsg'>{chat[1].lastMessage?.text}</span>
                        <p className='time'>{getMessageSentTime(chat[1].date)}</p>
                    </div>
                </div>
            </div>
            ))}
            
            
        </div>
    )
}
export default Chats;