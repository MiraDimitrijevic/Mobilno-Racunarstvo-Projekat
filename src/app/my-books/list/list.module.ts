import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPageRoutingModule } from './list-routing.module';

import { ListPage } from './list.page';
import { BookModule } from 'src/app/book-module';
import { BookElementComponent } from 'src/app/book-element/book-element.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPageRoutingModule,
    BookModule

  ],
  declarations: [ListPage]
})
export class ListPageModule {}
