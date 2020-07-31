import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from './products.service';
import { Product } from '../models/product';
import { Options, LabelType } from 'ng5-slider';
import { Filter } from './filter';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  filter:string
  value:string
  products:Product[]
  productsArray:Product[]
  filters:Filter
  options: Options = {
    floor:0,
    ceil: 30000,
    translate: (value: number, label: LabelType): string => {  
          return '';
    }
  };

  constructor(private route:ActivatedRoute, private service:ProductsService, private title:Title) { 
    title.setTitle("Products")
  }

  ngOnInit(): void {
    this.filters={
      male:false,female:false,xs:false,s:false,m:false,l:false,xl:false,xxl:false,percent25:false,percent20:false,highPrice:30000,
      lowPrice:0,percent15:false,percent10:false,percent5:false,ratings4:false,ratings3:false,ratings2:false,ratings1:false
    }
    this.route.queryParams.subscribe(
      params=>{
        this.filter=params['filter']
        this.value=params['value']
        this.loadProducts()
      }
    )
  }
  
  assignPriceLimits(){
    this.filters.highPrice=Math.max.apply(Math, this.productsArray.map(function(o) { return o.cost; }))
    this.filters.lowPrice=Math.min.apply(Math, this.productsArray.map(function(o) { return o.cost; }))
    this.options = {
      floor:this.filters.lowPrice-1,
      ceil:this.filters.highPrice+1,
      translate: (value: number, label: LabelType): string => {  
            return '';
      }
    };
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  filtering() {
    this.products=this.productsArray.filter(p=>(p.sex==='M'&&this.filters.male==true)||(p.sex==='F'&&this.filters.female==true)||(this.filters.female==false&&this.filters.male==false))
    this.products=this.products.filter(p=>(('XS' in p.sizeAndQuantity)&&this.filters.xs==true)||(('S' in p.sizeAndQuantity)&&this.filters.s==true)||(('M' in p.sizeAndQuantity)&&this.filters.m==true)||(('L' in p.sizeAndQuantity)&&this.filters.l==true)||(('XL' in p.sizeAndQuantity)&&this.filters.xl==true)||(('XXL' in p.sizeAndQuantity)&&this.filters.xxl==true)||(this.filters.xs==false&&this.filters.s==false&&this.filters.m==false&&this.filters.l==false&&this.filters.xl==false&&this.filters.xxl==false))
    this.products=this.products.filter(p=>(p.cost>=this.filters.lowPrice&&p.cost<=this.filters.highPrice)) 
    this.products=this.products.filter(p=>(p.discount>=25&&this.filters.percent25==true)||(p.discount>=20&&p.discount<25&&this.filters.percent20==true)||(p.discount>=15&&p.discount<20&&this.filters.percent15==true)||(p.discount>=10&&p.discount<15&&this.filters.percent10==true)||(p.discount<10&&this.filters.percent5==true)||(this.filters.percent25==false&&this.filters.percent20==false&&this.filters.percent15==false&&this.filters.percent10==false&&this.filters.percent5==false))
    this.products=this.products.filter(p=>(p.avgRating>=4&&this.filters.ratings4==true)||(p.avgRating>=3&&this.filters.ratings3==true)||(p.avgRating>=2&&this.filters.ratings2==true)||(p.avgRating<=1&&this.filters.ratings1==true)||(this.filters.ratings4==false&&this.filters.ratings3==false&&this.filters.ratings2==false&&this.filters.ratings1==false))
  }

  loadProducts() {
    if (this.filter=='category') {
      this.service.getProductsByCategory(this.value).subscribe(
        res=>{
          this.products=res
          this.productsArray=res
          this.assignPriceLimits()
        }
      )
    } else if (this.filter=='search') {
      this.service.getProductsByQuery(this.value).subscribe(
        res=>{
          this.products=res
          this.productsArray=res
          this.assignPriceLimits()
        },
        err=>{
          this.productsArray=[]
          this.products=[]
          //alert(err.message)
        }
      )
    }
  }

  sortByPopularity() {
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
