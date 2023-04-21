import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

    const firebaseConfig = {
        apiKey: "AIzaSyDDrkOAagEgBKnlla-qZTgSNNcu2Tdh3HA",
        authDomain: "hotelbook-4737b.firebaseapp.com",
        databaseURL: "https://hotelbook-4737b-default-rtdb.firebaseio.com",
        projectId: "hotelbook-4737b",
        storageBucket: "hotelbook-4737b.appspot.com",
        messagingSenderId: "967922101864",
        appId: "1:967922101864:web:404359727f97a8cb6b15dd",
        measurementId: "G-JCG34ZTXCD"
      };
      

      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);