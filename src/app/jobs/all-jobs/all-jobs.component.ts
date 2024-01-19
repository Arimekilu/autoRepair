import {Component, OnInit} from '@angular/core';
import {JobsService} from "../jobs.service";
import {Observable, of} from "rxjs";
import {IJob} from "../interfaces";
import {IError} from "../../interfaces/error.interface";

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})
export class AllJobsComponent implements OnInit {
  loading: boolean = true
  IError?: IError
  jobs$: Observable<IJob[]> | undefined

  constructor(private jobsService: JobsService) {
  }

  ngOnInit(): void {
    this.jobsService.allJobs$.subscribe((res) => {
        this.jobs$ = of(res)
        this.loading = false
      },
      (error) => {
        this.IError = {
          code: error.code,
          message: error.message
        }
      })
  }


}
