import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) {  }

  getProductsByCategory(category:string):Observable<Product[]> {
    return this.http.get<Product[]>(environment.productApi+'getProductsByCategory/'+category)
  }

  getProductsByQuery(search:string):Observable<Product[]> {
    return this.http.get<Product[]>(environment.productApi+'getProducts?search='+search)
  }
}
