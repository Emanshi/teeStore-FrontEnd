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

  getProductImages(imageList:Product[]){
    
  }
  
}
