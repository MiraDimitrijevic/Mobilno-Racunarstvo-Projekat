import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthorModel } from 'src/app/author.model';
import { BookModule } from 'src/app/book-module';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit, OnDestroy {
//alert ne radi, skapiraj sto!!!!
  checkbox:boolean=true;
  currentAuthor= undefined;
 private _formOpen=false;
 public alertButtons = ['OK'];
 isAlertOpen=false;

 authors:AuthorModel[]=[];
 authorSub:Subscription=Subscription.EMPTY;
  constructor(private bookService:BooksService) { }

  ngOnInit() {
    this.authorSub=this.bookService.author.subscribe((authors)=>{
      this.authors=authors;
    }
    )
  }

  ngOnDestroy(){
    if(this.authorSub){
      this.authorSub.unsubscribe;
    }
  }

  ionViewWillEnter(){
    this.bookService.getAuthors().subscribe((authorData) => {

    })}


  compareWith(o1:any, o2:any) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  handleChange(ev:any) {
    this.currentAuthor = ev.target.value;
  }

  addBook(form: NgForm){
    this.bookService.addBook(form.value.bookName, form.value.year, form.value.author).subscribe((res)=>{
      //res je id kreirane knjige
      //potrebno je da se nekako prosiri niz knjiga i na ostalim stranama
      console.log(res);
    });
  }

  addAuthor(form: NgForm){
this.bookService.addAuthor(form.value.authorName, form.value.authorSurname, form.value.born,
  form.value.dead, form.value.died).subscribe((res)=>{
    
  })
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
