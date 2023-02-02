// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWCvEvsOm7-0OZyiZrS3-skgpmsWSjxOI",
  authDomain: "tchams-1101a.firebaseapp.com",
  projectId: "tchams-1101a",
  storageBucket: "tchams-1101a.appspot.com",
  messagingSenderId: "937234408339",
  appId: "1:937234408339:web:87dcc0503471a74b51fe66",
  databaseURL: "https://tchams-1101a-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export {db}