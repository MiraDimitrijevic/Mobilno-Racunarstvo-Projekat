import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  book:BookModel={id:"1",name:"Rat i Mir", year:1950,author: {id:"1", name:"Vladimir", surname:"Nikolajevic Tolstoj", born:1867, dead:true, died:1955},
  userAdded:{id:"1", name:"Marija", surname:"Markovic", email:"Marija123", password:"12345678"} };  checkbox:boolean=true;
  currentAuthor= undefined;
 private _formOpen=false;
  authors = [
    {
      id: 1,
      name: 'Desanka',
      surname: 'Maksimovic',
      born:1900,
      dead:true,
      died:1990
    },
    {
      id: 2,
      name: 'Ivo',
      surname: 'Andric',
      born:1900,
      dead:true,
      died:1990
    },
    {
      id: 3,
      name: 'Mesa',
      surname: 'Selimovic',
      born:1900,
      dead:true,
      died:1990
    },
  ];
  constructor(private route:ActivatedRoute, private bookService:BooksService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=> {this.book= this.bookService.getBook(paramMap.get('bookId'));
  });  
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentAuthor = ev.target.value;
  }

  editBook(form: NgForm){

  }

  addAuthor(form: NgForm){

  }

  openAuthorForm(){
    this._formOpen=!this._formOpen;
  }

  get isFormOpen():boolean{
return this._formOpen;
  }

}
