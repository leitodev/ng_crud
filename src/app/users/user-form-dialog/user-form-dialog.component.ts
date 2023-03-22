import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../core/constants/role';
import { UserDialogData } from './user-dialog-data';
import { UserDialogAction } from './user-dialog-action';

@Component({
  selector: 'app-user-form-dialog',
  templateUrl: './user-form-dialog.component.html',
  styleUrls: ['./user-form-dialog.component.scss'],
})
export class UserFormDialogComponent implements OnInit, OnDestroy {
  roles: Role[] = [Role.Dev, Role.DevOps, Role.QA, Role.Support];

  form = this.fb.group({
    name: ['', Validators.required],
    surname: [''],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    role: ['', Validators.required],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData,
    public fb: FormBuilder
  ) {
    if (this.data.user) {
      this.form.patchValue(this.data.user);
    }
  }

  ngOnInit() {}

  save() {
    this.data.type === UserDialogAction.ADD ? this.add() : this.update();
  }

  /* TODO new add real actions */
  update() {
    console.log('EDIT this.form.value', this.form.value);
  }

  add() {
    console.log('ADD this.form.value', this.form.value);
  }

  ngOnDestroy() {
    console.log('UserFormDialogComponent DESTROY!!!');
  }
}
