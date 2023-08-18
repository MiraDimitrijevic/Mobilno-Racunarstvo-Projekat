import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
books: BookModel[]=[];
private bookSub:Subscription=Subscription.EMPTY;
  constructor( private bookService: BooksService) {
   }

  ngOnInit() {
    this.bookSub=this.bookService.book.subscribe((books) =>{
      this.books=books;
    })
  }

  
  ngOnDestroy() {
    if(this.bookSub)
    this.bookSub.unsubscribe;
  }

  ionViewWillEnter(){
    this.bookService.getBooks().subscribe((bookData) => {
   
  //    this.books=bookData;
    })

  }

  ionViewDidEnter(){

  }
  ionViewWillLeave(){
    
  }
  ionViewDiidLeave(){
    
  }

}
