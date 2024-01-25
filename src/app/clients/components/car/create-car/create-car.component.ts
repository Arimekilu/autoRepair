import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICar, IClient} from "../../../interfaces";
import {ClientsService} from "../../../services/clients.service";


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent {
  @Input() client?: IClient
  @Output() newCarEvent = new EventEmitter<ICar>();

  newCarAdd(model: ICar) {
    this.newCarEvent.emit(model);
  }

  createCarForm: FormGroup;
  car: ICar | undefined
  done: boolean = false

  constructor(private formBuilder: FormBuilder, private clientService: ClientsService) {
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
    if (this.client) {
      this.client.cars ? this.client.cars.push(car) : this.client.cars = [car]
      this.clientService.editClient(this.client).subscribe(() => {
      })
    } else
      this.newCarAdd(car)
    this.createCarForm.reset()
  }



}
