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
import { MatSnackBar } from '@angular/material/snack-bar';
import { CartService } from '../cart/cart.service';
import { Cart } from '../models/cart';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  loggiedIn: boolean
  loggedInUser: User
  product: Product
  productId: string
  displayImage: Images
  cart: Cart
  reviews: Review[]
  reviewCounts: ReviewCounts
  maxReviews: number
  selectedSize: string
  ratingNumbers = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']
  cartResp: number
  inCart:boolean
  objectKeys = Object.keys;

  constructor(private service: ViewProductService, private cartService: CartService, private snackBar: MatSnackBar, private auth: AuthenticatorService, private router: Router, private route: ActivatedRoute, private title: Title) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      param => this.productId = param['pId']
    );
    this.loggiedIn = false
    this.inCart = false
    this.auth.sessionUser.subscribe(
      (data) => {
        this.loggedInUser = data;
        if (data.userName != null) {
          this.loggiedIn = true
          this.loadCart()
        }
      }
    )
    this.selectedSize = 'XYZ'
    this.loadProduct()

  }

  loadProduct() {
    this.service.getProductById(this.productId).subscribe(
      response => {
        this.product = response
        this.displayImage = response.images[0]
        this.title.setTitle(this.product.productName)
        this.loadTopReviews()
      }
    )
  }

  loadCart() {
    this.cartService.getCart(this.loggedInUser.userId).subscribe(
      res => {
        this.cart = res
        for (let i = 0; i < this.cart.products.length; i++) {
          if (this.cart.products[i].productId == this.product.productId && this.cart.sizes[i] == this.selectedSize) {
            this.inCart=true
            break
          }
        }
      }
    )
  }

  loadTopReviews() {
    this.service.getReviews(this.productId).subscribe(
      res => this.reviews = res
    )
    this.service.getReviewCounts(this.productId).subscribe(
      res => {
        this.reviewCounts = res
        let arr = [res.one, res.two, res.three, res.four, res.five]
        this.maxReviews = Math.max.apply(Math, arr)
      }
    )
  }

  loadImage(index: number) {
    this.displayImage = this.product.images[index]
  }

  addToCart() {
    if (this.selectedSize === 'XYZ') {
      this.snackBar.open('Please select a size', 'Okay', {
        duration: 50000,
        verticalPosition: 'bottom',
        panelClass: 'warn-snackbar'
      });
    } else {


      if (!this.loggiedIn) {
        this.router.navigate(['/login'])
      } else {
        this.service.addProductTocart(this.productId, this.loggedInUser.userId, this.selectedSize).subscribe(
          res => {
            this.cartResp = res
            this.snackBar.open('Product added to cart', 'View Cart', {
              duration: 5000,
              verticalPosition: 'bottom',
              panelClass: 'primary-snackbar'
            }).onAction().subscribe(() => {
              this.router.navigate(['/cart'])
            });
            this.loadCart()
          }
        )
      }
    }

  }

  sizeSelection(key) {
    this.inCart=false
    this.selectedSize=key
    this.loadCart()
  }

  buyNow() {
    this.loggiedIn = false
    this.auth.sessionUser.subscribe(
      (data) => {
        this.loggedInUser = data;
        if (data.userName != null) {
          this.loggiedIn = true
        }
      }
    )

    if (!this.loggiedIn) {
      this.router.navigate(['/login'])
    } else {
      this.router.navigate(['/checkout'], { queryParams: { type: 'product', value: this.productId } });
    }
  }
}
