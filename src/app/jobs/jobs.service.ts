import {Injectable} from "@angular/core";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {IJob} from "./interfaces";
import {FirebaseService} from "../fb/firebase.service";
import {Observable} from "rxjs";

@Injectable()

export class JobsService {

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
  }

  createJob (job: IJob): Observable<IJob> {
   return  this.http.post<IJob>(`${this.firebaseService.firebaseConfig.databaseURL}/jobs`, job)
  }

  getAllData(): Observable<any> {
    return this.http.get<any>(`${this.firebaseService.firebaseConfig.databaseURL}`)
  }




}
