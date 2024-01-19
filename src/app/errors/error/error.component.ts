import {Component, Input} from '@angular/core';
import {IError} from "../../interfaces/error.interface";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {
  @Input()error?: IError


}
