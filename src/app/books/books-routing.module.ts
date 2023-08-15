import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BooksPage } from './books.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: BooksPage,
    children:[
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('./search/search.module').then( m => m.SearchPageModule)
      },
      {path:'',
      redirectTo:'/books/tabs/list',
      pathMatch:'full'
 }
    ],
    
  },
  {path:'',
  redirectTo:'/books/tabs/list',
  pathMatch:'full'
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BooksPageRoutingModule {}
