// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBWqTL_ezJY95iQmx2QKqJ2eePt4kfix90",
    authDomain: "trompo-8a24b.firebaseapp.com",
    projectId: "trompo-8a24b",
    storageBucket: "trompo-8a24b.firebasestorage.app",
    messagingSenderId: "869498159600",
    appId: "1:869498159600:web:9e0c08facf844ba3a21d35",
    measurementId: "G-RZ2R6J8G4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);