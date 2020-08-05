import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Orders } from '../models/orders';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ViewOrdersService {

  constructor(private http:HttpClient) { }

  getOrder (orderId:string):Observable<Orders> {
    return this.http.get<Orders>(environment.orderApi+"getOrder?orderId="+orderId)
  }
}
