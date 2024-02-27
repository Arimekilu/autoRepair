import {Component, Input, OnInit} from '@angular/core';
import {IClient, IOrder} from "../../../clients/interfaces";
import {OrderService} from "../../order.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderService]
})
export class OrderComponent implements OnInit {
  @Input() order?: IOrder
  @Input() client?: IClient
  editOrder: boolean = false
  totalPrise: number = 0

  ngOnInit(): void {
    if (this.order) {
      this.totalPrise = this.order.jobs.reduce((sum, job) => {
        return sum + +job.price;
      }, 0)
    }
  }

  constructor(private orderService: OrderService) {
  }


  deleteOrder(order: IOrder, client: IClient) {
    if (confirm('Удалить заказ?')) {
      this.orderService.deleteOrder(client, order).subscribe(res => {
        console.log(res)
      })
    }
  }
}
