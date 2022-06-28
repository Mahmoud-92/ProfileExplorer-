import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

   login:string;

  constructor(private http:HttpClient) {
    
   }

   fetchLogin(loginUser:string){
     this.login= loginUser;
   }


   fetchUser(loginValue?:string){
     console.log("this.login",this.login)
     console.log("this.loginValue",loginValue)

    return this.http.get('https://api.github.com/users/'+(loginValue || this.login))

   }

   fetchFollowing(){
     return this.http.get('https://api.github.com/users/'+this.login+'/following')
   }
   fetchFollowers(){
     return this.http.get('https://api.github.com/users/'+this.login+'/followers')
   }



}
