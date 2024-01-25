import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ClientsService} from "../../services/clients.service";
import {ICar, IClient} from "../../interfaces";
import {IError} from "../../../interfaces/error.interface";

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.scss']
})
export class CreateClientComponent implements OnInit{
  @Input()client?: IClient
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
      phone: new FormControl('+7', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
      comment: new FormControl(null)
    })
  }

  ngOnInit(): void {
    if (this.client) {
      this.createClientForm = this.formBuilder.group({
        name: new FormControl(this.client.name, [Validators.required]),
        phone: new FormControl(this.client.phone, [Validators.required, Validators.minLength(12), Validators.maxLength(12)]),
        comment: new FormControl(this.client.comment)
      })
    }
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

  editClient ($event: MouseEvent) {
    $event.preventDefault()
    if (this.client && this.client.id) {
      const clientForEdit: IClient = this.createClientForm.value
      clientForEdit.id = this.client.id
      clientForEdit.cars = this.client.cars
      clientForEdit.orders = this.client.orders
      this.clientService.editClient(clientForEdit).subscribe((res) => {
        console.log(res)
        this.doneClient = true
        this.createClientForm.reset()
      })
    }
  }



}
