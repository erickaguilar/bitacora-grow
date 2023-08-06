import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  public successAlert(message: string, action?: string) {
    if (action === undefined) { action = 'Cerrar'; }
    this.openSnackBar(message, action, 'success-snackbar');
  }

  public errorAlert(message: string, action?: string) {
    if (action === undefined) { action = 'Cerrar'; }
    this.openSnackBar(message, action, 'error-snackbar');
  };

  public warningAlert(message: string, action?: string) {
    if (action === undefined) { action = 'Cerrar'; }
    this.openSnackBar(message, action, 'warning-snackbar');
  }

  public infoAlert(message: string, action?: string) {
    if (action === undefined) { action = 'Cerrar'; }
    this.openSnackBar(message, action, 'info-snackbar');
  }

  private openSnackBar(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: type
    });

  }

}
