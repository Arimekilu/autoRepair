import { Component } from '@angular/core';
import {FirebaseService} from "../fb/firebase.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  authObserve$

  constructor(private firebaseService: FirebaseService) {
    this.authObserve$ = this.firebaseService.authObserve$
  }

}
