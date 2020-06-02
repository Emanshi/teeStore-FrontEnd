import { Component, OnInit } from '@angular/core';
import { ViewProductService } from './view-product.service';
import { AuthenticatorService } from '../auth/authenticator.service';
import { Router } from '@angular/router';
import { Product } from '../models/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  products:Product[]

  constructor(private service:ViewProductService,private auth:AuthenticatorService,private router:Router) { }

  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.service.getAllProducts().subscribe(
      response=>this.products=response
    )
  }

}
