import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FetchService } from '../fetch.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  storedData:any;
  userLogin;
  localData;

  /* Injecting dependencies we need to use into constructor */
  constructor( private recieveLogin:FetchService,router: Router,private route:ActivatedRoute) {
      /* Updating user card data when routing from followers/followin list to user card */
    router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
  }

  ngOnInit(): void {
    /* Loading Data from Local Storage */
    this.localData = localStorage.getItem("user");

    if (this.localData) {
      this.storedData = JSON.parse(this.localData);
    }
    // this.storedData?.login && this.recieveLogin.fetchLogin(this.storedData?.login);

    this.userLogin= this.route.snapshot.params['login'];

    this.route.params.subscribe((params:Params)=>{this.userLogin=params['login']});

    /* Calling Data from API */
    this.fetchData();

  }

  fetchData(){
    this.recieveLogin.fetchUser(this.userLogin).subscribe(dataFetch=>{this.storedData=dataFetch;
      localStorage.setItem("user", JSON.stringify(this.storedData));});

  }


}
