export class UserModel {
    
    constructor(public id:string,
         public email:string,public password:string, private token:string, private tokenExpirationDate:Date){

    }

    get _token(){
        if(this.tokenExpirationDate==null || this.tokenExpirationDate<=new Date())
        return null;
        else return this.token;
    }
 
}
