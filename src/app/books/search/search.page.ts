import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  books: BookModel[] =[];
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
   
   //   this.books=bookData;
    })

  }

  ionViewDidEnter(){

  }
  ionViewWillLeave(){
    
  }
  ionViewDiidLeave(){
    
  }


  public results:BookModel[] = [...this.books];

  handleInput(event:any) {
    const query = event.target.value.toLowerCase();
    this.results = this.books.filter((b) => b.name.toLowerCase().indexOf(query) > -1);
  }

}
