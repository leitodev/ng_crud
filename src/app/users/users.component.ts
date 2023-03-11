import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  department: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  data: User[] = [
    {
      id: 123213,
      name: 'Max',
      surname: 'Smith',
      email: 'maxsmith@gmail.com',
      phone: '093213213',
      department: 'support',
    },
    {
      id: 123443,
      name: 'Johny',
      surname: 'Dee',
      email: 'johnydee@gmail.com',
      phone: '09321323213',
      department: 'dev',
    },
  ];

  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'surname',
    'email',
    'phone',
    'department',
  ];
  dataSource = new MatTableDataSource<User>(this.data);
  selection = new SelectionModel<User>(true, []);

  constructor() {}

  ngOnInit() {}

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  delete() {
    this.multiDeleteCheck();

    let userDataAfterDelete = [...this.dataSource.data];

    for (const selected of this.selection.selected) {
      userDataAfterDelete = userDataAfterDelete.filter(
        (user) => user.id !== selected.id
      );
      this.selection.deselect(selected);
    }

    this.updateTableData(userDataAfterDelete);
  }

  multiDeleteCheck() {
    if (this.isAllSelected()) {
      console.log('Will be deleted all !'); // add modal approve instead
    }
  }

  updateTableData(data: User[]) {
    this.dataSource = new MatTableDataSource<User>(data);
  }

  edit(row: User) {
    console.log(row);
  }
}
