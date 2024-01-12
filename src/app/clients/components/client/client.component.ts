import {Component, Input, OnInit} from '@angular/core';
import {IClient} from "../../interfaces";
import {ClientsService} from "../../services/clients.service";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client: IClient | undefined
  short: boolean = true
  id?: string

  constructor(private clientsService: ClientsService, private route: ActivatedRoute) {
  }

  delete(client: IClient) {
    this.clientsService.deleteClient(client).subscribe(
      (res) => {
        console.log('Клиент удален', res)
      },
      (error) => {
        console.log(error)
      }
    )
  }

  ngOnInit(): void {
    if (!this.client && this.id) {
      this.route.params.subscribe(params => this.id = params["id"])
      this.clientsService.getClientById(this.id).subscribe((res) => {
        console.log(res)})
    }
  }
}
