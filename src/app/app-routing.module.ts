import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { CartGuardService } from './cart/cart-guard.service';
import { CheckoutComponent } from './checkout/checkout.component';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { AddReviewComponent } from './add-review/add-review.component';


const routes: Routes = [
  { path : 'login', component : UserLoginComponent },
  { path : 'register', component : UserRegisterComponent },
  { path : 'home', component : HomeComponent },
  { path : 'profile', component : ProfileComponent },
  { path : 'products', component : ProductsComponent },
  { path : 'product/:pId', component : ViewProductComponent },
  { path : 'reviews/:pId', component : AllReviewsComponent },
  { path : 'cart', component : CartComponent, canDeactivate:[CartGuardService]},
  { path : 'checkout', component : CheckoutComponent},
  { path : 'order', component : ViewOrdersComponent},
  { path : 'add-review/:pId', component : AddReviewComponent },
  { path: '', component : HomeComponent },
  { path: "**", redirectTo : "", pathMatch : 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
