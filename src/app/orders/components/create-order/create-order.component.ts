import {Component, Input, OnInit} from '@angular/core';
import {JobsService} from "../../../jobs/jobs.service";
import {OrderService} from "../../order.service";
import {map, Observable, startWith} from "rxjs";
import {IJob} from "../../../jobs/interfaces";
import {ICar, IClient, IOrder} from "../../../clients/interfaces";
import {FormControl, Validators} from "@angular/forms";
import {ClientsService} from "../../../clients/services/clients.service";

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
  providers: [OrderService]
})
export class CreateOrderComponent implements OnInit {
  @Input() client?: IClient

  clients: IClient[] = []
  jobs: IJob[] = []
  jobsToOrder: IJob[] = []
  selectClientControl = new FormControl('');
  options: string[] = [];
  jobsOptions: string[] = []
  filteredOptions?: Observable<string[]>;
  filteredJobs?: Observable<string[]>;
  selectJobControl = new FormControl('');
  loading: boolean = true
  selectedCar?: ICar
  nowMileage?: number
  nowMileageControl = new FormControl('', [Validators.required]);


  constructor(private jobService: JobsService, private orderService: OrderService, private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.jobService.allJobs$.subscribe((res => {
      this.jobs = res
      for (let job of res) {
        this.jobsOptions.push(job.overview)
      }
      this.loading = false
    }))

    this.clientService.clients$.subscribe((res) => {
      this.clients = res
      for (let client of res) {
        this.options.push(client.name)
      }
      this.loading = false
    })

    this.filteredOptions = this.selectClientControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

    this.filteredJobs = this.selectJobControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterJob(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  private _filterJob(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.jobsOptions.filter(option => option.toLowerCase().includes(filterValue));
  }

  addJob($event: MouseEvent) {
    $event.preventDefault()

    const jobOverview = this.selectJobControl.value
    const selectedJob = this.jobs.find(job => job.overview.toLowerCase() == jobOverview?.toLowerCase())
    if (selectedJob) {
      this.jobsToOrder.push(selectedJob)
    }
    this.selectJobControl.reset()
  }

  selectClient($event: MouseEvent) {
    $event.preventDefault()
    const clientName = this.selectClientControl.value
    this.client = this.clients.find(client => client.name.toLowerCase() == clientName?.toLowerCase())
  }

  selectCar($event: MouseEvent, car: ICar) {
    $event.preventDefault()
    this.selectedCar = car
  }

  // car: ICar,
  // jobs: IJob[],
  // comment?: string,
  // id?: string,
  // date: string
  createOrder($event: MouseEvent) {
    $event.preventDefault()
    if (this.client && this.selectedCar && this.jobsToOrder.length > 0) {

      const order: IOrder = {
        car: this.selectedCar,
        jobs: this.jobsToOrder,
        date: (new Date).toString()
      }

    }
  }
}
