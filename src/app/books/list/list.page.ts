import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit, OnDestroy {
books: BookModel[]=[];
  constructor( private bookService: BooksService) {
   }

  ngOnInit() {
    this.bookService.book.subscribe((books) =>{
      this.books=books;
    })
  }

  
  ngOnDestroy() {
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
