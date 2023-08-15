import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BookModule } from 'src/app/book-module';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
//alert ne radi, skapiraj sto!!!!
  checkbox:boolean=true;
  currentAuthor= undefined;
 private _formOpen=false;
 public alertButtons = ['OK'];
 isAlertOpen=false;

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
  constructor(private bookService:BooksService) { }

  ngOnInit() {
  }

  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentAuthor = ev.target.value;
  }

  addBook(form: NgForm){
    this.bookService.addBook(form.value.bookName, form.value.year, form.value.author, this.bookService.getUser()).subscribe((res)=>{
      //res je id kreirane knjige
      //potrebno je da se nekako prosiri niz knjiga i na ostalim stranama
      console.log(res);
    });
  }

  addAuthor(form: NgForm){

  }

  openAuthorForm(){
    this._formOpen=!this._formOpen;
  }

  get isFormOpen():boolean{
return this._formOpen;
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
