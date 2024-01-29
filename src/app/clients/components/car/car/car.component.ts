import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICar, IClient} from "../../../interfaces";
import {ClientsService} from "../../../services/clients.service";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input()car?: ICar
  @Input()client?: IClient
  @Input()openInClient: boolean = false
  @Input()withButtons?: boolean = true
  @Output() newItemEvent = new EventEmitter<ICar>();
  edit: boolean = false

  constructor(private clientService: ClientsService ) {
  }

  addNewItem(value: ICar) {
    this.newItemEvent.emit(value);
  }

  deleteCar(car: ICar) {
    if (confirm('Точно?')) {
      if (this.client?.cars) {
        const index = this.client.cars.indexOf(car)
        this.client.cars.splice(index, 1)
        this.clientService.editClient(this.client).subscribe()
      }
    }
  }

}
