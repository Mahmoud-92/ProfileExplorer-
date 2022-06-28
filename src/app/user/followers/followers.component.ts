import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  
  followers;
 
  localData;
  
  
  /* Injecting dependencies we need to use into constructor */
  constructor( private fetchFollowers:FetchService) { }

  ngOnInit(): void {

    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("followers");

    if (this.localData) {
      this.followers = JSON.parse(this.localData);
    }

    /* Calling Data from API */
    this.fetchData();

  }

  
  fetchData(){
    /* Looping through followers to get Login property for each */
    this.fetchFollowers.fetchFollowers().subscribe((dataFetch:any[])=>{this.followers=dataFetch?.slice?.(0,10);
      localStorage.setItem("followers", JSON.stringify(this.followers))
    })
    
  
  }

  

 

}