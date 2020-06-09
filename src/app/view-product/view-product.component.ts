import { Component, OnInit } from '@angular/core';
import { ViewProductService } from './view-product.service';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../models/product';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  product:Product
  productId:string

  constructor(private service:ViewProductService,private auth:AuthenticatorService,private router:Router,private route:ActivatedRoute,private title:Title) { }

  ngOnInit(): void {    
    this.route.params.subscribe(
      param=>this.productId=param['pId']
    );
    this.loadProduct()
  }

  loadProduct(){
    this.service.getProductById(this.productId).subscribe(
      response=>{this.product=response;
        this.title.setTitle(this.product.productName)
      }
    )
  }

  
}
