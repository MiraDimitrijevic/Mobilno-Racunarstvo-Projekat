import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyBooksPage } from './my-books.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: MyBooksPage,
    children:[
      {
        path: 'add',
        loadChildren: () => import('./add/add.module').then( m => m.AddPageModule)
      },
      {
        path: 'list',
        loadChildren: () => import('./list/list.module').then( m => m.ListPageModule)
      },
      {path:'',
      redirectTo:'/my-books/tabs/list',
      pathMatch:'full'
    }
    ]
  },
  {path:'',
  redirectTo:'/my-books/tabs/list',
  pathMatch:'full'
}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyBooksPageRoutingModule {}
