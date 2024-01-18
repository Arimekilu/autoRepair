import {inject, Injectable} from '@angular/core';
import {FirebaseService} from "./fb/firebase.service";
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";


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
