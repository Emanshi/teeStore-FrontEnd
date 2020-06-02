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
    this.getProductByDiscount()
    this.hotDeals()
  }

  getProductByDiscount(){
     this.productService.getProductByDiscount('JEANS').subscribe(
         response=> this.jeansProductList= response 
     )
     this.productService.getProductByDiscount('SHIRT').subscribe(
      response=> this.shirtProductList= response 
    )  

  }

  hotDeals(){
    alert(JSON.stringify(this.shirtProductList))
  }
  
}
