import firebase from 'firebase/app'
import 'firebase/firestore' 
import 'firebase/auth' 
import 'firebase/storage'

var firebaseConfig = {
    apiKey: "AIzaSyDzwdngm1i_Trov8dTCi2qkqk6ugiOhn5Q",
    authDomain: "prueba-1-c89ba.firebaseapp.com",
    databaseURL: "https://prueba-1-c89ba.firebaseio.com",
    projectId: "prueba-1-c89ba",
    storageBucket: "prueba-1-c89ba.appspot.com",
    messagingSenderId: "258534906118",
    appId: "1:258534906118:web:955d7559ce470c86e96687"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  
  export { db, auth, storage}
