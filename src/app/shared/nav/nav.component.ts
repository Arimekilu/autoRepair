import {Component, OnInit} from '@angular/core';
import {FirebaseService} from "../../fb/firebase.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{

  public isAuth

  constructor(private firebaseService: FirebaseService) {
    this.isAuth = firebaseService.isAuth()
  }

  ngOnInit(): void {
    this.isAuth = this.firebaseService.isAuth()
    console.log(this.firebaseService.auth.currentUser)

  }

}
