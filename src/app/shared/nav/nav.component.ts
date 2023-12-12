import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../fb/firebase.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  loggedIn$: any
  logout(){}


  constructor(private firebaseService: FirebaseService) {
    this.logout = firebaseService.logout

  }

  ngOnInit(): void {
    this.loggedIn$ = this.firebaseService.loggedIn$
  }

  test() {

  }


}
