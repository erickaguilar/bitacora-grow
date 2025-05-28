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
  selector: 'app-signup',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  signinForm!: FormGroup;
  signupForm!: FormGroup;
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

    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public async onSubmitUp(): Promise<void> {
    try {
      this.spinner.show();
      const name = this.signupForm.value.name;
      const password = this.signupForm.value.password;
      const email = this.signupForm.value.email;

      const user = await this.userService.registerService(name, email, password);

      this.alertService.successAlert('La información de ' + name + ' se ha enviado correctamente.');
      localStorage.setItem('token', user.uid);
      localStorage.setItem('name', user.displayName ?? name);
      localStorage.setItem('email', user.email ?? email);
      this.signupForm.reset();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error durante el registro:', error);
      this.alertService.errorAlert('Error al registrarse. Por favor, verifica tus datos.');
    } finally {
      this.spinner.hide();
    }
  }

  public showRegister(): void {
    const wrapper = document.querySelector('.wrapper');
    wrapper?.classList.toggle('active');
  }

  public showLogin(): void {
    this.router.navigate(['/auth/signin']);
  }

  goRegister(): void {
    this.router.navigate(['/auth/signup']);
  }

}
