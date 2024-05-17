import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
    apiKey: "AIzaSyA-OXSRA2UQzQ8QMwUw8GgvPwsCv4KPZho",
    authDomain: "filmfest-82d62.firebaseapp.com",
    databaseURL: "https://filmfest-82d62-default-rtdb.firebaseio.com",
    projectId: "filmfest-82d62",
    storageBucket: "filmfest-82d62.appspot.com",
    messagingSenderId: "157450563046",
    appId: "1:157450563046:web:ea919c86151a93112d7a27"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)

export {
    db,
    auth,
}

