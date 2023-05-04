import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiUserService } from '@data/services/api-user.service'
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.css'],
})
export class SigninComponent {

  signinForm!: FormGroup;
  signupForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private apiUserService: ApiUserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.signinForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.spinner.show();
    const name = this.signinForm.value.name;
    const password = this.signinForm.value.password;
    this.apiUserService.autorizationService(name, password).subscribe({
      next: (res) => {
        if (res) {
          this.openSnackBar('Bienvenido de nuevo '+ name +'.', 'Cerrar', 'infoSnackBar');
          localStorage.setItem('token', res.id);
          localStorage.setItem('name', res.nombre);
          localStorage.setItem('email', res.email);
          this.router.navigate(['']);
        } else {
          this.openSnackBar('Credenciales incorrectas.', 'Cerrar', 'dangerSnackBar');
        }
      },
      error: (err) => {
        console.error(err);
        this.openSnackBar(err, 'Cerrar','dangerSnackBar');
      },
      complete: () => {
        this.spinner.hide();
        this.signinForm.reset();
      }
    })
  }

  public onSubmitUp(): void {
    this.spinner.show();
    const name = this.signupForm.value.name;
    const password = this.signupForm.value.password;
    const email = this.signupForm.value.email;
    this.apiUserService.registerService(name, password, email).subscribe({
      next: (res) => {
        if (res) {
          this.openSnackBar('La información de '+ name +' se ha enviado correctamente.', 'Cerrar','successSnackBar');
          this.signupForm.reset();
          this.showLogin();
        } else {
          this.openSnackBar('Datos incorrectos. Intente nuevamente por favor.', 'Cerrar', 'dangerSnackBar');
        }
      },
      error:(err) => {
        console.error(err);
        this.openSnackBar(err, 'Cerrar','dangerSnackBar');
      },
      complete: () => {
        this.spinner.hide();
        this.signupForm.reset();
      }
    })
  }

  public showRegister(): void {
    const wrapper = document.querySelector('.wrapper');
    wrapper?.classList.toggle('active');
  }

  public showLogin(): void {
    const wrapper = document.querySelector('.wrapper');
    wrapper?.classList.toggle('active');
  }

  private openSnackBar(message: string, action: string, type: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      verticalPosition: 'top',
      panelClass: type
    });

  }


}
