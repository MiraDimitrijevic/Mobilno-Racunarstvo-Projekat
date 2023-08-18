import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';
import { CommentModel } from 'src/app/comment.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit, OnDestroy {
  book:BookModel={id:"1",name:"Rat i Mir", year:1950,author: {id:"1", name:"Vladimir", surname:"Nikolajevic Tolstoj", born:1867, dead:true, died:1955},
  userAdded:{id:"1", name:"Marija", surname:"Markovic", email:"Marija123", password:"12345678"} };
  comments:CommentModel[]=[];
  private commentSub:Subscription=Subscription.EMPTY;
  constructor(private route:ActivatedRoute, private bookService:BooksService) {

   }

  

  ngOnInit() {
   this.route.paramMap.subscribe(paramMap=> {this.book= this.bookService.getBook(paramMap.get('bookId'));
   this.commentSub=this.bookService.comment.subscribe((comments) =>{
    this.comments=comments;
  })
  });
  }

  ionViewWillEnter(){
    this.bookService.getComments(this.book).subscribe((commentData) => {
      
     // this.comments=commentData;
      console.log(commentData);
    })
  }

  ngOnDestroy() {
    if(this.commentSub){
      this.commentSub.unsubscribe();
    }
  }


  commentBook(commentForm:NgForm){
    this.bookService.addComment(commentForm.value.comment, this.book, this.bookService.getUser())
    .subscribe((res)=>{
      console.log(res);
      this.ionViewWillEnter();
    })
  }
}
