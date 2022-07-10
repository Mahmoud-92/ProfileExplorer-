import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {

  followers;
  userLogin;
  localData;


  /* Injecting dependencies we need to use into constructor */
  constructor(private fetchFollowers: FetchService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("followers");

    if (this.localData) {
      this.followers = JSON.parse(this.localData);
    }

    /* Fetching user login from parent URL dynamic params on initiation via snapshot and assign its value to userLogin */
    this.userLogin = this.route.parent.snapshot.params['login'];

    /* Subscribe to any change on parent URL dynamic params and assign its value to userLogin */
    this.route.parent.params.subscribe((params: Params) => { this.userLogin = params['login'] });

    /* Calling Data from API */
    this.fetchData();

  }


  fetchData() {
    this.fetchFollowers.fetchFollowers(this.userLogin).subscribe((dataFetch: any[]) => {
      this.followers = dataFetch?.slice?.(0, 10);     /* I used .slice method to loimit the number of api requests overall */
      localStorage.setItem("followers", JSON.stringify(this.followers))
    })


  }





}