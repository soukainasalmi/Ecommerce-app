// Import the functions you need from the SDKs you need
import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA3LqwIMZYHhmf0OOAC0-H5VXM7HTqaYyI",
  authDomain: "fir-auth-7a5b0.firebaseapp.com",
  projectId: "fir-auth-7a5b0",
  storageBucket: "fir-auth-7a5b0.appspot.com",
  messagingSenderId: "512598726599",
  appId: "1:512598726599:web:a9c780db8de7e89c11ebe2",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage, firebase };
