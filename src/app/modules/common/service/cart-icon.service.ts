import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartIconService {

  // 21.0 dodaję pole:
  subject: Subject<Number> = new Subject();

  constructor() { }

  // 21.1 dodaję metodę i wracam do komponentu header:
  cartChanged(counter: number) {
    this.subject.next(counter);
  }
}