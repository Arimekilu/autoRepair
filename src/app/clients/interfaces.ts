import {IJob} from "../jobs/interfaces";

export interface IClient {
  name: string,
  phone: string,
  comment?: string
  cars: ICar[],
  orders: IOrder[],
  id?: string
}

export interface ICar {
  mark: string,
  model: string,
  vin: string,
  mileage: number,
  year: number,
  number: string,
  id?: string,
  comment?: string
}

export interface IOrder {
  car: ICar,
  mileage: number,
  jobs: IJob[],
  comment?: string,
  id?: string,
  date: string
}
