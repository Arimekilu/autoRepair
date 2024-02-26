import {Injectable} from '@angular/core';
import {initializeApp} from "firebase/app";
import {getDatabase} from 'firebase/database'
import {createUserWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import {authState} from "rxfire/auth";
import {map, Observable, of} from "rxjs";
import {FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
// import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
// import {getDatabase, provideDatabase, set, ref, onValue} from '@angular/fire/database';




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
  authObserve$: Observable<boolean>
  dataBase
  error?: Object
  loading: Observable<boolean> = of(true)
  constructor(private router: Router) {
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

   authState(this.auth).subscribe(user => {

    },
     error1 => {
       console.log(error1)
       this.loading = of(false)
     },
     () => {
      this.loading = of(false)
     })

    this.authObserve$ = authState(this.auth).pipe(
      map(res => !!res)
    )
    this.dataBase = getDatabase(this.app);

  }

  regNewUser(email: string, password: string, regForm: FormGroup) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(`Пользователь (${user.email}) успешно зарегистрирован`)
        regForm.reset()
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.error = {
          code: errorCode,
          message: errorMessage
        }

      });
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('Пользователь вышел')
      this.router.navigate([''])
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      console.log('Ошибка выхода', error)
    });
  }



  getJobs () {

  }


}
