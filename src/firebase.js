// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyAWkFYDcldCLn5S5hZcLWJEZPWVPCLWyPQ",
//   authDomain: "chat-1c8d7.firebaseapp.com",
//   projectId: "chat-1c8d7",
//   storageBucket: "chat-1c8d7.appspot.com",
//   messagingSenderId: "410295055770",
//   appId: "1:410295055770:web:8b15eb50ff91e080b4f623"
// };

// // Initialize Firebase
// export const app = initializeApp(firebaseConfig);
// export const auth = getAuth()
// export const storage = getStorage();
// export const db=getFirestore()

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCa2HPBGduYSWEc_Jy-8o5q0RmGAOXJ41w",
  authDomain: "chat-b8328.firebaseapp.com",
  projectId: "chat-b8328",
  storageBucket: "chat-b8328.appspot.com",
  messagingSenderId: "94939484765",
  appId: "1:94939484765:web:2dbe0abd8e47bb959073b4"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();