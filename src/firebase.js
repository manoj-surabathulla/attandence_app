import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAdKig17KqsJisCyrsynOVtcjb69NdRkDY",
  authDomain: "fsattendance.firebaseapp.com",
  projectId: "fsattendance",
  storageBucket: "fsattendance.appspot.com",
  messagingSenderId: "1036973009330",
  appId: "1:1036973009330:web:7a34ff2652c5bb8d919cab",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage();

export default app;
