import {Injectable} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {IJob} from "./interfaces";
import {FirebaseService} from "../fb/firebase.service";
import {map, Observable} from "rxjs";

@Injectable()

export class JobsService {

  public get allJobs$ () {
    return this.getAllJobs()
  }

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
  }

  createJob(job: IJob): Observable<IJob> {
    return this.http.post<IJob>(`${this.firebaseService.firebaseConfig.databaseURL}/jobs.json`, job)
  }

 deleteJob (job: IJob) {
  return this.http.delete(`${this.firebaseService.firebaseConfig.databaseURL}/jobs/${job.id}.json`,)
 }

  private getAllJobs(): Observable<IJob[]> {
    return this.http.get(`${this.firebaseService.firebaseConfig.databaseURL}/jobs.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      })
    );
  }


}
