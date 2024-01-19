import {Component, Input, OnInit} from '@angular/core';
import {IClient} from "../../interfaces";
import {ClientsService} from "../../services/clients.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client: IClient | undefined
  short: boolean = true
  id?: string
  orderAdd: boolean = false
  showCars: boolean = false
  showOrders: boolean = false
  createOrder: boolean = false

  constructor(private clientsService: ClientsService, private route: ActivatedRoute, private router: Router) {
  }

  delete(client: IClient) {
    //TODO Переделать на модалку
    confirm('Точно?')
    {
      this.clientsService.deleteClient(client).subscribe(
        (res) => {
          console.log('Клиент удален', res)
          this.client = undefined
          this.router.navigate(['clients'])
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }

  ngOnInit(): void {
    if (!this.client) {
      this.route.params.subscribe((params) => {
        console.log(params)
        this.id = params["id"]
        this.clientsService.getClientById(params["id"]).subscribe((res) => {
          this.client = res
          this.client.id = this.id
          console.log('client by id', res)
        })
      })

    }
  }

  orderAddToggle() {
    this.orderAdd = true
  }
}
