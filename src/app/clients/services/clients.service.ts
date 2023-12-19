import {Injectable} from '@angular/core';
import {IClient} from "../interfaces";
import {HttpClient} from "@angular/common/http";
import {FirebaseService} from "../../fb/firebase.service";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  public get clients$() {
    return this.getAllClients()
  }

  constructor(private http: HttpClient, private firebaseService: FirebaseService) {
  }

  setClient(client: IClient) {
    return this.http.post(`${this.firebaseService.firebaseConfig.databaseURL}/clients.json`, client)
  }

  private getAllClients(): Observable<IClient[]> {
    return this.http.get(`${this.firebaseService.firebaseConfig.databaseURL}/clients.json`).pipe(
      map((response: { [key: string]: any }) => {
        return Object.keys(response).map((key) => ({
          ...response[key],
          id: key,
        }));
      })
    );

  }

}
