import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDXuLeqQCv4ySZcxniSLIb1mwtJanV8S7Q",
  authDomain: "int404-3c541.firebaseapp.com",
  projectId: "int404-3c541",
  storageBucket: "int404-3c541.appspot.com",
  messagingSenderId: "980144716555",
  appId: "1:980144716555:web:4f0be352df589a78a7800e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
