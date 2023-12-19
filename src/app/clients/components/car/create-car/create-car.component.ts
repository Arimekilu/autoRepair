import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent {
  createCarForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.createCarForm = this.formBuilder.group({
      mark: new FormControl(null, Validators.required),
      model: new FormControl(null, Validators.required),
      vin: new FormControl(null, Validators.required),
      mileage: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      comment: new FormControl(null),
      year: new FormControl(null, Validators.required)
    })
  }

}
