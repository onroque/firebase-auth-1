import firebase from "firebase/app";

import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDm0kqPTC_bMU4lUMdsrXLT5xqwjqst6RQ",
  authDomain: "firestore-auth-1-9ccfa.firebaseapp.com",
  projectId: "firestore-auth-1-9ccfa",
  storageBucket: "firestore-auth-1-9ccfa.appspot.com",
  messagingSenderId: "629226991358",
  appId: "1:629226991358:web:6301adf7e01482e14f3faf",
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();
const auth = firebase.auth();
const marcaTiempo = firebase.firestore.FieldValue.serverTimestamp;

firebase.getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
      unsuscribe();
      resolve(user);
    }, reject);
  });
};

export { db, auth, marcaTiempo, firebase };
