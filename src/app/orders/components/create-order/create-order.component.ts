import {Component, Input, OnInit} from '@angular/core';
import {JobsService} from "../../../jobs/jobs.service";
import {OrderService} from "../../order.service";
import {map, Observable, startWith} from "rxjs";
import {IJob} from "../../../jobs/interfaces";
import {ICar, IClient, IOrder} from "../../../clients/interfaces";
import {FormControl} from "@angular/forms";
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
  selectClientControl = new FormControl('');
  options: string[] = [];
  jobsOptions: string[] = []
  filteredOptions?: Observable<string[]>;
  filteredJobs?: Observable<string[]>;
  selectJob = new FormControl('');
  loading: boolean = true
  jobsToOrder: IJob[] = []
  selectedCar?: ICar


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

    this.filteredJobs = this.selectJob.valueChanges.pipe(
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
}
