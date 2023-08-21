import { Component, Input, OnInit } from '@angular/core';
import { BookModel } from '../book.model';
import { Router } from '@angular/router';
import { UserModel } from '../user.model';

@Component({
  selector: 'app-book-element',
  templateUrl: './book-element.component.html',
  styleUrls: ['./book-element.component.scss'],
})
export class BookElementComponent  implements OnInit {
@Input() book= new BookModel(null, "", 0,  {id:"1", name:"Vladimir", surname:"Nikolajevic Tolstoj", born:1867, dead:true, died:1955}, 
new UserModel("", "", "", "", new Date()));
  constructor(private router:Router) { }

  ngOnInit() {}

  openEditPage(){
    this.router.navigateByUrl('my-books/tabs/list/:bookId');

  }



}


