import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminMessageService} from "../admin-message.service";

@Component({
  selector: 'app-admin-message',
  templateUrl: './admin-message.component.html',
  styleUrls: ['./admin-message.component.scss']
})
// 34.9 implementuje OnDestroy:
export class AdminMessageComponent implements OnInit, OnDestroy { // 33.0 dodałej do deklaracji w fullpageadmin.module

  // 33.3 dodaję pole messages (póki co pusta tablica):
  messages: Array<string> = [];
  // 36.1 dodaję licznik kliknięć:
  private clickCounter: number = 0;

  // 34.5 wstrzykuję serwis:
  constructor(private adminMessageService: AdminMessageService) { }

  // 34.6 subskrybuję się na Obserwejbla:
  ngOnInit(): void { // 34.7 nadpisuję tablicę wiadomościami, które dostaję z Obserwejbla:
    this.adminMessageService.subject.subscribe(messages => {
      this.messages = messages;
      this.timeoutCloseMessages();
    });
  }

// 34.8 metoda jest podłączona do guzika, czyści wiadomości:

  clearMessages() {
    this.messages = [];
    this.adminMessageService.clear(); // wyczyściłem obie tablice
  }
  //34.10 odsubskrybowywuję się. W ten sposób dzięki temu, przy niszczeniu komponentu będę się odsubskrybowywał od serwisu,
  // po to, żeby uniknąć wycieków pamięci, komponent będzie mógł być wyczyszczony:
  ngOnDestroy(): void {
    this.adminMessageService.subject.unsubscribe();
  }

  // 36 wydzielona metodę
  private timeoutCloseMessages() {
    this.clickCounter++;
    setTimeout(() => { // 36.0 ustawiam czas znikania komunikaty z błędami
      // 36.2 jeśli licznik jest 1, zamyka komunikat błędu:
      if (this.clickCounter == 1) {
        this.clearMessages();
      }
      this.clickCounter--;
    }, 15000);
  }
}