import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllReviewsService {

  constructor(private http:HttpClient) { }

  loadProductReviews(pId:string):Observable<Review[]>{
    return this.http.get<Review[]>(environment.reviewApi+'getReviewByProductId/'+pId)
  }
}
