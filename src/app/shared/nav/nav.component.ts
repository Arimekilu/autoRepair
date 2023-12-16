import {Component} from '@angular/core';
import {FirebaseService} from "../../fb/firebase.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  authObserve$
  logout() {
    this.firebaseService.logout()
  }

  constructor(private firebaseService: FirebaseService) {
    this.authObserve$ = this.firebaseService.authObserve$
  }

}
