import {Component, Input, OnInit} from '@angular/core';
import {IClient} from "../../interfaces";
import {ClientsService} from "../../services/clients.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IError} from "../../../interfaces/error.interface";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  @Input() client: IClient | undefined
  id?: string
  orderAdd: boolean = false
  showCars: boolean = false
  showOrders: boolean = false
  createOrder: boolean = false
  addCar: boolean = false
  loading: boolean = true
  IError?: IError

  constructor(private clientsService: ClientsService, private route: ActivatedRoute, private router: Router) {
  }

  delete(client: IClient) {
    //TODO Переделать на модалку

    if (confirm('Точно?')) {
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

  }

  ngOnInit(): void {
    if (!this.client) {
      this.route.params.subscribe((params) => {
          console.log(params)
          this.id = params["id"]
          this.clientsService.getClientById(params["id"]).subscribe((res) => {
            this.client = res
            this.client.id = this.id
            this.loading = false
          })
        },
        (error) => {
          console.log(error)
          this.loading = false
          this.IError = {
            code: error.code,
            message: error.message
          }
        },
        () => {
          this.loading = false
        })

    }
  }

  orderAddToggle() {
    this.orderAdd = true
  }

  protected readonly console = console;

}
