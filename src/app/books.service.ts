import { Injectable } from '@angular/core';
import { BookModel } from './book.model';
import { BehaviorSubject, Observable, map, switchMap, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './user.model';
import { CommentModel } from './comment.model';
import { AuthorModel } from './author.model';
import { AuthService } from './auth/auth.service';
import { Token } from '@angular/compiler';


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

  interface AuthorData{ 
    name:string;
    surname:string;
    born:number;
    dead:boolean;
    died:number;
  }
@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private bookArray :BookModel[]= [];
  private books = new BehaviorSubject<BookModel[]>([]);
  private myBooks= new BehaviorSubject<BookModel[]>([]);
  private comments=new BehaviorSubject<CommentModel[]>([]);
  private authors= new BehaviorSubject<AuthorModel[]>([]);

  constructor(private http:HttpClient, private authService:AuthService) { }

  getBook(id:string | null) 
  {this.books.subscribe((books) =>{
    this.bookArray=books;
  }
    )
    return this.bookArray.find((book)=>book.id===id)!}

    editBook(id:string | null, name:string, year:number, author:AuthorModel){
      var userLogged:UserModel | null;
      let  book = new BookModel(id, name, year, author, null );
      var bookIndex:number;
       return this.authService.user.pipe(take(1), switchMap( user =>{
   book.userAdded=user;
   userLogged=user;
   return this.authService.token; }  ), take(1) , switchMap((token) =>{
        return this.http.put<{name:string}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books/'+id+'.json?auth='+token , 
        book
      )
       }), take(1),switchMap((bookData) =>{
        return this.myBooks;
      }) , take(1) , tap((books) =>{
        bookIndex= books.findIndex((book)=> {
          book.id===id;
        });
       var updatedBooks= [...books];
       const book=updatedBooks[bookIndex];
       updatedBooks[bookIndex]= {id:id, name:name, year:year, author:author, userAdded:userLogged};
       this.myBooks.next(updatedBooks);
      }) );
    }

    deleteBook(id:string | null){
      var bookIndex:number;
      return this.authService.token.pipe(take(1), switchMap((token) =>{
        return this.http.delete<{name:string}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books/'+id+'.json?auth='+token )
      }), switchMap((bookData) =>{
        return this.myBooks;
      }), take(1), tap((books) =>{
        bookIndex= books.findIndex((book)=> {
          book.id===id;
        });
       var updatedBooks= [...books];
      updatedBooks.splice(bookIndex, 1);
       this.myBooks.next(updatedBooks);
      }));

    }

  addBook(name:string, year:number, author:AuthorModel){
    let userLog:UserModel | null;
    let book= new BookModel(null, name, year, author, null);
    let generatedId:string;
   return this.authService.user.pipe(take (1), switchMap(user =>{
   userLog=user;
   book.userAdded=userLog;
      return this.authService.token;}), take(1), switchMap((token)=>{
        return this.http.post<{name:string}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth='+token , 
       book
      );
      }) , take(1), switchMap((bookData)=>{
        generatedId = bookData.name;
    return this.myBooks;
     }), take(1), tap((books) =>{
       book.id=generatedId;
        this.books.next(books.concat(book));
        this.myBooks.next( books.concat(book));
       })


 );
 }

 getMyBooks(){
  let userLog:UserModel | null;
 return this.authService.user.pipe(take(1), switchMap(user => {
  userLog=user;
  return this.authService.token;}), take (1), switchMap((token) =>{
    return this.http.get<{[key:string]:BookData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth='+token);
  }), take(1), switchMap((bookData) =>{
    const books:BookModel[]=[];
    for(const key in bookData){
     if(bookData.hasOwnProperty(key) && userLog!=null && userLog.email===bookData[key].userAdded.email){
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

  addAuthor(name:string, surname:string, born: number, dead: boolean, died:number){
    let generatedId:string;
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      return this.http.post<{name:string}> ('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/authors.json?auth='+token , {
        name, surname, born, dead, died})
    }), take (1) ,switchMap ((authorData) =>{
      generatedId= authorData.name;
      return this.authors;
    }), take(1), tap((authors) =>{
      this.authors.next(authors.concat({
        id:generatedId, name, surname, born, dead, died
      }));
    }) );
  }

  addComment(text:string, book:BookModel ){
    let generatedId:string;
    let userLogged:UserModel | null;
    let comment= new CommentModel(null, text, book, null);
     return this.authService._user.pipe( take(1)  ,
     switchMap( user =>{
        userLogged=user;
        comment.user=userLogged;
        return this.authService.token;}),  take (1) , switchMap((token) =>{
          return this.http.post<{name:string}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth='+token, 
          comment
              );
        }), take(1) , switchMap((commentData)=> {
          generatedId=commentData.name;
    return this.comments;
    
        }), take(1), tap((comments) => {
    comment.id=generatedId;
          this.comments.next(comments.concat(comment));
        }));
  
  }

  getBooks(){
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      return this.http.get<{[key:string]:BookData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth='+token);
    }), map((bookData) =>{
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
      return books;
    }), tap( books =>{
      this.books.next(books);
    }));
    
   
    
  }

  getAuthors(){
    return this.authService.token.pipe(take(1), switchMap((token) =>{
      return this.http.get<{[key:string]:AuthorData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/authors.json?auth='+token);

    }) , map((authorData) =>{
      const authors:AuthorModel[]=[];
      for(const key in authorData){
if(authorData.hasOwnProperty(key)){
  authors.push({
    id:key,
    name:authorData[key].name,
    surname:authorData[key].surname,
    born:authorData[key].born,
    dead:authorData[key].dead,
    died:authorData[key].died

  })
}
      }
    return authors; }),
    tap(authors =>{
      this.authors.next(authors);

    }) );
   
  }



  getComments(book:BookModel){
    return this.authService.token.pipe(take(1), switchMap((token)=>{
      return this.http.get<{[key:string]:CommentData}>('https://bookstorage-a4fc3-default-rtdb.europe-west1.firebasedatabase.app/comments.json?auth='+token);

    }) ,map((commentData)=>{
      const comments:CommentModel[]=[];
      for(const key in commentData){
        if(commentData.hasOwnProperty(key) && book.id==commentData[key].book.id){
          comments.push({
            id:key,
            text:commentData[key].text,
            book:commentData[key].book,
            user:commentData[key].user
          });
        }
      }
      return comments;
          }), tap(comments=>{
            this.comments.next(comments);
   }) );
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

  get author(){
    return this.authors.asObservable();
  }
}


