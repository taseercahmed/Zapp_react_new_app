// import firebase from "firebase/app";
import firebase from 'firebase/compat/app';
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
import 'firebase/compat/messaging';

const FirebaseCredentials = {
  apiKey: "AIzaSyBI1wPPflXxyuatCMKY8yN6bKmI3E7Zoh4",
  authDomain: "zapp-laundry.firebaseapp.com",
  databaseURL: "https://zapp-laundry-default-rtdb.firebaseio.com",
  projectId: "zapp-laundry",
  storageBucket: "zapp-laundry.appspot.com",
  messagingSenderId: "235094005053",
  appId: "1:235094005053:web:0de7469281d6472eeba154"
}

if (!firebase.apps.length) {
  firebase.initializeApp(FirebaseCredentials)
}

const Db = firebase.database();

const Auth = firebase.auth();

// const messaging = firebase.messaging();

const Storageref = firebase.storage().ref();

export { Db, Auth,Storageref,firebase };