import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
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
    path: 'search',
    loadChildren: () =>
      import('./features/search/search-module').then(m => m.SearchModule)
  },
  {
    path: 'ingredients',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/ingredients/ingredients-module').then(m => m.IngredientsModule)
  },
  {
    path: 'shopping-lists',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/shopping-lists/shopping-lists-module').then(m => m.ShoppingListsModule)
  },
  {
    path: 'map',
    loadChildren: () =>
      import('./features/map/map-module').then(m => m.MapModule)
  },
  {
    path: 'notifications',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/notifications/notifications-module').then(m => m.NotificationsModule)
  },
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadChildren: () =>
      import('./features/admin/admin-module').then(m => m.AdminModule)
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