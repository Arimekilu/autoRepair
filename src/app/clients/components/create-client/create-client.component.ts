import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {

  createClientForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.createClientForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl(null, [Validators.required, Validators.minLength(10)]),
      comment: new FormControl(null)
    })
  }

  createClient($event: MouseEvent) {
    $event.preventDefault()
  }
}
