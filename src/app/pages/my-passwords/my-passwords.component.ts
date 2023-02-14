import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

//* INTERFACES
import { Category } from 'src/app/models/category.type';
import { LogedUser } from 'src/app/models/loged-user.interface';
import { PasswordList } from 'src/app/models/password-list.interface';
import { UserService } from 'src/app/services/user.service';

//* SERVICES
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-my-passwords',
  templateUrl: './my-passwords.component.html',
  styleUrls: ['./my-passwords.component.scss']
})
export class MyPasswordsComponent implements OnInit {
  dataSource = new MatTableDataSource<PasswordList>();
  DATA: PasswordList[] = [];
  passwords: any[] = [];
  user!: LogedUser;
  userCategories: Category = {};
  hidePass = true;

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

  constructor(
    private auth: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this.auth.getUser;
    this.getCategories();
    this.getPasswordsList();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getPasswordsList() {
    this.userService.getUserPasswords(this.user.id).subscribe({
      next: (passwords => {
        passwords.forEach(pass => {
          const categoryName = pass.categoryId;

          //Create PasswordList object.
          const passFile: PasswordList = {
            category: this.userCategories[categoryName] || "",
            created_at: pass.createdAt || "",
            name: pass.name,
            password: pass.password,
            actions: ''
          }
          this.DATA.push(passFile);
        });
        this.dataSource.data = this.DATA;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
    })
  }

  getCategories() {
    this.userService.getUserCategories(this.user.id).subscribe({
      next: (categories => {
        categories.forEach(category => {
          const name = category.name.split('_').pop();
          const cat: Category = {};
          this.userCategories[category.id] = name;
        });
      }),
      error: console.log
    })
  }

  passVisibility(event: any) {
    //Change input type.
    let inputType = event.target.parentNode.children[0].type
    inputType = (inputType === 'password') ? 'text' : 'password';
    event.target.parentNode.children[0].setAttribute('type', inputType);

    //Change icon img.
    const textIcon = (inputType === 'password') ? 'visibility_off' : 'visibility';
    event.target.innerHTML = textIcon;
  }
}
