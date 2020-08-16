import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddReviewService {

  constructor(private http:HttpClient) { }

  addReview(review:Review){
    return this.http.post(environment.reviewApi+'addReview', review, {responseType: 'text'})
  }
}
