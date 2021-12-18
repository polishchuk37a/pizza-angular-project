import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PizzaData} from "../interfaces/pizza-data";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  constructor(private http: HttpClient) { }

  fakePizzaApi = 'assets/mock-pizza/pizza.json';

  getPizza(): Observable<PizzaData> {
   return this.http.get<PizzaData>(this.fakePizzaApi);
  }

}
