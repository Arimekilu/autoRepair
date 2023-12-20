import {Component, Input} from '@angular/core';
import {ICar} from "../../../interfaces";

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent {

  @Input()car?: ICar
  fullView: boolean = false

}
