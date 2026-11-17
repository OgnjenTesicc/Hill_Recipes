import { Routes } from '@angular/router';
import { SharedTest } from './pages/shared-test/shared-test';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
  {
    path: 'shared-test',
    component: SharedTest
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth-module').then(m => m.AuthModule)
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/profile/profile-module').then(m => m.ProfileModule)
  },
  {
    path: 'recipes',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/recipes/recipes-module').then(m => m.RecipesModule)
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];