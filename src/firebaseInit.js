// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDxygaO6D_H1sGkm9C2fZ00mpo4VA1GZH8",
//   authDomain: "buybusy-ad272.firebaseapp.com",
//   projectId: "buybusy-ad272",
//   storageBucket: "buybusy-ad272.appspot.com",
//   messagingSenderId: "260481780408",
//   appId: "1:260481780408:web:ea25419e9b8c23beb4024d"
// };

const firebaseConfig = {
  apiKey: "AIzaSyCuLsRTUhxdAoL1Rm5iTdBD7U2GUmUflqM",
  authDomain: "blogging-app-3df5a.firebaseapp.com",
  projectId: "blogging-app-3df5a",
  storageBucket: "blogging-app-3df5a.appspot.com",
  messagingSenderId: "484105256751",
  appId: "1:484105256751:web:d0dc5e82ef61328b62ebda"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
