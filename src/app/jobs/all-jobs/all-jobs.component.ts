import {Component, OnInit} from '@angular/core';
import {JobsService} from "../jobs.service";
import {Observable, of} from "rxjs";
import {IJob} from "../interfaces";
import {IError} from "../../interfaces/error.interface";
import {FormControl} from "@angular/forms";

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
  jobs?: IJob[]
  filteredJobs: IJob[] | undefined
  types?: Set<string>
  types$?: Observable<Set<string>>
  selectType = new FormControl


  constructor(private jobsService: JobsService) {
  }


  ngOnInit(): void {
    this.jobsService.allJobs$.subscribe((jobs) => {
        this.jobs = jobs
        this.types = new Set
        for (const job of jobs) {
          if (job.type) {
            console.log(job.type)
            this.types.add(job.type)
          }
        }
        this.types$ = of(this.types)
        this.filteredJobs = jobs
        this.loading = false
      },
      (error) => {
        this.IError = {
          code: error.code,
          message: error.message
        }
      }
    )
  }

  filterJobsByType($event: MouseEvent) {

    // @ts-ignore
    const type: string | undefined = $event.target.outerText

    if (type === 'Все категории') {
      console.log(type === 'Все категории')
      this.filteredJobs = this.jobs
      console.log(this.filteredJobs)
      console.log('Все категории')
    } else if (type === 'Без категории') {
      this.filteredJobs = this.jobs?.filter(job => !('type' in job))
    } else if (type !== 'Без категории' && type) {
      this.filteredJobs = this.jobs?.filter(job => job.type?.toLowerCase() === type.toLowerCase())
    }
  }


}
