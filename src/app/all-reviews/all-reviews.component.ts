import { Component, OnInit } from '@angular/core';
import { AllReviewsService } from './all-reviews.service';
import { ActivatedRoute } from '@angular/router';
import { Review } from '../models/review';
import { ViewProductService } from '../view-product/view-product.service';
import { ReviewCounts } from '../models/review-counts';
import { Product } from '../models/product';
import { pid } from 'process';

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
  p:Product

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
    this.vpService.getProductById(this.productId).subscribe(
      res=>this.p=res
    )
  }

  sortByHelpful() {
    this.reviews.sort(
      (a,b)=>{
        if (a.ratingHelpful>b.ratingHelpful) {
          return -1
        } else if (a.ratingHelpful<b.ratingHelpful) {
          return 1
        } else {
          return 0
        }
      }
    )
  }

  sortByRating() {
    let ratings = ['ONE','TWO','THREE','FOUR','FIVE']
    this.reviews.sort(
      (a,b)=>{
        if (ratings.indexOf(a.ratings) > ratings.indexOf(b.ratings)) {
          return -1
        } else if (ratings.indexOf(a.ratings) < ratings.indexOf(b.ratings)) {
          return 1
        } else {
          return 0
        }
      }
    )
  }

  sortByRatingRev() {
    let ratings = ['ONE','TWO','THREE','FOUR','FIVE']
    this.reviews.sort(
      (a,b)=>{
        if (ratings.indexOf(a.ratings) > ratings.indexOf(b.ratings)) {
          return 1
        } else if (ratings.indexOf(a.ratings) < ratings.indexOf(b.ratings)) {
          return -1
        } else {
          return 0
        }
      }
    )
  }

  sortByDate() {
    this.reviews.sort(
      (a,b)=>{
        if (a.reviewDate > b.reviewDate) {
          return -1
        } else if (a.reviewDate < b.reviewDate) {
          return 1
        } else {
          return 0
        }
      }
    )
  }
}
