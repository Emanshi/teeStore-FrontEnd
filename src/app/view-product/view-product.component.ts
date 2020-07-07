import { Component, OnInit } from '@angular/core';
import { ViewProductService } from './view-product.service';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Title } from '@angular/platform-browser';
import { Images } from '../models/images';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { Review } from '../models/review';
import { ReviewCounts } from '../models/review-counts';
import { User } from '../models/users';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  loggiedIn:boolean
  loggedInUser:User
  product:Product
  productId:string
  displayImage:Images
  reviews:Review[]
  reviewCounts:ReviewCounts
  maxReviews:number
  selectedSize:string
  ratingNumbers=['','ONE','TWO','THREE','FOUR','FIVE']
  cartResp:number
  objectKeys = Object.keys;

  constructor(private service:ViewProductService,private auth:AuthenticatorService,private router:Router,private route:ActivatedRoute,private title:Title) { }

  ngOnInit(): void {    
    this.route.params.subscribe(
      param=>this.productId=param['pId']
    );
    this.selectedSize='XYZ'
    this.loadProduct()
  }

  loadProduct(){
    this.service.getProductById(this.productId).subscribe(
      response=>{
        this.product=response
        this.displayImage=response.images[0]
        this.title.setTitle(this.product.productName)
        this.loadTopReviews()
      }
    )
  }

  loadTopReviews(){
    this.service.getReviews(this.productId).subscribe(
      res=>this.reviews=res
    )
    this.service.getReviewCounts(this.productId).subscribe(
      res=>{
        this.reviewCounts=res
        let arr = [res.one,res.two,res.three,res.four,res.five]
        this.maxReviews=Math.max.apply(Math, arr)
      }
    )
  }

  loadImage(index:number) {
    this.displayImage=this.product.images[index]
  }

  addToCart(){
    if (this.selectedSize==='XYZ') {
      alert("Please Select a Size")
    } else {
      alert("You selected "+this.selectedSize)
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
      this.service.addProductTocart(this.productId,this.loggedInUser.userId,this.selectedSize).subscribe(
        res=>this.cartResp=res
      )
    }
    //this.router.navigate(['/cart'])
  }

  buyNow(){
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
    this.router.navigate(['/cart'])
  }
}
