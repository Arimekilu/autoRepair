import {Component, OnInit} from '@angular/core';
import {ClientsService} from "../../services/clients.service";
import {IClient} from "../../interfaces";
import {Observable} from "rxjs";
import {MatTableDataSource, MatTableDataSourcePaginator} from "@angular/material/table";

@Component({
  selector: 'app-all-clients',
  templateUrl: './all-clients.component.html',
  styleUrls: ['./all-clients.component.scss']
})
export class AllClientsComponent implements OnInit {
  clients$?: Observable<IClient[]>
  dataSource: MatTableDataSource<IClient, MatTableDataSourcePaginator> | undefined

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.clients$ = this.clientsService.clients$
    this.clients$.subscribe((res) => {
      this.dataSource = new MatTableDataSource(res)
      console.log(res)
    })
  }

  displayedColumns: string[] = ['phone', 'name', 'cars', 'orders'];

  // dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (this.dataSource) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }

}
