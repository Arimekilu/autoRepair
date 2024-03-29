import {Component, Input, OnInit} from '@angular/core';
import {IJob} from "../interfaces";


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {

  @Input() job: IJob | undefined
  editing: Boolean = false

  addItem(editedJob: IJob) {
    this.job = editedJob
    this.editing = false
  }



  constructor() {
  }

  ngOnInit(): void {

  }


}
