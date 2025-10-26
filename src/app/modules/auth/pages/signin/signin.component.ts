import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@data/services/user.service'
import { NgxSpinnerService } from "ngx-spinner";
import { AlertService } from '@data/services/alert.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { StoreService } from '@data/services/store.service';

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
    readonly alertService: AlertService,
    readonly storeService: StoreService
  ) {
    this.createForm();
  }

  private createForm(): void {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public async onSubmit(): Promise<void> {
    if (this.signinForm.invalid) {
      return;
    }

    try {
      this.spinner.show();
      const { email, password } = this.signinForm.value;

      const response = await this.userService.autorizationService(email, password);

      if (response && response.token && response.user) {
        this.alertService.infoAlert('Bienvenido de nuevo ' + response.user.name + '.');
        this.storeService.setToken(response.token);
        this.storeService.setName(response.user.name);
        this.storeService.setEmail(response.user.email);
        this.router.navigate(['/home']);
      } else {
        throw new Error('Respuesta de autenticación inválida');
      }
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
