import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCePnTRSWFX-R0n4iIMLHIr0PZjk-WcHco",
  authDomain: "msesalert-b972d.firebaseapp.com",
  databaseURL: "https://msesalert-b972d-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "msesalert-b972d",
  storageBucket: "msesalert-b972d.appspot.com",
  messagingSenderId: "992963491194",
  appId: "1:992963491194:web:f0d0b95343114e067e52c3"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
