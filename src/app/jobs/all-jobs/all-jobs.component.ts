import {Component, OnInit} from '@angular/core';
import {JobsService} from "../jobs.service";
import {Observable, of} from "rxjs";
import {IJob} from "../interfaces";
import {IError} from "../../interfaces/error.interface";

interface jobsByTypes {
  [type: string]: IJob
}

@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})


export class AllJobsComponent implements OnInit {
  loading: boolean = true
  IError?: IError
  jobs$: Observable<IJob[]> | undefined
  jobsTypes$: Observable<string[]> | undefined
  jobsTypes: string[] = []
  jobsByTypes: jobsByTypes[] = []
  types: string[] = []
  types$?: Observable<string[]>
  constructor(private jobsService: JobsService) {
  }



  ngOnInit(): void {
    this.jobsService.allJobs$.subscribe((jobs) => {
        this.jobs$ = of(jobs)
        this.sortByTypes(jobs)
        this.jobsTypes$ = of(this.jobsTypes)
        this.loading = false
      },
      (error) => {
        this.IError = {
          code: error.code,
          message: error.message
        }
      },
      () => {

      }
    )
    this.jobsService.getAllTypes().subscribe((res) => {
      for (const obj of res) {
        this.types.push(Object.values(obj).toString())
      }
      this.types$ = of(this.types)
    })
  }


  sortByTypes(jobs: IJob[]) {
    for (let job of jobs) {
      if (job.type) {
        const type = job.type.toLowerCase()
        const jobWithType = {[type]: job}
        this.jobsByTypes.push(jobWithType)
      } else {
        const type = 'Без категории'
        const jobWithType = {[type]: job}
        this.jobsByTypes.push(jobWithType)
      }
      this.jobsByTypes.sort()
    }
  }

}
