import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/fetch.service';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styleUrls: ['./list-card.component.css']
})
export class ListCardComponent implements OnInit {
  /* Receiving login property from ngFor*/
  @Input() userLogin:any;

  userObj;

  constructor(private router:Router, private fetchData:FetchService) { }

  ngOnInit(): void {
    
    this.fetchUserData();

  }

  openUserPage(userLogin:string){
    /* Empty Local Storage */ 
    localStorage.clear();
    /* Go to user component */ 
    this.router.navigate(['/user']);
    /* Sending user data to User component via FetchService */ 
    this.fetchData.fetchLogin(userLogin);

  }

  fetchUserData(){
    this.fetchData.fetchUser(this.userLogin).subscribe(data=>this.userObj=data)
  }

}
