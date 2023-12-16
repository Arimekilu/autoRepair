import {Component, Input} from '@angular/core';
import {IJob} from "../interfaces";

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent {

  @Input() job: IJob | undefined

}
