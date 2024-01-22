import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../fb/firebase.service";
import {createUserWithEmailAndPassword} from "firebase/auth";

export interface authError {
  code: string,
  message: string
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regForm: FormGroup
  error: authError | undefined


  regNewUser(email: string, password: string) {
    createUserWithEmailAndPassword(this.fireBaseService.auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(`Пользователь (${user.email}) успешно зарегистрирован`)
        this.regForm.reset()
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
    this.regForm = this.formBuilder.group({
        email: new FormControl(null, [Validators.required, Validators.email]),
        password: new FormControl(null, [Validators.required, Validators.minLength(6)])
      }
    )
  }

  submit($event: MouseEvent) {
    $event.preventDefault()
    const user = this.regForm.value
    this.regNewUser(user.email, user.password)
  }
}
