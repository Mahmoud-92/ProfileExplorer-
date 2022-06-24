import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FetchService } from '../fetch.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  
  login:string;

  constructor(private router: Router, private sendLogin:FetchService) { }

  ngOnInit(): void {

  }

  sendLoginName(){

    /* Navigating to User Component  */

    this.router.navigate(['/user']);

    /* Sending input data to User component via FetchService */ 

    this.sendLogin.fetchLogin(this.login);



  }



}
