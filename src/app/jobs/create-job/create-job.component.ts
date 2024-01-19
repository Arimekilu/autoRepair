import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IJob} from "../interfaces";
import {JobsService} from "../jobs.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
  providers: [JobsService],

})
export class CreateJobComponent implements OnInit {
  @Input() IJob?: IJob
  @Output() newItemEvent = new EventEmitter<IJob>();
  createJobForm: FormGroup
  done: boolean = false

  addNewItem(job: IJob) {
    this.newItemEvent.emit(job);
  }

  constructor(private formBuilder: FormBuilder, private jobService: JobsService) {
    this.createJobForm = this.formBuilder.group({
      overview: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      comment: new FormControl(null)
    })


  }

  ngOnInit(): void {
    console.log(this.IJob)
    console.log(this.createJobForm.value)
    if (this.IJob) {
      this.createJobForm = this.formBuilder.group({
        overview: new FormControl(this.IJob.overview, [Validators.required]),
        price: new FormControl(this.IJob.price, [Validators.required]),
        comment: new FormControl(this.IJob.comment ? this.IJob.comment : null)
      })
    }
  }


  submit($event: MouseEvent) {
    $event.preventDefault()
    const job: IJob = this.createJobForm.value
    this.jobService.createJob(job).subscribe((res) => {
        console.log('Success', res)
        this.createJobForm.reset()
        this.done = true
      },
      (error) => {
        console.log(error)
      })
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


}
