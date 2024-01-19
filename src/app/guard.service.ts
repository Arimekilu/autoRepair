import {inject, Injectable} from '@angular/core';
import {FirebaseService} from "./fb/firebase.service";


export const aboutGuard = () => {
  const authService = inject(FirebaseService);    // получаем сервис
  return authService.isAuth
};

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  constructor() {
  }

}
