import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {IJob} from "../interfaces";
import {FirebaseService} from "../../fb/firebase.service";
import {JobsService} from "../jobs.service";


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.scss'],
  providers: [JobsService],

})
export class CreateJobComponent implements OnInit {

  createJobForm: FormGroup
  done: boolean = false

  constructor(private formBuilder: FormBuilder, private jobService: JobsService, private firebaseService: FirebaseService) {
    this.createJobForm = this.formBuilder.group({
      overview: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      comment: new FormControl(null)
    })
  }

  ngOnInit(): void {
  }


  submit($event: MouseEvent) {
    $event.preventDefault()
    const job: IJob = this.createJobForm.value
    this.jobService.createJob(job).subscribe((res) => {
        console.log('Sucsess', res)
        this.createJobForm.reset()
        this.done = true
      },
      (error) => {
        console.log(error)
      })
  }


}
