import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IClient, IOrder} from "../clients/interfaces";
import {FirebaseService} from "../fb/firebase.service";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient, private firebaseService: FirebaseService) {

  }

  setOrder (order: IOrder, client: IClient) {
  return this.httpClient.post(`${this.firebaseService.firebaseConfig.databaseURL}/clients/${client.id}/orders.json`, order)
  }




}
