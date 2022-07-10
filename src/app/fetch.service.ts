import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

   

  constructor(private http:HttpClient) {
    
   }


   fetchUser(loginValue?:string){
    return this.http.get('https://api.github.com/users/'+(loginValue))
   }

   fetchFollowing(user:string){
     return this.http.get('https://api.github.com/users/'+user+'/following')
   }

   fetchFollowers(user:string){
     return this.http.get('https://api.github.com/users/'+user+'/followers')
   }



}
