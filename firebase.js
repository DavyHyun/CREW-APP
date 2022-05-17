// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import firebase from "firebase/compat/app";
import {getAuth} from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFunctions } from 'firebase/functions';
import jsonFile from './json/thankYouGrace.json';
import { getFirestore } from "firebase/firestore";
// Imports


// import { getStorage } from "firebase/storage";

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
  measurementId: "G-EHJ5XPN5JR",
  databaseURL: "https://frostyapp-auth-default-rtdb.firebaseio.com",
  // storageBucket: "frostyapp-auth.appspot.com"
};

const serviceAccount = {
  "type": "service_account",
  "project_id": "frostyapp-auth",
  "private_key_id": "9a0c32b5669d2de4a99e77db6af76ff202f837d2",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCZmc1nwFpv9PNp\ncQ3AjZXkaS5cVAtcR6efggyPv+5ojDUt7VzG3sCJFYueAFk5gWBfYE3z+QQPtW11\naeEu20ywvuV5vv7ixxDo2OOxHQILmA1y5zg//NrRl4KDEPy8qkijnCKFX/O2ROhb\nqwO69992r+KnVCjYh7qWKfd2oWxbYDS4eCQVTQmSbFfQtNbBRxaXjUueZneuW5Vl\nT0vdP+AMGpzFmkCzLsgR5OoBn9ZQB3Q1nwvL2aQx/U3i3IFSnftVIBRfrWN/Qd6S\notQxoOd6ExmdR6fdkGCwQxfPadUKg2zLyfyptdNIVO6Cb2B6Axwwp4q7rQqlUuuA\n3RQWOQlVAgMBAAECggEACVJ50m2sr3XM3h3j6UdOjRXLIARjyh55MGearpDF/edg\nhOCOjG1RfyBlIFpCEAjnmfJE2OVIl1F6CrG53nel0GZNlBWA76+IObGMJCAwExcP\n3eTll5CXkTfiTmUWCbdGAFQGDlUz++Bzv7iB2fOYRuJG3cPwVK/sJZf3cmY6ptL4\nVotn4HZXadfGuQPRL4rL2Cmn2n588oBiU6rWhZ0/WWboKMgOQzQrKzXia38Jh+LD\njvBaAvtPua1e02YmmiUPVY2G7c1DBCg14u5sgBzngfcVvlomDoG+8udQbcURHvVy\nk+u5F28CGOcNbtYgEGCdfoCFQmvJ1jCfmZ6i3hnjkwKBgQDQcmdoMzZjyHUH/6n4\n2gpUPYwffgLZeTC0LyDTJvoLF76d/yVAIhz5nnYVc4bXaAstdnTlZp9QA6kjZTWD\n+5UOJkfBxXtATHavB0KRDx0lBGOzjd5WbMkWXQxRsxn+EjRQTMxwnpDswa2EJEMW\nZtDBU44AhGm4iUpFTQ3+ZyNxMwKBgQC8pE7Q8CM0yh1gsV+u3Rn6kw+/0+exUuni\nl5U2nYIb9+o7OzIozvVFJGzToSbMtXE5zAK7PkzaDgNLfcAXOgeDCvCe2aUA1ZU3\nIUmUOochf6fCIlc8/t7RSFoekiB57tfpFEp9toBr25Ht3d0Q69wmdyY8DUu8Tuof\nehv3Si4rVwKBgQCWGhv+vAoplps31FI4ogKYIO37a4lvw0ZgKiPQCZw7SrD4I1hW\ns3n8ArDzx4pNKV4LMecBnoGQY+JzW5lK3mq6krRPg/66EZXRej/kJ2cMVfnZvYpi\n39l6Ii0R1BAelktXm8YIPxcLdniV1Gr/AbDH1nxGQRPEUBDMkK1ICktKYwKBgDtN\nA6HW+5pKtzWATO3xf4sv09Gf0cQCppeewz9qAE6+fpmkID6H4L6dlsBodoP/vdpH\nccxe51Xc9dgzbcFfcqEVPVMSZDaA7elow3Kfe39iW+BBX19DV9Q+hGX71c2+8YzJ\n3ijqyDAf1B4MksQRASHubsyN+XL28851WnlAjob9AoGAHvJlfyzZ0WSu0/jObzQh\naPl7Aiu6h2Q/I60CZZu5HXFl3tw9qHaJNMLSOzTWgAlm9QKr82MloGYXLZ/lbWeV\naUqTm0Ais8gCh3IligHPRKVrLJqrnxhVBDIZlP5vTuaotNBoK687GwGmDx+qn/+v\nKqvP1p+qzal1vAuBprEUJVw=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-lg5cz@frostyapp-auth.iam.gserviceaccount.com",
  "client_id": "114284030316863363017",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lg5cz%40frostyapp-auth.iam.gserviceaccount.com"
}

// Initialize Firebase
// const storage = getStorage(firebaseApp);


let app;
if (getApps().length < 1) {
    app = initializeApp(firebaseConfig);
} else {
    app = getApps();
}
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);
const functions = getFunctions(app);
export {auth, database, functions, firestore};

// get(child(dbref, `users/${auth.currentUser.uid}`)).then((snapshot) => {
//   if (snapshot.exists()) {
//      const location = snapshot.val().location;
//      if (location === "") {
//        navigation.navigate("SignUp")
//      }
//   } else {
//     alert("No data found");
//   }
// }).catch((error) => {
//   alert("unsuccessful, error"+error)
// })

// var userId = getAuth().currentUser.uid;
//       set(ref(database, 'users/' + userId), {
//             location: "",
//             preference: "",
//             priceRange: "",
//             isDefault: false,
//       })
 