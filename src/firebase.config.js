import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDFcYjkgqbcoak2YMArQmIPHegfRzbqipY",
    authDomain: "restauranfood.firebaseapp.com",
    databaseURL: "https://restauranfood-default-rtdb.firebaseio.com",
    projectId: "restauranfood",
    storageBucket: "restauranfood.appspot.com",
    messagingSenderId: "1066342133219",
    appId: "1:1066342133219:web:a7d9cf541588f8aca3c4d6"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestore = getFirestore(app)
const storage = getStorage(app)

export { app, firestore, storage }