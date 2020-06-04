import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Images } from '../models/images';

@Injectable({
  providedIn: 'root'
})
export class ViewProductService {

  constructor(private http:HttpClient) { }

  getAllProducts():Observable<Product[]>{
    return this.http.get<Product[]>(environment.productApi+'getAllProducts');
  }

  getProductByDiscount(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.productApi+'getProductByDiscount/'+category);
  }

  getProductsByCategory(category:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.productApi+'getProductByCategory/'+category);
  }

  getProductById(productId:string):Observable<Product>{
    return this.http.get<Product>(environment.productApi+'getProductById/'+productId);
  }

  getProductByGroup(productGroup:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.productApi+'getProductByGroup/'+productGroup);
  }

  getImagesForProduct(reference:string):Observable<Images[]>{
    return this.http.get<Images[]>(environment.imageApi+'getImages/'+reference);
  }

}
