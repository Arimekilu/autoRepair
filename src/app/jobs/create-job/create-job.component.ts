import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IJob} from "../interfaces";
import {JobsService} from "../jobs.service";


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
  providers: [JobsService],

})
export class CreateJobComponent implements OnInit {
  @Input() IJob?: IJob
  @Input() inOrder: boolean = false
  @Output() newJobEvent = new EventEmitter<IJob>();
  createJobForm: FormGroup
  done: boolean = false

  addNewItem(job: IJob) {
    this.newJobEvent.emit(job);
  }

  constructor(private formBuilder: FormBuilder, private jobService: JobsService) {
    this.createJobForm = this.formBuilder.group({
      overview: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      comment: new FormControl(null),
      type: new FormControl(null)
    })


  }

  ngOnInit(): void {
    console.log(this.IJob)
    console.log(this.createJobForm.value)
    if (this.IJob) {
      this.createJobForm = this.formBuilder.group({
        overview: new FormControl(this.IJob.overview, [Validators.required]),
        price: new FormControl(this.IJob.price, [Validators.required]),
        comment: new FormControl(this.IJob.comment ? this.IJob.comment : null),
        type: new FormControl(this.IJob.type ? this.IJob.type : null)
      })
    }
  }


  submit($event: MouseEvent) {
    $event.preventDefault()

    if (this.inOrder) {
      const job: IJob = this.createJobForm.value
      if (confirm('Сохранить?')) {
        this.jobService.createJob(job)
      }
      this.addNewItem(job)
    } else {
      const job: IJob = this.createJobForm.value
      console.log(job)
      this.jobService.createJob(job).subscribe((res) => {
          console.log('Success', res)
          this.createJobForm.reset()
          this.done = true
        },
        (error) => {
          console.log(error)
        })
    }
  }

  redact($event: MouseEvent) {
    $event.preventDefault()
    const job: IJob = this.createJobForm.value
    if (this.IJob?.id) {
      job.id = this.IJob.id
    }
    this.jobService.redactJob(job).subscribe((res) => {
        console.log('Success', res)
        this.createJobForm.reset()
        this.done = true
        this.IJob = undefined
        this.jobService.getAllJobs()
        this.addNewItem(job)
      },
      (error) => {
        console.log(error)
      })
  }

  public delete(job: IJob) {
    if (confirm('Уверен?')) {
      this.jobService.deleteJob(job).subscribe((res) => {
        console.log(res)
        this.createJobForm.reset()
        this.IJob = undefined
        this.jobService.getAllJobs()
        // this.addNewItem(job)
      })
    }
  }


}
