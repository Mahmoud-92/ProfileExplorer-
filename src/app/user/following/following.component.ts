import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {

  followingArray;
  localData;
  userLogin;


  /* Injecting dependencies we need to use into constructor */
  constructor(private fetchFollowing: FetchService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("following");

    if (this.localData) {
      this.followingArray = JSON.parse(this.localData);
    }


    /* Fetching user login from parent URL dynamic params on initiation via snapshot and assign its value to userLogin */
    this.userLogin = this.route.parent.snapshot.params['login'];

    /* Subscribe to any change on parent URL dynamic params and assign its value to userLogin */
    this.route.parent.params.subscribe((params: Params) => { this.userLogin = params['login'] });

    /* Calling Data from API */
    this.fetchData();

  }


  fetchData() {
    this.fetchFollowing.fetchFollowing(this.userLogin).subscribe((dataFetch: any[]) => {
      this.followingArray = dataFetch?.slice?.(0, 10);     /* I used .slice method to loimit the number of api requests overall */
      localStorage.setItem("following", JSON.stringify(this.followingArray))
    })

  }





}

