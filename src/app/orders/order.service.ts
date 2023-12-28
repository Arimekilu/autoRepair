import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {ICar, IClient, IOrder} from "../clients/interfaces";
import {FirebaseService} from "../fb/firebase.service";

@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient, private firebaseService: FirebaseService) {

  }

  setOrder (order: IOrder, client: IClient, selectedCar: ICar, mileage?: number) {
    const clientForPut: IClient = client

    if (mileage) {
      if (clientForPut.cars?.find(car => car.vin == selectedCar.vin)) {
        // @ts-ignore
        clientForPut.cars.find(car => car.vin == selectedCar.vin).mileAge = mileage
      }  else return
    }

    if (clientForPut.orders) {
      clientForPut.orders.push(order)
    } else {
      clientForPut.orders = [order]
    }
  return this.httpClient.put(`${this.firebaseService.firebaseConfig.databaseURL}/clients/${client.id}.json`, clientForPut)
  }




}
