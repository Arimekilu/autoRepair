import {IJob} from "../jobs/interfaces";

export interface IClient {
  name: string,
  phone: string,
  comment?: string
  cars?: ICar[],
  orders?: IOrder[],
  id?: string
}

export interface ICar {
  mark: string,
  model: string,
  vin: string,
  mileAge: number,
  year: number,
  number: string,
  id?: string,
  comment?: string
}

export interface IOrder {
  car: ICar,
  jobs: IJob[],
  comment?: string,
  id?: string,
  date: string
}
