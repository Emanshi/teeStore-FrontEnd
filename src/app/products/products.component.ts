import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { Product } from '../models/product';
import { Options, LabelType } from 'ng5-slider';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filter:string
  value:string
  products:Product[]
  lowValue: number = 40;
  highValue: number = 60;
  options: Options = {
    floor:0,
    ceil: 500,
    translate: (value: number, label: LabelType): string => {  
          return '';
    }
  };

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

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
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

  sortByPopularuty() {
    this.products.sort(
      (a,b)=>{
        if (a.totalRaters>b.totalRaters) {
          return -1
        } else if (a.totalRaters<b.totalRaters) {
          return 1
        } else {
          return 0
        }
      }
    )
  }

  sortByRating() {
    this.products.sort(
      (a,b)=>{
        if (a.avgRating > b.avgRating) {
          return -1
        } else if (a.avgRating < b.avgRating) {
          return 1
        } else {
          return 0
        }
      }
    )
  }

  sortByPrice() {
    this.products.sort(
      (a,b)=>{
        if (a.cost > b.cost) { 
          return 1
        } else if (a.cost < b.cost) {
          return -1
        } else {
          return 0
        }
      }
    )
  }

  sortByPriceRev() {
    this.products.sort(
      (a,b)=>{
        if (a.cost > b.cost) {
          return -1
        } else if (a.cost < b.cost) {
          return 1
        } else {
          return 0
        }
      }
    )
  }

  sortByDate() {
    this.products.sort(
      (a,b)=>{
        if (a.dateOfAddition > b.dateOfAddition) {
          return -1
        } else if (a.dateOfAddition < b.dateOfAddition) {
          return 1
        } else {
          return 0
        }
      }
    )
  }
}
