import firebase from "firebase";
const { firestore } = require("firebase");

const firebaseConfig = {
    apiKey: "AIzaSyBXjavgc2sblg2YzdFnuudnBv0IcDPXZQ4",
    authDomain: "react-ttt-1292e.firebaseapp.com",
    projectId: "react-ttt-1292e",
    storageBucket: "react-ttt-1292e.appspot.com",
    messagingSenderId: "74571180867",
    appId: "1:74571180867:web:ac7a948cb07c0be7fbddf6",
    measurementId: "G-LXNR7K4Q9Q"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;