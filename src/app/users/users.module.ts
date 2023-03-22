import { NgModule } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { UserFormDialogComponent } from './user-form-dialog/user-form-dialog.component';

const routes: Routes = [
  {
    path: '',
    component: UsersComponent,
  },
];

@NgModule({
  declarations: [UsersComponent, UserFormDialogComponent],
  imports: [SharedModule, RouterModule.forChild(routes)],
})
export class UsersModule {}
