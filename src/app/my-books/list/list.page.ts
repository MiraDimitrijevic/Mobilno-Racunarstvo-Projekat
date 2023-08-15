import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';
import { UserModel } from 'src/app/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
  books: BookModel[]= [];

  user:UserModel={id:"1", name:"Marija", surname:"Markovic", email:"Marija123", password:"12345678"};

  constructor(private bookService:BooksService) {
   }

  ngOnInit() {
this.bookService.mybook.subscribe((books) =>{
  this.books=books;
})
  }

  ngOnDestroy() {
  }

  ionViewWillEnter(){
    this.bookService.getMyBooks().subscribe((bookData) => {
      
     // this.books=bookData;
    })
  }

  ionViewDidEnter(){

  }
  ionViewWillLeave(){
    
  }
  ionViewDiidLeave(){
    
  }

}
