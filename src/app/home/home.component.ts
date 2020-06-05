import { Component, OnInit } from '@angular/core';
import { ViewProductService } from '../view-product/view-product.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tshirtProductList:Product[];
  shirtProductList:Product[];
  jeansProductList:Product[];
  skirtsProductList:Product[];
  topsProductList:Product[];
  trousersProductList:Product[];

  constructor(private productService:ViewProductService) { }

  ngOnInit(): void {

    this.getJeansByDiscount();
  }

  getJeansByDiscount(){
    this.productService.getProductByDiscount('JEANS').subscribe(
      response=>{this.jeansProductList=response }
   )
  }

  getTshirtByDiscount(){
    this.productService.getProductByDiscount('TSHIRT').subscribe(
      response=>{this.tshirtProductList=response }
   )
  }

  getShirtByDiscount(){
    this.productService.getProductByDiscount('SHIRT').subscribe(
      response=>{this.shirtProductList=response }
   )
  }

  getTopsByDiscount(){
    this.productService.getProductByDiscount('TOPS').subscribe(
      response=>{this.topsProductList=response }
   )
  }

  getTrousersByDiscount(){
    this.productService.getProductByDiscount('TROUSERS').subscribe(
      response=>{this.trousersProductList=response }
   )
  }

  getSkirtsByDiscount(){
    this.productService.getProductByDiscount('SKIRTS').subscribe(
      response=>{this.skirtsProductList=response }
   )
  }

  
}
