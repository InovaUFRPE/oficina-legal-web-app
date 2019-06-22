import {Component} from '@angular/core';

export interface PeriodicElement {
  name: string;
  position: number;
  total: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'America Ford', total: 7 },
  {position: 2, name: 'Nissan Imbiribeira', total: 4},
  {position: 3, name: 'Toyolex BV', total: 6},
  {position: 4, name: 'Borracharia da esquina', total: 9},
  {position: 5, name: 'Honda Afogados', total: 10},
  {position: 6, name: 'Honda Boa Viagem', total: 12},
  {position: 7, name: 'America Ford Espinheiro', total: 14},
  {position: 8, name: 'Fiat Italiana', total: 15},
];

/**
 * @title Basic use of `<table mat-table>`
 */
@Component({
  selector: 'app-gestor-oficina-controller',
  styleUrls: ['./gestor-oficina.component.html'],
  templateUrl: './gestor-oficina.component.scss',
})
export class TableBasicExample {
  displayedColumns: string[] = ['position', 'name', 'total'];
  dataSource = ELEMENT_DATA;
}