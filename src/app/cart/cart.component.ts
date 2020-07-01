import { Component, OnInit } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { Title } from '@angular/platform-browser';
import { AuthenticatorService } from '../auth/authenticator.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loggiedIn:boolean
  loggedInUser:User

  constructor(private service:CartService,private router:Router,private auth:AuthenticatorService,private title:Title) {
    title.setTitle('Cart')
   }

  ngOnInit(): void {
    this.loggiedIn=false
    this.auth.sessionUser.subscribe(
      (data)=>{
        this.loggedInUser=data;
        if(data.userName!=null){
          this.loggiedIn=true
        }
      }
    )

    if(!this.loggiedIn){
      this.router.navigate(['/login'])      
    }
  }

}
