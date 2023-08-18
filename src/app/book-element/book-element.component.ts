import { Component, Input, OnInit } from '@angular/core';
import { BookModel } from '../book.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent  implements OnInit {
@Input() book:BookModel={id:"1",name:"Rat i Mir", year:1950,author: {id:"1", name:"Vladimir", surname:"Nikolajevic Tolstoj", born:1867, dead:true, died:1955},
userAdded:{id:"1", name:"Marija", surname:"Markovic", email:"Marija123", password:"12345678"} };
  constructor(private router:Router) { }

  ngOnInit() {}

  openEditPage(){
    this.router.navigateByUrl('my-books/tabs/list/:bookId');

  }



}


