import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { environment } from 'src/environments/environment';
import { Images } from '../models/images';
import { Review } from '../models/review';
import { ReviewCounts } from '../models/review-counts';

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
    return this.http.get<Product[]>(environment.productApi+'getProductsByCategory/'+category);
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

  getImageById(id:string):Observable<Images>{
    return this.http.get<Images>(environment.imageApi+'getImage/'+id);
  }

  getReviews(productId:string):Observable<Review[]>{
    return this.http.get<Review[]>(environment.reviewApi+'getTopReviews/'+productId)
  }

  getReviewCounts(productId:string):Observable<ReviewCounts>{
    return this.http.get<ReviewCounts>(environment.reviewApi+'getRatingCounts/'+productId)
  }

  addProductTocart(productId:string,userId:string,size:string):Observable<number>{
    return this.http.get<number>(environment.cartApi+"addProduct?userId="+userId+"&productId="+productId+"&size="+size)
  }

  getSimilarProducts(catergory:string):Observable<Product[]>{
    return this.http.get<Product[]>(environment.productApi+'getSimilarProducts/'+catergory)
  }

  getNewArrivals():Observable<Product[]>{
    return this.http.get<Product[]>(environment.productApi+'getNewArrivals')
  }
}
