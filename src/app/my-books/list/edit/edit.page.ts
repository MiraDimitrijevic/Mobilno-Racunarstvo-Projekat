import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthorModel } from 'src/app/author.model';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit, OnDestroy {
  bookId:string | null="";
  book:BookModel={id:"1",name:"Rat i Mir", year:1950,author: {id:"1", name:"Vladimir", surname:"Nikolajevic Tolstoj", born:1867, dead:true, died:1955},
  userAdded:{id:"1", name:"Marija", surname:"Markovic", email:"Marija123", password:"12345678"} };  checkbox:boolean=true;
  currentAuthor= undefined;
 private _formOpen=false;
  authors:AuthorModel[]=[];
  public alertButtons = ['OK'];
  isAlertOpen=false;
  authorSub:Subscription=Subscription.EMPTY;

  constructor(private route:ActivatedRoute, private bookService:BooksService) { 
  }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap=> {this.book= this.bookService.getBook(paramMap.get('bookId'));
    this.bookId=paramMap.get('bookId');
  }
  ); 
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

  editBook(form: NgForm){
    this.bookService.editBook(this.bookId,form.value.bookName, form.value.year, form.value.author, this.bookService.getUser()).subscribe((res)=>{
      //res je id kreirane knjige
      //potrebno je da se nekako prosiri niz knjiga i na ostalim stranama
      console.log(res);
    });
  }

  deleteBook(){
    this.bookService.deleteBook(this.bookId).subscribe((res) =>{
      
    })
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
