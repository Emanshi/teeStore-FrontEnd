import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { Product } from '../models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filter:string
  value:string
  products:Product[]

  constructor(private route:ActivatedRoute, private service:ProductsService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params=>{
        this.filter=params['filter']
        this.value=params['value']
        this.loadProducts()
      }
    )
  }

  loadProducts() {
    if (this.filter=='category') {
      this.service.getProductsByCategory(this.value).subscribe(
        res=>this.products=res
      )
    } else if (this.filter=='search') {
      this.service.getProductsByQuery(this.value).subscribe(
        res=>this.products=res
      )
    }
  }
}
