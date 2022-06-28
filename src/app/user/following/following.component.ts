import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  
  followingArray;
  localData;
  
  
 /* Injecting dependencies we need to use into constructor */
  constructor( private fetchFollowing:FetchService) { }

  ngOnInit(): void {

    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("following");

    if (this.localData) {
      this.followingArray = JSON.parse(this.localData);
    }

    /* Calling Data from API */
    this.fetchData();

  }


  fetchData(){
    /* Looping through followers to get Login property for each */
    this.fetchFollowing.fetchFollowing().subscribe((dataFetch:any[])=>{this.followingArray=dataFetch?.slice?.(0,10);
      localStorage.setItem("following", JSON.stringify(this.followingArray))
    })
  
  }

  

 

}

