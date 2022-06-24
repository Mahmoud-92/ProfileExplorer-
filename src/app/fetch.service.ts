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


   fetchUser(){
    return this.http.get('https://api.github.com/users/'+this.login)

   }

   fetchFollowerObj(userLogin:string){
     return this.http.get('https://api.github.com/users/'+userLogin)
   }

   fetchFollowing(){
     return this.http.get('https://api.github.com/users/'+this.login+'/following')
   }
   fetchFollowers(){
     return this.http.get('https://api.github.com/users/'+this.login+'/followers')
   }



}
