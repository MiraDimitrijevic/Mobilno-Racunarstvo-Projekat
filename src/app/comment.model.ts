import { BookModel } from "./book.model";
import { UserModel } from "./user.model";

export class CommentModel {
 

    constructor(public id:string | null, public text:string, public book:BookModel, public user:UserModel | null){}
}
