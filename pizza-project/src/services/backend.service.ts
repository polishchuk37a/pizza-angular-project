import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Order} from "../interfaces/order";

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  backendApi = 'http://localhost:5000/api/order/createorder';

  constructor(private http: HttpClient) { }

  postUserData(userData: object) {
    return this.http.post<Order>(this.backendApi, userData);
  }
}
