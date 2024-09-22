// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
  apiKey:"AIzaSyD8OuwuFqO29-o2qi6xqxkzj2zmwwx6cRQ",
  authDomain:"ecommerce-963a9.firebaseapp.com",
  projectId: "ecommerce-963a9",
  storageBucket:"ecommerce-963a9.appspot.com",
  messagingSenderId:"115770509568",
  appId: "1:115770509568:web:83f9c2410ac0e2872e8be5"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)

export {storage};
