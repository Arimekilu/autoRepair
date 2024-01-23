import {inject, Injectable} from '@angular/core';
import {FirebaseService} from "./fb/firebase.service";
import {Observable} from "rxjs";




export const Guard = (): Observable<boolean> => {
  const authService = inject(FirebaseService);    // получаем сервис
  return authService.authObserve$
};



@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor() {
  }

}
