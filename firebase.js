// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuMUMyseBX_wmpIC2c-6JTzRXmg6gn_LU",
  authDomain: "frostyapp-auth.firebaseapp.com",
  projectId: "frostyapp-auth",
  storageBucket: "frostyapp-auth.appspot.com",
  messagingSenderId: "624680952854",
  appId: "1:624680952854:web:dcf8c2e4c3edbf29c3c137",
  measurementId: "G-EHJ5XPN5JR"
};

// Initialize Firebase


let app;
if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps();
}
const auth = getAuth(app);
export {auth};
 