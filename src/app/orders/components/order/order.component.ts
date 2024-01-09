import {Component, Input, OnInit} from '@angular/core';
import {IOrder} from "../../../clients/interfaces";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit{
  @Input() order?: IOrder

  totalPrise: number = 0

  ngOnInit(): void {
    if (this.order) {
      this.totalPrise = this.order.jobs.reduce((sum, job) => {
        return sum + +job.price;
      }, 0)
    }
  }



}
