import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPage } from './list.page';

const routes: Routes = [
  {
    path: '',
    component: ListPage,
    pathMatch:'full'
  },

  {
    path: ':bookId',
    loadChildren: () => import('./book-details/book-details.module').then( m => m.BookDetailsPageModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPageRoutingModule {}
