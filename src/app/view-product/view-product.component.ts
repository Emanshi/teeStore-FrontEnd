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

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:Product
  productId:string
  displayImage:Images
  reviews:Review[]
  reviewCounts:ReviewCounts
  maxReviews:number

  constructor(private service:ViewProductService,private auth:AuthenticatorService,private router:Router,private route:ActivatedRoute,private title:Title) { }

  ngOnInit(): void {    
    this.route.params.subscribe(
      param=>this.productId=param['pId']
    );
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
}
