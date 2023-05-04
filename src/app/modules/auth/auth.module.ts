import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '@shared/shared.module';
import { SigninComponent } from './pages/signin/signin.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@shared/material/material.module';

@NgModule({
	declarations: [SigninComponent],
	imports: [SharedModule, AuthRoutingModule, ReactiveFormsModule, MaterialModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AuthModule {}
