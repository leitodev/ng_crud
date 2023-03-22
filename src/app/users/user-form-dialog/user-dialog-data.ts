import { User } from '../users.component';
import { UserDialogAction } from './user-dialog-action';

export interface UserDialogData {
  title: string;
  type: UserDialogAction.EDIT | UserDialogAction.ADD;
  user?: User;
}
