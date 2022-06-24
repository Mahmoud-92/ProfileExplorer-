import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  
  followingLoginArray=[];
  followingArrayOfObj=[];

  localData;
  

  
 /* Injecting dependencies we need to use into constructor */
  constructor( private fetchFollowing:FetchService, private router:Router) { }

  ngOnInit(): void {

    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("following");

    if (this.localData) {
      this.followingArrayOfObj = JSON.parse(this.localData);
    }

    /* Calling Data from API */
    this.fetchData();

  }

  openUser(userLogin:string){
    /* Empty Local Storage */ 
    localStorage.clear();
    /* Go to user component */ 
    this.router.navigate(['/user']);
    /* Sending user data to User component via FetchService */ 
    this.fetchFollowing.fetchLogin(userLogin);

  }

  fetchData(){
    /* Looping through followers Array to get Login property for each */
    this.fetchFollowing.fetchFollowing().subscribe(dataFetch=>{
      for (const key in dataFetch) {
      this.followingLoginArray.push(dataFetch[key]['login'])
    };

    /* Looping through Logins array to call Object of personal data for each */
    for (let index = 0; index < this.followingLoginArray.length; index++) {
      this.fetchFollowing.fetchFollowerObj(this.followingLoginArray[index]).subscribe(
        followingObj=>{
          this.followingArrayOfObj.push(followingObj);
          localStorage.setItem("following", JSON.stringify(this.followingArrayOfObj));
        })
    };
        /* Now we have array of objects full of personal data we need to render in the followers list */

  });
  
  }

  

 

}

