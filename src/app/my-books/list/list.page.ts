import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
private bookSub:Subscription= Subscription.EMPTY;
  constructor(private bookService:BooksService) {
   }

  ngOnInit() {
this.bookSub=this.bookService.mybook.subscribe((books) =>{
  this.books=books;
})
  }

  ngOnDestroy() {
    if(this.bookSub) {
      this.bookSub.unsubscribe;
    }
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
