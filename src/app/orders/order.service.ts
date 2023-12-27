import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IClient, IOrder} from "../clients/interfaces";
import {FirebaseService} from "../fb/firebase.service";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient, private firebaseService: FirebaseService) {

  }

  setOrder (order: IOrder, client: IClient) {
    const clientForPut: IClient = client
    client.orders?.push(order)
  return this.httpClient.put(`${this.firebaseService.firebaseConfig.databaseURL}/clients/${client.id}.json`, clientForPut)
  }




}
