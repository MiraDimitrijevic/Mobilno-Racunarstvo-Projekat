import { NgModule } from '@angular/core';
import { BookElementComponent } from './book-element/book-element.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports:[
    IonicModule,
    CommonModule,
    FormsModule,
  ],
  declarations: [
    BookElementComponent,
  ],
  exports: [
    BookElementComponent,
  ]
})
export class BookModule { }