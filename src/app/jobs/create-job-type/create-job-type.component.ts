import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {JobsService} from "../jobs.service";

@Component({
  selector: 'app-create-job-type',
  templateUrl: './create-job-type.component.html',
  styleUrls: ['./create-job-type.component.scss']
})
export class CreateJobTypeComponent {
  createJobTypeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private jobService: JobsService) {
    this.createJobTypeForm = this.formBuilder.group({
      type: new FormControl(null, Validators.required)
    })
  }

  submit() {
    const type = this.createJobTypeForm.value
    this.jobService.createType(type).subscribe((res) => {
      console.log(res)
    })
  }
}
