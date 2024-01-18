import {Injectable} from '@angular/core';
import {initializeApp} from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getAuth, signOut} from "firebase/auth";
import {authState, idToken} from "rxfire/auth";
import {filter} from "rxjs";

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
  firebaseConfig
  app
  auth
  loggedIn$
  authObserve$
  db
  isAuth: boolean = false
  constructor() {
    this.firebaseConfig = {
      apiKey: "AIzaSyCeefMV0_PXkd_GeFyepWdCMrTbdtwU4R0",
      authDomain: "autorepair-c20c6.firebaseapp.com",
      databaseURL: "https://autorepair-c20c6-default-rtdb.europe-west1.firebasedatabase.app/",
      projectId: "autorepair-c20c6",
      storageBucket: "autorepair-c20c6.appspot.com",
      messagingSenderId: "1007989762427",
      appId: "1:1007989762427:web:299cec0158bb54edeff5de"
    };

    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth();
    this.loggedIn$ = authState(this.auth).pipe(filter(user => !!user)).subscribe(user => {
      console.log(user, ' will be null if logged out');
    });
    authState(this.auth).subscribe(user => {
      console.log(user, ' will be null if logged out');
      this.isAuth = !!user;
    });
    this.authObserve$ = authState(this.auth)
    this.db = getDatabase(this.app);
    console.log(this.db)
    console.log('this.auth', this.auth)
    authState(this.auth).subscribe(user => {
      console.log(user);
    });

    idToken(this.auth).subscribe(token => {
      console.log(token)
    })

  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('Пользователь вышел')
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log('Ошибка выхода', error)
    });
  }


}
