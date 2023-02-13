import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { PasswordList } from 'src/app/models/password-list.interface';

const DATA: PasswordList[] = [
  { name: 'Netflix', password: 'abc123.', category: 'streaming', created_at: '2023-02-10' },
  { name: 'HBO Max', password: 'abc123.', category: 'streaming', created_at: '2023-02-12' },
  { name: 'Twitter', password: 'abc123.', category: 'Redes Sociales', created_at: '2023-02-15' },
  { name: 'Udemy', password: 'abc123.', category: 'Cursos', created_at: '2023-02-09' },
  { name: 'Netflix', password: 'abc123.', category: 'streaming', created_at: '2023-02-10' },
  { name: 'HBO Max', password: 'abc123.', category: 'streaming', created_at: '2023-02-12' },
  { name: 'Twitter', password: 'abc123.', category: 'Redes Sociales', created_at: '2023-02-15' },
  { name: 'Udemy', password: 'abc123.', category: 'Cursos', created_at: '2023-02-09' },
  { name: 'Netflix', password: 'abc123.', category: 'streaming', created_at: '2023-02-10' },
  { name: 'HBO Max', password: 'abc123.', category: 'streaming', created_at: '2023-02-12' },
  { name: 'Twitter', password: 'abc123.', category: 'Redes Sociales', created_at: '2023-02-15' },
  { name: 'Udemy', password: 'abc123.', category: 'Cursos', created_at: '2023-02-09' },
  { name: 'Netflix', password: 'abc123.', category: 'streaming', created_at: '2023-02-10' },
  { name: 'HBO Max', password: 'abc123.', category: 'streaming', created_at: '2023-02-12' },
  { name: 'Twitter', password: 'abc123.', category: 'Redes Sociales', created_at: '2023-02-15' },
  { name: 'Udemy', password: 'abc123.', category: 'Cursos', created_at: '2023-02-09' },
  { name: 'Netflix', password: 'abc123.', category: 'streaming', created_at: '2023-02-10' },
  { name: 'HBO Max', password: 'abc123.', category: 'streaming', created_at: '2023-02-12' },
  { name: 'Twitter', password: 'abc123.', category: 'Redes Sociales', created_at: '2023-02-15' },
  { name: 'Udemy', password: 'abc123.', category: 'Cursos', created_at: '2023-02-09' },
  { name: 'Netflix', password: 'abc123.', category: 'streaming', created_at: '2023-02-10' },
  { name: 'HBO Max', password: 'abc123.', category: 'streaming', created_at: '2023-02-12' },
  { name: 'Twitter', password: 'abc123.', category: 'Redes Sociales', created_at: '2023-02-15' },
  { name: 'Udemy', password: 'abc123.', category: 'Cursos', created_at: '2023-02-09' }
];

@Component({
  selector: 'app-my-passwords',
  templateUrl: './my-passwords.component.html',
  styleUrls: ['./my-passwords.component.scss']
})
export class MyPasswordsComponent implements AfterViewInit {
  dataSource: MatTableDataSource<PasswordList>;

  columns = [
    {
      columnDef: 'name',
      header: 'Nombre',
      cell: (element: PasswordList) => `${element.name}`,
    },
    {
      columnDef: 'password',
      header: 'Contraseña',
      cell: (element: PasswordList) => `${element.password}`,
    },
    {
      columnDef: 'category',
      header: 'Categoría',
      cell: (element: PasswordList) => `${element.category}`,
    },
    {
      columnDef: 'created_at',
      header: 'Fecha',
      cell: (element: PasswordList) => `${element.created_at}`,
    },
    {
      columnDef: 'actions',
      header: '',
      cell: null
    }
  ];

  displayedColumns = this.columns.map(c => c.columnDef);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(DATA);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
