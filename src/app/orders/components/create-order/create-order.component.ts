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
  @Input() order?: IOrder
  edit: boolean = false
  clients?: IClient[]
  clients$?: Observable<IClient[] | undefined>
  jobs: IJob[] = []
  jobsToOrder: IJob[] = []
  filteredJobs?: IJob[]
  filteredJobs$?: Observable<IJob[] | undefined>
  selectClientControl = new FormControl('');
  selectJobControl = new FormControl('');
  loading: boolean = true
  selectedCar?: ICar
  nowMileageControl = new FormControl('', [Validators.required]);
  orderCommentControl = new FormControl('');
  totalPrise: number = 0
  btnDisables: boolean = false
  orderCreated: boolean = false
  selectJobType = new FormControl
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

  newJob(job: IJob) {
    if (confirm('Сохранить в постоянные работы?')) {
      this.jobService.createJob(job).subscribe(res => {
        console.log(res)
      })
    }
    this.jobsToOrder.push(job)
    this.totalPrise += job.price
    this.addNewJob = false

  }

  constructor(private jobService: JobsService, private orderService: OrderService, private clientService: ClientsService) {

  }

  ngOnInit(): void {
    this.jobService.allJobs$.subscribe((res => {
      this.jobs = res
      this.filteredJobs = res
      this.filteredJobs$ = of(res)
      const types: Set<string> = new Set
      for (const job of this.jobs) {
        if (job.type) {
          types.add(job.type.toLowerCase())
        }
      }
      this.filteredJobs$ = this.selectJobControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filterJob(value || '')),
      );
      this.types$ = of(types)
    }))
    if (this.car) {
      this.selectedCar = this.car
    }
    if (!this.client) {
      this.clientService.clients$.subscribe((res) => {
        this.clients = res
        this.clients$ = of(res)
        this.clients$ = this.selectClientControl.valueChanges.pipe(
          startWith(''),
          map(value => this._filterClient(value || '')),
        );
      })
    }

    if (this.order) {
      this.selectedCar = this.order.car
      this.jobsToOrder = this.order.jobs
      this.orderCommentControl.setValue(this.order.comment || null)
      this.nowMileageControl.setValue(this.order.mileage + '' || null)
      this.totalPrise = 0
      for (const job of this.jobsToOrder) {
        this.totalPrise += (+job.price || 0)
      }
    }

    this.loading = false
  }

  private _filterClient(value: string): IClient[] | undefined {
    const filterValue = value.toLowerCase();
    console.log('filter')
    if (this.clients) {
      return this.clients.filter(job => job.name.toLowerCase().includes(filterValue))
    } else return undefined

  }

  private _filterJob(value: string): IJob[] | undefined {
    console.log('filter')
    const filterValue = value.toLowerCase();
    if (this.filteredJobs) {
      return this.filteredJobs.filter(job => job.overview.toLowerCase().includes(filterValue))
    } else return undefined
  }

  filterJobsByType($event: MouseEvent) {
    // @ts-ignore
    const type: string | undefined = $event.target.outerText

    if (type === 'Все категории') {
      console.log(type === 'Все категории')
      this.filteredJobs = this.jobs
      this.filteredJobs$ = of(this.jobs)
    } else if (type === 'Без категории') {
      this.filteredJobs = this.jobs?.filter(job => !('type' in job))
      this.filteredJobs$ = of(this.jobs?.filter(job => !('type' in job)))
    } else if (type !== 'Без категории' && type) {
      this.filteredJobs = this.jobs?.filter(job => job.type?.toLowerCase() === type.toLowerCase())
      this.filteredJobs$ = of(this.jobs?.filter(job => job.type?.toLowerCase() === type.toLowerCase()))
    }

    this.filteredJobs$ = this.selectJobControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterJob(value || '')),
    );

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
    this.client = this.clients?.find(client => client.name.toLowerCase() == clientName?.toLowerCase())
    if (this.client?.cars.length === 1) {
      this.selectedCar = this.client.cars[0]
    }
  }

  addItem(newItem: ICar) {
    this.selectedCar = newItem
  }

  editOrder($event: MouseEvent) {
    $event.preventDefault()
    this.btnDisables = true

    const orderComment = this.orderCommentControl.value ? this.orderCommentControl.value : ''
    const nowMileage = this.nowMileageControl.value

    if (this.client && this.selectedCar && this.jobsToOrder.length > 0 && nowMileage && this.order) {
      const order: IOrder = {
        car: this.selectedCar,
        jobs: this.jobsToOrder,
        mileage: (+nowMileage || this.selectedCar.mileage),
        date: (new Date).toString(),
        comment: orderComment
      }

      this.orderService.editOrder(order, this.order, this.client, this.selectedCar, +nowMileage)?.subscribe((res) => {
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

  deleteJobFromOrder(job: IJob) {
    const idx = this.jobsToOrder.indexOf(job)
    this.jobsToOrder.splice(idx, 1)
  }
}
