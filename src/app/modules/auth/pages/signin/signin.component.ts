import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@data/services/user.service'
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '@data/services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  standalone: true,
  providers: [UserService],
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  signinForm!: FormGroup;
  hide = true;

  constructor(
    readonly fb: FormBuilder,
    readonly userService: UserService,
    readonly router: Router,
    readonly spinner: NgxSpinnerService,
    readonly alertService: AlertService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.signinForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async signInWithFirebase(): Promise<void> {
    try {
      this.spinner.show();
      const email = this.signinForm.value.name;
      const password = this.signinForm.value.password;

      const user = await this.userService.autorizationService(email, password);

      this.alertService.infoAlert('Bienvenido de nuevo ' + user.displayName || email + '.');
      localStorage.setItem('token', user.uid);
      localStorage.setItem('name', user.displayName ?? email);
      localStorage.setItem('email', user.email ?? email);
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      this.alertService.errorAlert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    } finally {
      this.spinner.hide();
      this.signinForm.reset();
    }
  }

  public showRegister(): void {
    const wrapper = document.querySelector('.wrapper');
    wrapper?.classList.toggle('active');
  }

  public showLogin(): void {
    const wrapper = document.querySelector('.wrapper');
    wrapper?.classList.toggle('active');
  }

  goRegister(): void {
    this.router.navigate(['/auth/signup']);
  }

}
