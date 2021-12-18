import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Sushi} from "../interfaces/sushi";

@Injectable({
  providedIn: 'root'
})
export class SushiService {

  constructor(private http: HttpClient) { }

  fakeSushiApi = 'assets/mock-sushi/sushi.json'

  getSushi():Observable<Sushi> {
    return this.http.get<Sushi>(this.fakeSushiApi);
  }

}
