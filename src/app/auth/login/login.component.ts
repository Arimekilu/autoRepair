import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../fb/firebase.service";
import {signInWithEmailAndPassword} from "firebase/auth";
import {authError} from "../registration/registration.component";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  error: authError | undefined

  //TODO Перенести логику в сервис
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.fireBaseService.auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(`Пользователь (${user.email}) успешно вошел`)
        console.log(this.fireBaseService.auth.currentUser)
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

  constructor(private formBuilder: FormBuilder, private fireBaseService: FirebaseService) {
    this.loginForm = this.formBuilder.group({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    )
  }

  submit($event: MouseEvent) {
    $event.preventDefault()
    if (this.loginForm.invalid) {
      return
    }
    const user = this.loginForm.value
    this.login(user.email, user.password)

  }
}
