import { Component, OnInit } from '@angular/core';
import { AddReviewService } from './add-review.service';
import { AuthenticatorService } from '../auth/authenticator.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';
import { Title } from '@angular/platform-browser';
import { Orders } from '../models/orders';
import { User } from '../models/users';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Review } from '../models/review';
import { Product } from '../models/product';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrls: ['./add-review.component.css']
})
export class AddReviewComponent implements OnInit {
  loggedInUser:User
  loggedIn:boolean
  hasBeenOrdered:boolean
  addReviewForm:FormGroup
  productName:string
  productId:string
  review:Review
  orders:Orders[]
  errorMessage:string

  constructor(
    private fb:FormBuilder,
    private service:AddReviewService, 
    private auth:AuthenticatorService, 
    private route:ActivatedRoute,
    private orderService:ProfileService,
    private router:Router,
    private snackBar:MatSnackBar,
    private title:Title
    ) { 
      title.setTitle('Add a Review')
    }

  ngOnInit(): void {
    this.route.params.subscribe(
      param=>this.productId=param['pId']
    );

    this.hasBeenOrdered=false
    this.loggedIn=false
    this.review=new Review()
    this.review.ratings='ZERO'
    this.auth.sessionUser.subscribe(
      (data)=>{
        this.loggedInUser=data;
        if(data.userName!=null){
          this.loggedIn=true
          this.orderService.getOrderByUserId(this.loggedInUser.userId).subscribe(
            res=>{
              this.orders=res
              this.validateOrder()
            }
          )
        } else {
          this.router.navigate(['/login'])
        }
      }
    )

    this.addReviewForm=this.fb.group({
      reviewTitle:['',[Validators.required,Validators.minLength(1),Validators.maxLength(50)]],
      description:['',[Validators.required,Validators.minLength(1),Validators.maxLength(250)]]
    })
  }

  validateOrder() {
    for (let o of this.orders) {
      for (let p of o.products) {
        if (p.productId === this.productId) {
          this.hasBeenOrdered = true
          this.productName=p.productName
          break
        }
      }
      if (this.hasBeenOrdered) {
        break
      }
    }
  }

  rating(rate) {
    this.review.ratings=rate
  }

  submitReview() {
    this.review.reviewTitle=this.addReviewForm.get('reviewTitle').value
    this.review.reviewBody=this.addReviewForm.get('description').value
    this.review.product=new Product()
    this.review.product.productId=this.productId
    this.review.user=this.loggedInUser
    this.service.addReview(this.review).subscribe(
      res=>{
        console.log(res+' review id persisted')
        this.snackBar.open('Review added successfully', 'Okay', {
          duration: 5000,
          verticalPosition: 'bottom',
          panelClass: 'primary-snackbar'
        });
        this.router.navigate(['/product',this.productId])
      }
    )
    
  }
}
