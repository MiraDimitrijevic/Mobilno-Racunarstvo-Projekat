import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookModel } from 'src/app/book.model';
import { BooksService } from 'src/app/books.service';
import { CommentModel } from 'src/app/comment.model';
import { UserModel } from 'src/app/user.model';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.page.html',
  styleUrls: ['./book-details.page.scss'],
})
export class BookDetailsPage implements OnInit, OnDestroy {
  book:BookModel= new BookModel(null, "", 0,  {id:"1", name:"Vladimir", surname:"Nikolajevic Tolstoj", born:1867, dead:true, died:1955}, 
  new UserModel("", "","", "", new Date()));
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
  console.log("Usao u metodu comment i pozvao addComent");
    this.bookService.addComment(commentForm.value.comment, this.book)
    .subscribe((res)=>{
      console.log(res);
    })
  }
}
