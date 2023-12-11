import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeefMV0_PXkd_GeFyepWdCMrTbdtwU4R0",
  authDomain: "autorepair-c20c6.firebaseapp.com",
  databaseURL: "https://autorepair-c20c6-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "autorepair-c20c6",
  storageBucket: "autorepair-c20c6.appspot.com",
  messagingSenderId: "1007989762427",
  appId: "1:1007989762427:web:299cec0158bb54edeff5de"
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  app
  constructor() {
    this.app = initializeApp(firebaseConfig)
  }
}
