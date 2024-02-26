import {Component} from '@angular/core';
import {FirebaseService} from "./fb/firebase.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'autoRepair';
  authObserve = false

  constructor(private firebaseService: FirebaseService) {
    this.firebaseService.authObserve$.subscribe(res => {
      console.log(res)
      this.authObserve = res
    })
  }


}
