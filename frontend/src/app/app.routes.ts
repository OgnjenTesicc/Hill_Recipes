import { Routes } from '@angular/router';
import { SharedTest } from './pages/shared-test/shared-test';

export const routes: Routes = [
  { path: 'shared-test', component: SharedTest },
  { path: '', redirectTo: 'shared-test', pathMatch: 'full' },
];