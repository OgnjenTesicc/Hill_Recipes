import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { Activate } from './activate/activate';
import { Login } from './login/login';
import { Register } from './register/register';

@NgModule({
  declarations: [Login, Register, Activate],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule {}
