
import { initializeApp } from "firebase/app";
import "firebase/auth";
// import { config } from "next/dist/build/templates/pages";

const firebaseConfig = {
    apiKey: "AIzaSyCB1VZRdH763HKnfwE7OLIjvqBdgq4EO-o",
    authDomain: "bookknhom.firebaseapp.com",
    projectId: "bookknhom",
    storageBucket: "bookknhom.appspot.com",
    messagingSenderId: "989056664463",
    appId: "1:989056664463:web:5873daf522644f4b5f01fa",
    measurementId: "G-SN3LFFEPCY"
  };
const app = initializeApp(firebaseConfig);
export default app;