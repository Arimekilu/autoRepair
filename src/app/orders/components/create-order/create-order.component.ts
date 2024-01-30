import {Component, Input, OnInit} from '@angular/core';
import {JobsService} from "../../../jobs/jobs.service";
import {OrderService} from "../../order.service";
import {map, Observable, of, startWith} from "rxjs";
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
  @Input() client?: IClient;
  @Input() car?: ICar

  clients: IClient[] = []
  jobs: IJob[] = []
  jobsToOrder: IJob[] = []
  selectClientControl = new FormControl('');
  options: string[] = [];
  jobsOptions: string[] = []
  filteredOptions?: Observable<string[]>;
  filteredJobs?: Observable<IJob[] | undefined>;
  filteredJobsByType?: IJob[]
  filteredJobsByType$?: Observable<IJob[] | undefined>
  selectJobControl = new FormControl('');
  loading: boolean = true
  selectedCar?: ICar
  nowMileage?: number
  nowMileageControl = new FormControl('', [Validators.required]);
  orderCommentControl = new FormControl('', [Validators.required]);
  orderComment?: string
  totalPrise: number = 0
  btnDisables: boolean = false
  orderCreated: boolean = false
  selectType = new FormControl
  filteredJObs?: Observable<IJob[] | undefined>;
  types?: Set<string>
  types$?: Observable<Set<string>>
  addNewJob: boolean = false

  addCar(car: ICar) {
    if (this.client) {
      this.selectedCar = car
      if (!this.client.cars) {
        this.client.cars = []
      }
      this.client.cars.push(car)
    }
  }

  newJob (job: IJob) {
    this.jobsToOrder.push(job)
    this.totalPrise += job.price
  }

  constructor(private jobService: JobsService, private orderService: OrderService, private clientService: ClientsService) {
  }

  ngOnInit(): void {
    this.jobService.allJobs$.subscribe((res => {
      this.jobs = res
      this.filteredJobsByType = res
      this.filteredJobsByType$ = of(res)
      this.types = new Set
      for (const job of this.jobs) {
        if (job.type) {
          console.log(job.type)
          this.types.add(job.type.toLowerCase())
        }
      }
      this.types$ = of(this.types)
      for (let job of res) {
        this.jobsOptions.push(job.overview)
      }
      this.loading = false
    }))

    if (this.car) {
      this.selectedCar = this.car
    }

    if (!this.client) {
      this.clientService.clients$.subscribe((res) => {
        this.clients = res
        for (let client of res) {
          this.options.push(client.name)
        }
        this.loading = false
      })
    }

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

  private _filterJob(value: string): IJob[] | undefined {
    const filterValue = value.toLowerCase();
    return this.filteredJobsByType?.filter(option => option.overview.toLowerCase().includes(filterValue));
  }

  filterJobsByType($event: MouseEvent) {
    // @ts-ignore
    const type: string | undefined = $event.target.outerText

    if (type === 'Все категории') {
      console.log(type === 'Все категории')
      this.filteredJobsByType = this.jobs
      console.log(this.filteredJobs)
      console.log('Все категории')
    } else if (type === 'Без категории') {
      this.filteredJobsByType = this.jobs?.filter(job => !('type' in job))
    } else if (type !== 'Без категории' && type) {
      this.filteredJobsByType = this.jobs?.filter(job => job.type?.toLowerCase() === type.toLowerCase())
    }

    this.filteredJobsByType$ = of(this.filteredJobsByType)

  }

  addJob($event: MouseEvent) {
    $event.preventDefault()
    const jobOverview = this.selectJobControl.value
    const selectedJob = this.jobs.find(job => job.overview.toLowerCase() == jobOverview?.toLowerCase())
    if (selectedJob) {
      this.jobsToOrder.push(selectedJob)
      this.totalPrise += selectedJob.price
    }
    this.selectJobControl.reset()
  }

  selectClient($event: MouseEvent) {
    $event.preventDefault()
    const clientName = this.selectClientControl.value
    this.client = this.clients.find(client => client.name.toLowerCase() == clientName?.toLowerCase())
     if (this.client?.cars.length === 1) {
       this.selectedCar = this.client.cars[0]
     }
  }

  addItem(newItem: ICar) {
    this.selectedCar = newItem
  }

  createOrder($event: MouseEvent) {
    $event.preventDefault()
    this.btnDisables = true

    const orderComment = this.orderCommentControl.value ? this.orderCommentControl.value : ''
    const nowMileage = this.nowMileageControl.value

    if (this.client && this.selectedCar && this.jobsToOrder.length > 0 && nowMileage) {
      const order: IOrder = {
        car: this.selectedCar,
        jobs: this.jobsToOrder,
        mileage: (+nowMileage || this.selectedCar.mileage),
        date: (new Date).toString(),
        comment: orderComment
      }

      this.orderService.setOrder(order, this.client, this.selectedCar, +nowMileage)?.subscribe((res) => {
        console.log(res)
        this.client = undefined
        this.jobsToOrder = []
        this.nowMileageControl.reset()
        this.selectedCar = undefined
        this.orderCreated = true
        this.btnDisables = false
      })

    }
  }

}
