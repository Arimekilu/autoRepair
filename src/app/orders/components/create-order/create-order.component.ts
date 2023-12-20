import {Component, Input, OnInit} from '@angular/core';
import {JobsService} from "../../../jobs/jobs.service";
import {OrderService} from "../../order.service";
import {Observable} from "rxjs";
import {IJob} from "../../../jobs/interfaces";
import {ICar, IClient, IOrder} from "../../../clients/interfaces";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit{
  @Input() client?: IClient
  jobs$?: Observable<IJob[]>

  constructor(private jobService: JobsService, private orderService: OrderService) {
  }



  ngOnInit(): void {
    this.jobs$ = this.jobService.allJobs$

  }
//   export interface IOrder {
//   car: ICar,
//   jobs: IJob[],
//   comment?: string,
//   id?: string,
//   date: string
// }

  createOrder (client: IClient) {
    // this.order = {
    //   car: client.cars?[0],
    //   comment: '',
    // }
  }
  addJobToOrder (job: IJob) {

  }

}
