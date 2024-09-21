// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey:process.env.apikey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.SenderId,
  appId: process.env.appId
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage};