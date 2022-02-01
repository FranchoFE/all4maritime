import { initializeApp } from "firebase/app";
//import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBVSJcl1Oujvb_PeRspEywzI8Fl6VeEZ30",
  authDomain: "vuefutbol.firebaseapp.com",
  projectId: "vuefutbol",
  storageBucket: "vuefutbol.appspot.com",
  messagingSenderId: "958892460132",
  appId: "1:958892460132:web:f438d81504791d614cb771",
  measurementId: "G-FRV3H3XVMR",
};

console.log("inicializando App");
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
db._settings.experimentalAutoDetectLongPolling = true;
//connectFirestoreEmulator(db, "localhost", 8090);
