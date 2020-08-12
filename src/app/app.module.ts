import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatSliderModule } from '@angular/material/slider'
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { Ng5SliderModule } from 'ng5-slider'

import { HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { UserLoginService } from './user-login/user-login.service';
import { UserRegisterService } from './user-register/user-register.service';
import { AuthenticatorService } from './auth/authenticator.service';
import { ProfileComponent } from './profile/profile.component';
import { ProfileService } from './profile/profile.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { from } from 'rxjs';
import { ViewProductService } from './view-product/view-product.service';
import { RatingtooltipPipe } from './home/ratingtooltip.pipe';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductsComponent } from './products/products.component';
import { AllReviewsComponent } from './all-reviews/all-reviews.component';
import { AllReviewsService } from './all-reviews/all-reviews.service';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CartGuardService } from './cart/cart-guard.service';
import { ViewOrdersComponent } from './view-orders/view-orders.component';
import { ViewOrdersService } from './view-orders/view-orders.service';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddReviewService } from './add-review/add-review.service';

@NgModule({
  declarations: [
    AppComponent,
    UserLoginComponent,
    UserRegisterComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    ViewProductComponent,
    ProfileComponent,
    RatingtooltipPipe,
    ProductsComponent,
    AllReviewsComponent,
    CartComponent,
    CheckoutComponent,
    ViewOrdersComponent,
    AddReviewComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    MatFormFieldModule,
    MatSelectModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    Ng5SliderModule,
    MatSnackBarModule,
    NgxImageZoomModule
  ],
  providers: [
    AuthenticatorService,
    UserLoginService,
    UserRegisterService,
    ProfileService,
    ViewProductService,
    ViewOrdersService,
    AddReviewService,
    AllReviewsService,
    CartGuardService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
