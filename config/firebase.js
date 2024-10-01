import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB347YBwxO_ZgY_5AYdzUrziTuoAMMB-h0",
  authDomain: "ndaru-farm-1d9bb.firebaseapp.com",
  databaseURL:
    "https://ndaru-farm-1d9bb-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ndaru-farm-1d9bb",
  storageBucket: "ndaru-farm-1d9bb.appspot.com",
  messagingSenderId: "370204281180",
  appId: "1:370204281180:web:b6f826784e7e6d9b765999",
  measurementId: "G-5BQXWKBLP3",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
