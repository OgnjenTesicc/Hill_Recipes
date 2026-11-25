import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Activate } from './activate/activate';
import { Login } from './login/login';
import { Register } from './register/register';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'activate', component: Activate }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
