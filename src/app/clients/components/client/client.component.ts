import {Component, Input} from '@angular/core';
import {IClient} from "../../interfaces";
import {ClientsService} from "../../services/clients.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  @Input() client: IClient | undefined
  short: boolean = true

constructor(private clientsService: ClientsService) {
}
  delete (client: IClient) {
    this.clientsService.deleteClient(client).subscribe(
      (res) => {
        console.log('Клиент удален', res)},
      (error) => {
        console.log(error)
      }
    )
  }
}
