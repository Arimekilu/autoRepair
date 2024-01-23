import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../services/clients.service";
import {ICar} from "../../interfaces";
import {IError} from "../../../interfaces/error.interface";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent {
  createCar: boolean = false
  createClientForm: FormGroup
  doneClient: boolean = false;
  doneCar: boolean = false;
  car: ICar[] = []
  error?: IError


  addCar(car: ICar) {
    this.car.push(car)
    this.doneCar = true
    this.createCar = false
  }

  constructor(private formBuilder: FormBuilder, private clientService: ClientsService) {
    this.createClientForm = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      phone: new FormControl('+7', [Validators.required, Validators.minLength(10)]),
      comment: new FormControl(null)
    })
  }

  createClient($event: MouseEvent) {
    $event.preventDefault()
    const client = this.createClientForm.value
    client.orders = []
    if (this.car.length >= 1) {
      client.cars = this.car
    } else {
      client.cars = []
    }
    console.log(client)
    this.clientService.setClient(client).subscribe(
      (res) => {
        console.log('Клиент создан:', res)
        this.doneClient = true
        this.createClientForm.reset()
      },
      (error) => {
        this.error = {
          code: error.code,
          message: error.message
        }
      }
    )
  }
}
