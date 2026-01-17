import { inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private _snackBar = inject(MatSnackBar);
  private _snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  public showSuccess = (message: string): void => {
    this._snackBar.open(message, '', this._snackBarConfig);
  };

  public showError = (message: string): void => {
    this._snackBar.open(message, '', this._snackBarConfig);
  };
}
