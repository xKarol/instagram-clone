// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3m0k4sl_vsv3vFYuRpGJ6x2ymTBk1xOM",
  authDomain: "instagram-clone-66f75.firebaseapp.com",
  projectId: "instagram-clone-66f75",
  storageBucket: "instagram-clone-66f75.appspot.com",
  messagingSenderId: "476809028326",
  appId: "1:476809028326:web:452dce6987a81328b1d127",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
