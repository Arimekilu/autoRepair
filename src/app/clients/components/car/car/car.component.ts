import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ICar} from "../../../interfaces";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input()car?: ICar
  @Input()openInClient: boolean = false
  @Output() newItemEvent = new EventEmitter<ICar>();
  fullView: boolean = false

  addNewItem(value: ICar) {
    this.newItemEvent.emit(value);
  }

}
