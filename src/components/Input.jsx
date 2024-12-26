

import React, { useContext, useState } from "react";
import Img from "../images/img.png";
import Attach from "../images/grin-alt.png";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/chatContext";
import { Timestamp, arrayUnion, doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../firebase";
import EmojiPicker from "emoji-picker-react";

const Input = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (!data.chatId) {
      alert("Please select a user to send the message");
      return;
    }

    if (img) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function, can be used to show upload progress
        },
        (error) => {
          console.error("Upload error: ", error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const message = {
            id: uuid(),
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: downloadURL,
          };
          if (text) {
            message.text = text;
          }

          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion(message),
          });
          await updateLastMessage(message.text || "[Image]");

          setText("");
          setImg(null);
          setImgPreview(null);
        }
      );
    } else if (text) {
      const message = {
        id: uuid(),
        text,
        senderId: currentUser.uid,
        date: Timestamp.now(),
      };

      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion(message),
      });
      await updateLastMessage(message.text);

      setText("");
    }
  };

  const updateLastMessage = async (lastMessageText) => {
    const userChatsRef = doc(db, "userChats", currentUser.uid);
    const recipientUserChatsRef = doc(db, "userChats", data.user.uid);

    try {
      const updateData = {
        [data.chatId + ".lastMessage"]: { text: lastMessageText },
        [data.chatId + ".date"]: serverTimestamp(),
      };

      await updateDoc(userChatsRef, updateData);
      await updateDoc(recipientUserChatsRef, updateData);
    } catch (error) {
      console.error("Error updating last message:", error);
    }
  };

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSend();
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImg(file);
      setImgPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="input" >
      {imgPreview && <img src={imgPreview} alt="image-preview" className="image-preview" onKeyDown={handleEnter} />}
      <input
        className="input2"
        type="text"
        placeholder="Type Something..."
        onKeyDown={handleEnter}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img className="imgg" src={Attach} alt="" onClick={() => setOpen((prev) => !prev)} />
        <div className="picker">
          {open && <EmojiPicker onEmojiClick={handleEmoji} className="emojii" />}
        </div>
        <input type="file" style={{ display: "none" }} id="file"  onChange={handleImageChange} />
        <label htmlFor="file">
          <img className="imgg2" src={Img} alt="" />
        </label>
        <button className="btn1" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;