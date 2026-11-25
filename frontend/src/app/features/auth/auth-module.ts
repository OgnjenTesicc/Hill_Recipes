import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing-module';
import { SharedModule } from '../../shared/shared-module';
import { Activate } from './activate/activate';
import { Register } from './register/register';

@NgModule({
  declarations: [Register, Activate],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    AuthRoutingModule,
    SharedModule
  ],
})
export class AuthModule {}
