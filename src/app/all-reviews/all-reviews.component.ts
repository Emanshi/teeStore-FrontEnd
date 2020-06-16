import { Component, OnInit } from '@angular/core';
import { AllReviewsService } from './all-reviews.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../models/review';
import { ViewProductService } from '../view-product/view-product.service';
import { ReviewCounts } from '../models/review-counts';

@Component({
  selector: 'app-all-reviews',
  templateUrl: './all-reviews.component.html',
  styleUrls: ['./all-reviews.component.css']
})
export class AllReviewsComponent implements OnInit {
  productId:string
  reviews:Review[]
  reviewCounts:ReviewCounts
  maxReviews:number

  constructor(private service:AllReviewsService,private route:ActivatedRoute,private vpService:ViewProductService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      param=>this.productId=param['pId']
    );
    this.loadProductReviews()
  }

  loadProductReviews(){
    this.service.loadProductReviews(this.productId).subscribe(
      res=>this.reviews=res
    )
    this.vpService.getReviewCounts(this.productId).subscribe(
      res=>{
        this.reviewCounts=res
        let arr = [res.one,res.two,res.three,res.four,res.five]
        this.maxReviews=Math.max.apply(Math, arr)
      }
    )
  }
}
