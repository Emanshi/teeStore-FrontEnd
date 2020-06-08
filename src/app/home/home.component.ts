import { Component, OnInit } from '@angular/core';
import { ViewProductService } from '../view-product/view-product.service';
import { Product } from '../models/product';
import {MatTooltip} from '@angular/material/tooltip';

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
    this.getShirtByDiscount();
    this.getSkirtsByDiscount();
    this.getTopsByDiscount();
    this.getTshirtByDiscount();
    this.getTrousersByDiscount();
  }

  sortProducts(productList:Product[]) {
    productList.sort(
      (o1, o2)=>{
        if (o1.avgRating > o2.avgRating) {
          return 1;
        } else if (o1.avgRating < o2.avgRating) {
            return -1;
        } else {
          if (o1.totalRaters > o2.totalRaters) {
            return 1;
          } else if (o1.totalRaters < o2.totalRaters) {
            return -1;
          }
        }
  
        return 0;
      }
    )
  }

  getJeansByDiscount(){
    this.productService.getProductsByCategory('JEANS').subscribe(
      response=>{this.jeansProductList=response
      this.sortProducts(this.jeansProductList) }
    )
  }

  getTshirtByDiscount(){
    this.productService.getProductsByCategory('TSHIRT').subscribe(
      response=>{this.tshirtProductList=response
        this.sortProducts(this.tshirtProductList) }
   )
  }

  getShirtByDiscount(){
    this.productService.getProductsByCategory('SHIRT').subscribe(
      response=>{this.shirtProductList=response
      this.sortProducts(this.shirtProductList) }
   )
  }

  getTopsByDiscount(){
    this.productService.getProductsByCategory('TOPS').subscribe(
      response=>{this.topsProductList=response
      this.sortProducts(this.topsProductList) }
   )
  }

  getTrousersByDiscount(){
    this.productService.getProductsByCategory('TROUSERS').subscribe(
      response=>{this.trousersProductList=response
      this.sortProducts(this.trousersProductList) }
    )
  }

  getSkirtsByDiscount(){
    this.productService.getProductsByCategory('SKIRTS').subscribe(
      response=>{this.skirtsProductList=response
      this.sortProducts(this.skirtsProductList) }
    )
  }
  
}
