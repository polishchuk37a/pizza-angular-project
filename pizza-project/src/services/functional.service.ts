import { Injectable } from '@angular/core';
import {Pizza} from "../interfaces/pizza";
import {SushiData} from "../interfaces/sushi-data";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FunctionalService {

  private pizzaResult: number = 0;
  private sushiResult: number = 0;

  private pizzaOrder: Pizza[] = [];
  private sushiOrder: SushiData[] = [];

  private pizza$ = new BehaviorSubject<Pizza[]>(this.pizzaOrder);
  private sushi$ = new BehaviorSubject<SushiData[]>(this.sushiOrder);

  constructor() { }

  addPizza(product: Pizza) {
    this.pizzaOrder.push(product);
    this.pizza$.next(this.pizzaOrder);
  }

  getPizzaOrder() {
    return this.pizza$.asObservable();
  }

  addSushi(product: SushiData) {
    this.sushiOrder.push(product);
    this.sushi$.next(this.sushiOrder);
  }

  getSushiOrder() {
    return this.sushi$.asObservable();
  }

  orderSum() {
    this.pizzaResult = this.pizzaOrder.reduce((a, b) => a + b.price, 0);
    this.sushiResult = this.sushiOrder.reduce((a, b) => a + b.price, 0);
    return this.pizzaResult + this.sushiResult;
  }

  deletePizza(pizzaElement: Pizza) {
    let pizzaArr = this.pizza$.getValue();

    pizzaArr.forEach((item, index) => {
      if(item === pizzaElement) {
        pizzaArr.splice(index, 1);
      }
    })

    this.pizza$.next(pizzaArr);
  }

  deleteSushi(sushiElement: SushiData) {
    let sushiArr = this.sushi$.getValue();

    sushiArr.forEach((item, index) => {
      if(item === sushiElement) {
        sushiArr.splice(index, 1)
      }
    })

    this.sushi$.next(sushiArr);
  }

}
