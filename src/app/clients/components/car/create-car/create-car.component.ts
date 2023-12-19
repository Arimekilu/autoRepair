import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICar} from "../../../interfaces";

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent {

  @Output() newCarEvent  = new EventEmitter<ICar>();
  newCarAdd(model: ICar){
    this.newCarEvent.emit(model);
  }

  createCarForm: FormGroup;
  car: ICar | undefined
  done: boolean = false

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

  createCar() {
    const car: ICar = this.createCarForm.value
    this.newCarAdd(car)
  }
}
