import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {IClient} from "../../interfaces";
import {Observable} from "rxjs";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit {
  clients$?: Observable<IClient[]>
  dataSource: MatTableDataSource<IClient, MatTableDataSourcePaginator> | undefined
  clients?: IClient[]

  constructor(private clientsService: ClientsService, private router: Router) {
  }

  getClient(phone: string | number): IClient | undefined {

    const client = this.clients ? this.clients.find(client => client.phone == phone) : undefined

    console.log(client )
    if (client && client.id) {
      this.clientsService.getClientById(client.id).subscribe(res => console.log(res))
    }
    this.router.navigate(['client', client?.id])
    return client


  }

  ngOnInit(): void {
    this.clients$ = this.clientsService.clients$
    this.clients$.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res)
      this.clients = res
      console.log(res)
    })
  }

  displayedColumns: string[] = ['phone', 'name', 'cars', 'orders'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
