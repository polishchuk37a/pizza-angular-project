import {Component, DoCheck, OnInit} from '@angular/core';
import {Pizza} from "../../interfaces/pizza";
import {SushiData} from "../../interfaces/sushi-data";
import {FunctionalService} from "../../services/functional.service";
import {tap} from "rxjs/operators";
import {FormBuilder, FormGroup} from "@angular/forms";
import {BackendService} from "../../services/backend.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit, DoCheck {

  ordersPizza: Pizza[] = [];
  ordersSushi: SushiData[] = [];

  isOrdered: boolean = false;
  isOpened: boolean = false;

  result: number = 0;

  orderForm: FormGroup;

  constructor(private functionalService: FunctionalService, private backendService: BackendService,private formBuilder: FormBuilder) {
    this.orderForm = this.formBuilder.group({
      name: [''],
      phone: ['+380'],
      address: [''],
      wishes: ['']
    })
  }

  ngOnInit(): void {

    this.functionalService.getPizzaOrder().pipe(
      tap(value => {
        this.ordersPizza = value;
      })
    ).subscribe()

    this.functionalService.getSushiOrder().pipe(
      tap(value => {
        this.ordersSushi = value;
      })
    ).subscribe()
  }

  ngDoCheck() {
    if (this.ordersPizza.length !== 0 || this.ordersSushi.length !== 0) {
      this.isOrdered = true;
    } else {
      this.isOrdered = false;
    }

    this.result = this.functionalService.orderSum();
  }

  removePizzaItem(pizzaElement: Pizza) {
    this.functionalService.deletePizza(pizzaElement);
  }

  removeSushiItem(sushiElement: SushiData) {
    this.functionalService.deleteSushi(sushiElement);
  }

  openModalWindow() {
    this.isOpened = true;
  }

  closeModalWindow() {
    this.isOpened = false;
  }

  getUserDataForm() {
    let formData = this.orderForm.value;

    let pizza = this.ordersPizza.map(pizza => pizza.name);
    let sushi = this.ordersSushi.map(sushi => sushi.name);

    let orderList = [...pizza, ...sushi];

    let order = {
      ...formData,
      goodNames: orderList
    }

    this.backendService.postUserData(order).subscribe();
    this.isOpened = false;
  }
}


