import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'my-books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    loadChildren: () => import('./books/books.module').then( m => m.BooksPageModule),
    canActivate:[AuthGuard]
  },
  {
    path: 'my-books',
    loadChildren: () => import('./my-books/my-books.module').then( m => m.MyBooksPageModule),
    canActivate:[AuthGuard]

  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then( m => m.RegisterPageModule)
  },
 
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
