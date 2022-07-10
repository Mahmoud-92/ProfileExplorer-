import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   
  
  login:string;

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  sendLoginName(){

    /* Navigating to User Component  */
    this.router.navigate(['/user', this.login]);


  }



}
