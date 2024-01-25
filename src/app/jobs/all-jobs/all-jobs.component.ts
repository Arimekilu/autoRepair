import {Component, OnInit} from '@angular/core';
import {JobsService} from "../jobs.service";
import {map, Observable, of, startWith} from "rxjs";
import {IJob} from "../interfaces";
import {IError} from "../../interfaces/error.interface";
import {FormControl} from "@angular/forms";



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
  filteredOptions?: Observable<IJob[] | undefined>;
  myControl = new FormControl('');


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

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

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

    this.filteredOptions = of(this.filteredJobs)

  }

  private _filter(value: string): IJob[] | undefined {
    const filterValue = value.toLowerCase();
    if (this.filteredJobs) {
      const filteredByOverview = this.filteredJobs.filter(job => job.overview.toLowerCase().includes(filterValue));
      this.filteredJobs = filteredByOverview
      return filteredByOverview
    } else return undefined
  }
}
