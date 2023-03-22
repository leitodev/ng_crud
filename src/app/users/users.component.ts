import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';

import { MatDialog } from '@angular/material/dialog';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';
import { Role } from '../core/constants/role';
import { UserDialogAction } from './user-form-dialog/user-dialog-action';

export interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  role: Role;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  // TODO need to move it into service or firebase
  data: User[] = [
    {
      id: 123213,
      name: 'Max',
      surname: 'Smith',
      email: 'maxsmith@gmail.com',
      phone: '093213213',
      role: Role.Support,
    },
    {
      id: 123443,
      name: 'Johny',
      surname: 'Dee',
      email: 'johnydee@gmail.com',
      phone: '09321323213',
      role: Role.Dev,
    },
  ];

  displayedColumns: string[] = [
    'select',
    'id',
    'name',
    'surname',
    'email',
    'phone',
    'role',
    'edit',
  ];
  dataSource = new MatTableDataSource<User>(this.data);
  selection = new SelectionModel<User>(true, []);

  constructor(public dialog: MatDialog) {}

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
    // TODO need to move it into service
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: {
        title: `Edit ${row.name}`,
        type: UserDialogAction.EDIT,
        user: row,
      },
      width: '50vw',
    });
  }

  add() {
    // TODO need to move it into service
    const dialogRef = this.dialog.open(UserFormDialogComponent, {
      data: {
        title: 'add new user',
        type: UserDialogAction.ADD,
      },
      width: '50vw',
    });
  }
}
