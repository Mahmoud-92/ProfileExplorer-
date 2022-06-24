import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  
  followersLoginArray=[];
  followersArrayOfObj=[];

  localData;
  

  
  /* Injecting dependencies we need to use into constructor */
  constructor(private router:Router, private fetchFollowers:FetchService) { }

  ngOnInit(): void {

    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("followers");

    if (this.localData) {
      this.followersArrayOfObj = JSON.parse(this.localData);
    }

    /* Calling Data from API */
    this.fetchData();

  }

  openUserPage(userLogin:string){
    /* Empty Local Storage */ 
    localStorage.clear();
    /* Go to user component */ 
    this.router.navigate(['/user']);
    /* Sending user data to User component via FetchService */ 
    this.fetchFollowers.fetchLogin(userLogin);

  }


  fetchData(){
    /* Looping through followers to get Login property for each */
    this.fetchFollowers.fetchFollowers().subscribe(dataFetch=>{
      for (const key in dataFetch) {
      this.followersLoginArray.push(dataFetch[key]['login'])
    };

    /* Looping through Logins array to call Object of personal data for each */
    for (let index = 0; index < this.followersLoginArray.length; index++) {
      this.fetchFollowers.fetchFollowerObj(this.followersLoginArray[index]).subscribe(
        followerObj=>{this.followersArrayOfObj.push(followerObj);
          localStorage.setItem("followers", JSON.stringify(this.followersArrayOfObj));})
    };
    /* Now we have array of objects full of personal data we need to render in the followers list */

  });
  
  }

  

 

}