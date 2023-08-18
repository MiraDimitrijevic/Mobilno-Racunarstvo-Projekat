import { AuthorModel } from "./author.model";
import { UserModel } from "./user.model";

export interface BookModel {
    id:string | null;
    name:string;
    year:number;
    author:AuthorModel;
    userAdded: UserModel;

   
}
