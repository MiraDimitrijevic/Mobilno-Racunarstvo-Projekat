import { Injectable } from '@angular/core';
import { BookModel } from './book.model';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthorModel } from './author.model';
import { UserModel } from './user.model';
import { CommentModel } from './comment.model';


interface BookData{
name:string;
year:number;
author:AuthorModel;
userAdded:UserModel;
};

interface CommentData{
  name:string;
  text:string;
  book:BookModel;
  user:UserModel;
  };
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private books = new BehaviorSubject<BookModel[]>([]);
  private myBooks= new BehaviorSubject<BookModel[]>([]);
  private comments=new BehaviorSubject<CommentModel[]>([]);
  user:UserModel={id:"1", name:"Marija", surname:"Markovic", email:"Marija123", password:"12345678"};
  constructor(private http:HttpClient) { }

  getBook(id:string | null) 
  {return this.books.find((book)=>book.id===id)!}

  addBook(name:string, year:number, author:AuthorModel, userAdded:UserModel){
   return this.http.post<{name:string}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books.json' , {
    name, year, author, userAdded
   }).pipe(map((bookData)=>{
    this.books.push({
      id:bookData.name, name, year, author,userAdded
    });
    this.myBooks.push({
      id:bookData.name, name, year, author,userAdded
    });
    return this.myBooks;
   }));

  }

  addComment(text:string, book:BookModel, user:UserModel ){
    return this.http.post<{name:string}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/comments.json', {
text, book, user
    }).pipe(map((commentData)=> {
      this.comments.push({
        id:commentData.name,text, book, user
      });
    }));
  }

  getBooks(){
    return this.http.get<{[key:string]:BookData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books.json').pipe(map((bookData) =>{
      const books:BookModel[]=[];
      for(const key in bookData){
        if(bookData.hasOwnProperty(key)){
          books.push({
            id:key,
            name:bookData[key].name,
            year:bookData[key].year,
            author:bookData[key].author,
            userAdded:bookData[key].userAdded
          })
        }
      }
      this.books.next(books);
      return books;
    }));
  }

  getMyBooks(){
    return this.http.get<{[key:string]:BookData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books.json')
    .pipe(map((bookData) =>{
      const books:BookModel[]=[];
      for(const key in bookData){
        if(bookData.hasOwnProperty(key) && this.user.email===bookData[key].userAdded.email){
          books.push({
            id:key,
            name:bookData[key].name,
            year:bookData[key].year,
            author:bookData[key].author,
            userAdded:bookData[key].userAdded
          })
        }
      }
      this.myBooks.next(books);
      return books;
    }));
  }

  getComments(book:BookModel){
    return this.http.get<{[key:string]:CommentData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/comments.json')
    .pipe(map((commentData)=>{
const comments:CommentModel[]=[];
for(const key in commentData){
  if(commentData.hasOwnProperty(key) && book.name==commentData[key].book.name){
    comments.push({
      id:key,
      text:commentData[key].text,
      book:commentData[key].book,
      user:commentData[key].user
    });
  }
}
this.comments.next(comments);
return comments;
    }));
  }

  getUser() :UserModel{
return this.user;
  }

  get book() {
    return this.books.asObservable();
  }

  get mybook() {
    return this.myBooks.asObservable();
  }

  get comment(){
    return this.comments.asObservable();
  }
}


