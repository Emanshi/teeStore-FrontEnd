import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';


const routes: Routes = [
  { path : 'login', component : UserLoginComponent },
  { path : 'register', component : UserRegisterComponent },
  { path : 'home', component : HomeComponent },
  { path : 'profile', component : ProfileComponent },
  { path : 'product/:pId', component : ViewProductComponent },
  { path : 'reviews/:pId', component : AllReviewsComponent },
  { path: '', component : HomeComponent },
  { path: "**", redirectTo : "", pathMatch : 'full' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
