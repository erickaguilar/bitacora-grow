import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@data/services/user.service'
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '@data/services/alert.service';

@Component({
	selector: 'app-signin',
	templateUrl: './signin.component.html',
	styleUrls: ['./signin.component.scss'],
})
export class SigninComponent {

  signinForm!: FormGroup;
  signupForm!: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private alertService: AlertService
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
    this.userService.autorizationService(name, password).subscribe({
      next: (res) => {
        if (res) {
          this.alertService.infoAlert('Bienvenido de nuevo '+ name +'.');
          localStorage.setItem('token', res.id);
          localStorage.setItem('name', res.nombre);
          localStorage.setItem('email', res.email);
          this.router.navigate(['/home']);
        } else {
          this.alertService.warningAlert('Credenciales incorrectas.');
        }
      },
      error: (err) => {
        console.error(err.message);
        this.alertService.errorAlert(err.statusText);
        this.spinner.hide();
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
    this.userService.registerService(name, password, email).subscribe({
      next: (res) => {
        if (res) {
          this.alertService.successAlert('La información de '+ name +' se ha enviado correctamente.');
          this.signupForm.reset();
          this.showLogin();
        } else {
          this.alertService.warningAlert('Datos incorrectos. Intente nuevamente por favor.');
        }
      },
      error:(err) => {
        console.error(err.message);
        this.alertService.errorAlert(err.statusText);
        this.spinner.hide();
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

}
