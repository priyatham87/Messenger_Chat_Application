import React, { useContext, useState } from "react";
import Cam from "../images/cam.png";
import Add from "../images/add.png";
import More from "../images/more.png";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/chatContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Chat = () => {
  const { data } = useContext(ChatContext);
  const [menuVisible, setMenuVisible] = useState(false);

  const openCamera = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        console.log('Camera opened');
        // Here you can handle the camera stream, such as displaying it in a video element
      })
      .catch((error) => {
        console.error('Error accessing camera:', error);
      });
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleSignOut = () => {
    signOut(auth).catch((error) => {
      console.error('Error signing out:', error);
    });
  };

  return (
    <div className="chat" >
      <div className="chatInfo" >
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <img onClick={openCamera} src={Cam} alt="Camera" />
          <img src={Add} alt="Add" />
          <img className="moreimg" onClick={toggleMenu} src={More} alt="More" />
          {menuVisible && (
            <div className="dropdownMenu" >
              <button onClick={handleSignOut}>Logout</button>
              <button >User Info</button>
              {/* Add more options here if needed */}
            </div>
          )}
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;