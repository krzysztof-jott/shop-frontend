import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminMessageService {

  // 33.6 kopiuję tablicę z komponentu:
  messages: Array<string> = [];
  // 33.7 tworzę Obserwejbla w polu subject. Przyjmuje ten sam typ generyczny co tablica wiadomości, subject będzie emitował
  // jakieś zdarzenie:
  subject = new Subject<Array<string>>();

  constructor() { }

//  33.5 dodaję metody
  add(message: string): void {
    // dodaję czyszczenie, żeby tylko jedna wiadomość najnowsza się pokazywała:
    this.clear();
    // 34.0 dodaję wiadomość do tablicy (push dodaje):
    this.messages.push(message);
    // 34.1 poprzez subject muszę wygenerować jakiś event (next generuje event, czyli całą tablicę wiadomości, czyli wszystko
    // to co dodam do tablicy poleci eventem do obiektów, które obserują mój serwis lub są zasubskrybowane na Obserwejbla).
    // Wysyłam całą tablicę, a nie pojedynczą wiadomość, dzięki temu mogę wyświetlić wszystkie wiadomości na raz:
    this.subject.next(this.messages);

  }
// 34.2 metoda czyści tablicę wiadomości:
  clear() {
    this.messages = [];
  }

  addSpringErrors(error: any): void {
    // console.log(error);
    this.clear();
    // 35.4 zabezpieczam się, żeby tablica nie była pusta:
    this.extractMessages(error); // wydzieliłem metodę
    this.subject.next(this.messages);
  }

  private extractMessages(error: any) {
    if (error.errors?.length > 0) {
      // 35.2 żeby wyświetlić wszystkie błędy walidacyjne, muszę ziterować po tablicy errors co się wyświetla w przeglądarce, dodaję pętlę
      for (let message of error.errors) {
        this.messages.push("Pole: " + message.field + " -> " + message.defaultMessage);
      }
      // 35.3 jak już przerobię wszystkie wiadomości wysyłam event:
    } else {
      this.messages.push(error.message); // ogólny komunikat błędu
    }
  }
}