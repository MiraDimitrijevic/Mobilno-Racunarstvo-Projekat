import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export interface CommentModel {
    id:string;
    text:string;
    book:BookModel;
    user:UserModel;
}
