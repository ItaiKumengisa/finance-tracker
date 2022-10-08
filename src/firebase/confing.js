import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDcDFLHKvYNtsOQ5ZgFVcsC8rEO2HQjXQM",
    authDomain: "react-firebase-27579.firebaseapp.com",
    projectId: "react-firebase-27579",
    storageBucket: "react-firebase-27579.appspot.com",
    messagingSenderId: "186975059724",
    appId: "1:186975059724:web:33894a2a8b34340a8b1329"
}

//Initialize the firebase project
const app = firebase.initializeApp(firebaseConfig);

//After initialozing firebase we also have to initialize each individual service

//firestore service
const projectFirestore = firebase.firestore(app);

//firebase authentication: used to sign users out or log them in/out

const projectAuth = firebase.auth();

//timestamp

const timeStamp = firebase.firestore.Timestamp
export {projectFirestore, projectAuth, timeStamp};