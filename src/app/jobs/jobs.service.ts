import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IJob} from "./interfaces";
import {FirebaseService} from "../fb/firebase.service";
import {map, Observable} from "rxjs";

@Injectable()

export class JobsService {

  public get allJobs$() {
    return this.getAllJobs()
  }

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
    this.getAllTypes().subscribe((res) => {
      console.log('allTypes', res)
    })
  }

  createJob(job: IJob): Observable<IJob> {
    return this.http.post<IJob>(`${this.firebaseService.firebaseConfig.databaseURL}/jobs.json`, job)
  }

  createType (type: string) {
    return this.http.post<string>(`${this.firebaseService.firebaseConfig.databaseURL}/jobsTypes.json`, type)
  }

  redactJob (job: IJob) {
    return this.http.put<IJob>(`${this.firebaseService.firebaseConfig.databaseURL}/jobs/${job.id}.json`, job)
  }

  deleteJob(job: IJob) {
    return this.http.delete(`${this.firebaseService.firebaseConfig.databaseURL}/jobs/${job.id}.json`,)
  }

  getAllJobs(): Observable<IJob[]> {
    return this.http.get(`${this.firebaseService.firebaseConfig.databaseURL}/jobs.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      })
    );
  }
  getAllTypes(): Observable<Object[]> {
    return this.http.get(`${this.firebaseService.firebaseConfig.databaseURL}/jobsTypes.json`).pipe(
      map(res => Object.values(res))
    )

  }


}
