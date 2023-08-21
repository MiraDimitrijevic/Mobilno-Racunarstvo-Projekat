import { AuthorModel } from "./author.model";
import { UserModel } from "./user.model";

export class BookModel {
 
 constructor(public id:string | null, public name:string, public year:number, public author:AuthorModel, public userAdded:UserModel | null){

 }
   
}
