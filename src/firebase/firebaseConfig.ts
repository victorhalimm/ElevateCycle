// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfUaIis2SLPgR9rRHHdq7cTTpL7ubyEEs",
  authDomain: "elevatecycle-bf5a0.firebaseapp.com",
  projectId: "elevatecycle-bf5a0",
  storageBucket: "elevatecycle-bf5a0.appspot.com",
  messagingSenderId: "88508561669",
  appId: "1:88508561669:web:ed31d46be925e9aef55f6c",
  measurementId: "G-6XJGPDDCM2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db};