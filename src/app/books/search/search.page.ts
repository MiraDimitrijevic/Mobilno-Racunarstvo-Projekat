import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit, OnDestroy {
  books: BookModel[] =[];
  private bookSub:Subscription= Subscription.EMPTY;
  constructor( private bookService: BooksService) {
   }

  ngOnInit() {
    this.bookSub =this.bookService.book.subscribe((books) =>{
      this.books=books;
    })
  }

  ngOnDestroy() {
    if(this.bookSub){
      this.bookSub.unsubscribe;
    }
  }

  ionViewWillEnter(){
    this.bookService.getBooks().subscribe((bookData) => {
   
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
    this.results = this.books.filter((book) => book.name.toLowerCase().indexOf(query) > -1);
  }

}
