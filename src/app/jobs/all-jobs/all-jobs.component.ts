import {Component, OnInit} from '@angular/core';
import {JobsService} from "../jobs.service";
import {map, Observable, of, startWith} from "rxjs";
import {IJob} from "../interfaces";
import {IError} from "../../interfaces/error.interface";
import {FormControl} from "@angular/forms";
import {FirebaseService} from "../../fb/firebase.service";


@Component({
  selector: 'app-all-jobs',
  templateUrl: './all-jobs.component.html',
  styleUrls: ['./all-jobs.component.scss']
})


export class AllJobsComponent implements OnInit {
  loading: boolean = true
  IError?: IError
  jobs?: IJob[]
  filteredJobs?: IJob[] | undefined
  filteredJobs$?: Observable<IJob[] | undefined>
  types$?: Observable<Set<string>>
  selectType = new FormControl
  filterByOverviewControl = new FormControl('');
  firebase

  constructor(private jobsService: JobsService, private fireBase: FirebaseService) {
    this.firebase = fireBase
  }


  ngOnInit(): void {
    this.jobsService.allJobs$.subscribe((jobs) => {
        this.jobs = jobs
        this.filteredJobs = jobs
        const types: Set<string> = new Set
        for (const job of jobs) {
          if (job.type) {
            types.add(job.type.toLowerCase())
          }
        }
        this.types$ = of(types)
        this.loading = false
      },
      (error) => {
        this.IError = {
          code: error.code,
          message: error.message
        }
      }
    )

    this.filteredJobs$ = this.filterByOverviewControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );

  }

  filterJobsByType($event: MouseEvent) {

    // @ts-ignore
    const type: string | undefined = $event.target.outerText

    if (type === 'Все категории') {
      this.filteredJobs$ = of(this.jobs)
      this.filteredJobs = this.jobs
    } else if (type === 'Без категории') {
      const filtered = this.jobs?.filter(job => !('type' in job))
      this.filteredJobs = filtered
      this.filteredJobs$ = of(filtered)
    } else if (type !== 'Без категории' && type) {
      const filtered = this.jobs?.filter(job => job.type?.toLowerCase() === type.toLowerCase())
      this.filteredJobs = filtered
      this.filteredJobs$ = of(filtered)
    }

    this.filteredJobs$ = this.filterByOverviewControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): IJob[] | undefined {
    console.log('filter')
    const filterValue = value.toLowerCase();
    if (this.filteredJobs) {
      return this.filteredJobs.filter(job => job.overview.toLowerCase().includes(filterValue))
    } else return undefined
  }



}
