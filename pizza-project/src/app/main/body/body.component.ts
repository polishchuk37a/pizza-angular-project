import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../../../services/pizza.service";
import {Pizza} from "../../../interfaces/pizza";
import {SushiData} from "../../../interfaces/sushi-data";
import {SushiService} from "../../../services/sushi.service";
import {forkJoin} from "rxjs";
import {FunctionalService} from "../../../services/functional.service";

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.scss'],
})
export class BodyComponent implements OnInit {

  pizzaData: Pizza[] = [];
  sushiData: SushiData[] = [];

  constructor(private pizzaService: PizzaService, private sushiService: SushiService, private functionalService: FunctionalService) { }

  ngOnInit(): void {
    forkJoin(
      this.pizzaService.getPizza(),
      this.sushiService.getSushi(),
    ).subscribe(([pizza, sushi]) => {
      this.pizzaData = pizza.pizza;
      this.sushiData = sushi.sushi;
    })

  }

  addPizzaToOrder(order: Pizza) {
    this.functionalService.addPizza(order);
  }

  addSushiToOrder(order: SushiData) {
    this.functionalService.addSushi(order);
  }
}
