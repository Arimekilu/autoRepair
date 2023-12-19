import {Component, OnInit} from '@angular/core';
import {JobsService} from "../jobs.service";
import {Observable} from "rxjs";
import {IJob} from "../interfaces";

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {

  jobs$: Observable<IJob[]> | undefined

  constructor(private jobsService: JobsService) {
  }

  ngOnInit(): void {
    this.jobs$ = this.jobsService.allJobs$
  }


}
