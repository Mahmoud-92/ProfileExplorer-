import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../fetch.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  
  storedData:any;

  localData;

  /* Injecting dependencies we need to use into constructor */
  constructor( private recieveLogin:FetchService, router: Router) {
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
    this.storedData?.login && this.recieveLogin.fetchLogin(this.storedData?.login)
    /* Calling Data from API */
    this.fetchData();

  }

  fetchData(){
    this.recieveLogin.fetchUser().subscribe(dataFetch=>{this.storedData=dataFetch;
      localStorage.setItem("user", JSON.stringify(this.storedData));});

  }


}
