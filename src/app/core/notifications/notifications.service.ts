import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { inject, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly _snackBar = inject(MatSnackBar);
  private readonly _snackBarConfig: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  public showError(message: string): void {
    this._snackBar.open(message, '', this._snackBarConfig);
  }

  public showSuccess(message: string): void {
    this._snackBar.open(message, '', this._snackBarConfig);
  }
}
