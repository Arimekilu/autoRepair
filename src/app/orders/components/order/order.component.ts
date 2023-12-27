import {Component, Input} from '@angular/core';
import {IOrder} from "../../../clients/interfaces";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent {
  @Input() order?: IOrder
}
