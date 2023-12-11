import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseService} from "../../fb/firebase.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  regForm: FormGroup

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
    this.fireBaseService.regNewUser(user.email, user.password)
    this.regForm.reset()
  }
}
