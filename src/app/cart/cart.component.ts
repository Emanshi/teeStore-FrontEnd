import { Component, OnInit, HostListener } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';
import { User } from '../models/users';
import { Title } from '@angular/platform-browser';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Observable } from 'rxjs';
import { Cart } from '../models/cart';
import { Product } from '../models/product';
import { ClearCartDialog } from './clear.cart.dialog';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  loggiedIn:boolean
  loggedInUser:User
  cart:Cart
  deliveryDate:Date
  cartCost:number
  cartTotal:number
  deliveryFee:number

  constructor(private service:CartService,private router:Router,private dialog:MatDialog,private auth:AuthenticatorService,private title:Title) {
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

    this.service.getCart(this.loggedInUser.userId).subscribe(
      res=>{this.cart=res
        this.calculateCost()
      }
    )

    this.deliveryDate=new Date()
    this.deliveryDate.setDate(this.deliveryDate.getDate()+4)
  }

  addQty(i:number){
    this.cart.quantities[i]=this.cart.quantities[i]+1
    this.calculateCost()
    this.service.changed=true
  }

  subQty(i:number){
    this.cart.quantities[i]=this.cart.quantities[i]-1
    this.calculateCost()
    this.service.changed=true
  }
  
  calculateCost(){
    this.cartCost=0
    this.cartTotal=0
    for(let i=0;i<this.cart.products.length;i++){
      this.cartCost+=this.cart.products[i].cost*(1-this.cart.products[i].discount/100)*this.cart.quantities[i] 
      this.cartTotal+=this.cart.products[i].cost*this.cart.quantities[i]
    }
    if(this.cartCost>1499 || this.cart.products.length==0){
      this.deliveryFee=0
    }else{
      this.deliveryFee=250
    }
    this.cart.totalCost=this.cartCost+this.deliveryFee
    this.service.cart=this.cart
  }

  clearCartConfirmer(aId:string): void {
    const dialogRef = this.dialog.open(ClearCartDialog, {
      width: '250px',
      data: aId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.removeProduct(result)
    });
  }

  removeProduct(i:number) {
    this.service.removeProduct(this.loggedInUser.userId, this.cart.products[i].productId, this.cart.sizes[i]).subscribe(
      res=>{
        console.log('Product removed with result : ' +res)
        this.cart.products.splice(i, 1)
        this.cart.quantities.splice(i, 1)
        this.cart.sizes.splice(i, 1)
        this.calculateCost()
      },
      err => alert(err.error.errorMessage)
    )  
  }

  clearCart() {
    this.service.clearCart(this.cart.cartId).subscribe(
      res =>{
        this.cart=res
        this.cart.totalCost=0
        this.service.cart=this.cart
      },
      err => alert(err.error.errorMessage)
    )
  }
  
}  


