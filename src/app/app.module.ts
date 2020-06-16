import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSelectModule } from '@angular/material/select'

import { HttpClientModule } from '@angular/common/http';

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
    AllReviewsComponent
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
    NgxImageZoomModule
  ],
  providers: [
    AuthenticatorService,
    UserLoginService,
    UserRegisterService,
    ProfileService,
    ViewProductService,
    AllReviewsService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
