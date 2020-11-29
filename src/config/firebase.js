import firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCKyltCJtabZDzWAFFpYjaFiLKbxAhyMGw",
    authDomain: "chat-app-8a0e2.firebaseapp.com",
    databaseURL: "https://chat-app-8a0e2.firebaseio.com",
    projectId: "chat-app-8a0e2",
    storageBucket: "chat-app-8a0e2.appspot.com",
    messagingSenderId: "355589924930",
    appId: "1:355589924930:web:65447356b620ddf18525db",
    measurementId: "G-YC684131HE"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export {provider};

export default firebase;
