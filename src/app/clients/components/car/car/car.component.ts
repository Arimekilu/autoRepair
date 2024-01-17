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
  @Input()withButtons?: boolean = true
  @Output() newItemEvent = new EventEmitter<ICar>();


  addNewItem(value: ICar) {
    this.newItemEvent.emit(value);
  }

}
