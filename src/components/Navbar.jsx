import { signOut } from "firebase/auth";
import React, { useContext, useState } from "react";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import More from "../images/more.png"
const Navbar=()=>{
    const {currentUser} = useContext(AuthContext);
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
      };
      const handleSignOut = () => {
        signOut(auth).catch((error) => {
          console.error('Error signing out:', error);
        });
      };

    return (
        <div className="navbar" >
            <span className="logo">Messenger Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                {/* <button onClick={()=>signOut(auth)}>LogOut</button> */}
                <img className="moreimg" onClick={toggleMenu} src={More} alt="More" />
              {menuVisible && (
               <div className="dropdownMenu">
              <button onClick={handleSignOut}>Logout</button>
              <button >User Info</button>
              {/* Add more options here if needed */}
               </div>
              )}
            </div>
        </div>
    )
}
export default Navbar;