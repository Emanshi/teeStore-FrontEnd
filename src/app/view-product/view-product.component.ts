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
import { MatDialog } from '@angular/material/dialog';
import { DeleteReviewDialog } from './delete.review.dialog';
import { EditReviewDialog } from './edit.review.dialog';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})

export class ViewProductComponent implements OnInit {
  loggiedIn: boolean
  loggedInUser: User
  product: Product
  similarProducts: Product[]
  newArrivals: Product[]
  productId: string
  displayImage: Images
  cart: Cart
  reviews: Review[]
  reviewCounts: ReviewCounts
  maxReviews: number
  selectedSize: string
  ratingNumbers = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE']
  cartResp: number
  inCart: boolean
  objectKeys = Object.keys;

  constructor(
    private service: ViewProductService,
    private cartService: CartService,
    private snackBar: MatSnackBar,
    private auth: AuthenticatorService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private title: Title
  ) { }

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
        this.getSimilarProducts()
        this.loadTopReviews()
      }
    )

    this.service.getNewArrivals().subscribe(
      res => this.newArrivals = res
    )
  }

  getSimilarProducts() {
    this.service.getSimilarProducts(this.product.category).subscribe(
      res => this.similarProducts = res
    )
  }

  loadCart() {
    this.cartService.getCart(this.loggedInUser.userId).subscribe(
      res => {
        this.cart = res
        for (let i = 0; i < this.cart.products.length; i++) {
          if (this.cart.products[i].productId == this.product.productId && this.cart.sizes[i] == this.selectedSize) {
            this.inCart = true
            break
          }
        }
      }
    )
  }

  loadTopReviews() {
    this.service.getReviews(this.productId, this.loggedInUser.userId).subscribe(
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

  reviewHelpful(index: number) {
    if (!this.loggiedIn) {
      this.router.navigate(['/login'])
      this.snackBar.open('Please login to mark review as helpful', 'Okay', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: 'warn-snackbar'
      });
    } else if (this.reviews[index].user.userId == this.loggedInUser.userId) {
      this.snackBar.open('Cannot mark your review as helpful', 'Okay', {
        duration: 5000,
        verticalPosition: 'bottom',
        panelClass: 'warn-snackbar'
      });
    } else {
      this.service.reviewHelpful(this.reviews[index].reviewId, this.loggedInUser.userId).subscribe(
        res => this.reviews[index].ratingHelpful = res,
        err => console.log('Error Occured : ' + JSON.stringify(err))
      )
    }
  }

  sizeSelection(key) {
    this.inCart = false
    this.selectedSize = key
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
      if (this.selectedSize === 'XYZ') {
        this.snackBar.open('Please select a size', 'Okay', {
          duration: 50000,
          verticalPosition: 'bottom',
          panelClass: 'warn-snackbar'
        });
      } else {
        this.router.navigate(['/checkout'], { queryParams: { type: 'product', value: this.productId, size: this.selectedSize } });
      }
    }
  }

  reloadPage(productId) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    }
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/product', productId])
  }

  deleteReviewConfirmer(aId) {
    const dialogRef = this.dialog.open(DeleteReviewDialog, {
      width: '300px',
      data: aId
    });

    dialogRef.afterClosed().subscribe(result => {
      this.deleteReview(result)
    });
  }

  deleteReview(data) {
    if (data != null) {
      this.service.deleteReview(data).subscribe(
        res => {
          console.log('Review no ' + res + ' deleted');
          this.snackBar.open('Review deleted', 'Okay', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'primary-snackbar'
          });
          this.loadTopReviews()
        },
        err => {
          console.log(JSON.stringify(err));
          this.snackBar.open('Unable to delete Review', 'Okay', {
            duration: 50000,
            verticalPosition: 'bottom',
            panelClass: 'warn-snackbar'
          });
        }
      )
    }
  }

  editReviewDialog(index: number) {
    const dialogRef = this.dialog.open(EditReviewDialog, {
      width: '400px',
      data: this.reviews[index]
    });

    dialogRef.afterClosed().subscribe(result => {
      this.editReview(index, result)
    });
  }


  editReview(i: number, data: Review) {
    if (data != null) {
      this.service.editReview(this.reviews[i].reviewId, data).subscribe(
        res => {
          console.log('Review no ' + res + ' deleted');
          this.snackBar.open('Review deleted', 'Okay', {
            duration: 5000,
            verticalPosition: 'bottom',
            panelClass: 'primary-snackbar'
          });
          this.loadTopReviews()
        },
        err => {
          console.log(JSON.stringify(err));
          this.snackBar.open('Unable to delete Review', 'Okay', {
            duration: 50000,
            verticalPosition: 'bottom',
            panelClass: 'warn-snackbar'
          });
        }
      )
    }
  }
}
