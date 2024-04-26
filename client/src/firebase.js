// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-blog-fda57.firebaseapp.com",
    projectId: "mern-blog-fda57",
    storageBucket: "mern-blog-fda57.appspot.com",
    messagingSenderId: "590387099654",
    appId: "1:590387099654:web:4281d81b0b9e1350cd2b87"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);


