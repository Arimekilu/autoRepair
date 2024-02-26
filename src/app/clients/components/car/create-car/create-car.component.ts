import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ICar, IClient} from "../../../interfaces";
import {ClientsService} from "../../../services/clients.service";


@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss']
})
export class CreateCarComponent implements OnInit {
  @Input() client?: IClient
  @Input() carForEdit?: ICar
  @Output() newCarEvent = new EventEmitter<ICar>();
  @Output() newCarEventBool = new EventEmitter<boolean>();

  newCarAdd(model: ICar) {
    this.newCarEvent.emit(model);
  }

  newCarAddModal (model: boolean) {
    this.newCarEventBool.emit(model);
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

  ngOnInit(): void {
    if (this.carForEdit) {
      this.createCarForm = this.formBuilder.group({
        mark: new FormControl(this.carForEdit.mark, Validators.required),
        model: new FormControl(this.carForEdit.model, Validators.required),
        vin: new FormControl(this.carForEdit.vin, Validators.required),
        mileage: new FormControl(this.carForEdit.mileage, Validators.required),
        number: new FormControl(this.carForEdit.number, Validators.required),
        comment: new FormControl(this.carForEdit.comment),
        year: new FormControl(this.carForEdit.year, Validators.required)
      })
    }
  }

  createCar() {
    const car: ICar = this.createCarForm.value
    if (this.carForEdit && this.client) {
      const index = this.client.cars.indexOf(this.carForEdit)
      this.client.cars.splice(index, 1, car)
      this.clientService.editClient(this.client).subscribe((res) => {
        console.log('Отредактировано', res)
      })
    }
    if (this.client && !this.carForEdit) {
      this.client.cars ? this.client.cars.push(car) : this.client.cars = [car]
      this.clientService.editClient(this.client).subscribe((res) => {
        console.log('Новый', res)
        this.done = true
        this.newCarAddModal(this.done)
      })
    } else
      this.newCarAdd(car)
    this.createCarForm.reset()
  }




}
