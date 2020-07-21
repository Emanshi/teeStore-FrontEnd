import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/users';
import { AuthenticatorService } from '../auth/authenticator.service';
import { CartService } from '../cart/cart.service';
import { Title } from '@angular/platform-browser';
import { Cart } from '../models/cart';
import { RemoveProductDialog } from '../cart/remove.product.dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProfileService } from '../profile/profile.service';
import { CheckoutService } from './checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  type:string
  value:string
  loggiedIn:boolean
  loggedInUser:User
  cart:Cart  
  deliveryDate:Date
  cartCost:number
  cartTotal:number
  deliveryFee:number

  constructor(private route:ActivatedRoute,private router:Router,private auth:AuthenticatorService,
    private dialog:MatDialog,private cartService:CartService,private profileService:ProfileService,
    private service:CheckoutService,private title:Title) {
    title.setTitle('CheckOut')
   }

  ngOnInit(): void {

    this.loggiedIn=false
    this.auth.sessionUser.subscribe(
      (data)=>{
        this.loggedInUser =data;
        if(data.userName!=null){
          this.loggiedIn=true
        }
      }
    )

    if(!this.loggiedIn){
      this.router.navigate(['/login'])      
    }
    this.route.queryParams.subscribe(
      params=>{
        this.type=params['type']
        this.value=params['value']
      }
    )
    
    this.cartService.getCart(this.loggedInUser.userId).subscribe(
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
    this.cartService.changed=true
  }

  subQty(i:number){
    this.cart.quantities[i]=this.cart.quantities[i]-1
    this.calculateCost()
    this.cartService.changed=true
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
    this.cartService.cart=this.cart
  }

  removeProductConfirmer(i:number): void {
    const dialogRef = this.dialog.open(RemoveProductDialog, {
      width: '250px',
      data: i
    });

    dialogRef.afterClosed().subscribe(result => {
      this.removeProduct(result)
    });
  }

  removeProduct(i:number) {
    this.cartService.removeProduct(this.loggedInUser.userId, this.cart.products[i].productId, this.cart.sizes[i]).subscribe(
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

}
