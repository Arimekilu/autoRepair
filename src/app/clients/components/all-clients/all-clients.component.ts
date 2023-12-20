import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {IClient} from "../../interfaces";
import {Observable} from "rxjs";

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit{
  clients$?: Observable<IClient[]>
  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.clients$ = this.clientsService.clients$
    this.clients$.subscribe((res) => {console.log(res)})
  }



}
