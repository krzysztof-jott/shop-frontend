import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {AdminConfirmDialogComponent} from "./admin-confirm-dialog/admin-confirm-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class AdminConfirmDialogService {

  // 42.1 wstrzykuję MatDialog
  constructor(private dialog: MatDialog) { }

  // 43.1 zmieniam to wszystko:
  // 45.1 dodaję zmienną message do metody:
  openConfirmDialog(message: string): MatDialogRef<AdminConfirmDialogComponent, Boolean> {
    return this.dialog.open(AdminConfirmDialogComponent, {
      width: '400px',
      // 45.2 żeby przekazać tę wiadomość trzeba tu w konfiguracji dodać pole date (będzie obiektem):
      data: {
        message: message // przechodzę do komponentu okna
      }
    })
  }

/*  // 42.0 tworzę metodę:
  openConfirmDialog() {
    // 42.2 mogę juz korzystać z dialog. open() ma 2 parametry: komponent i konfiguracja (jakiś obiekt):
    this.dialog.open(AdminConfirmDialogComponent, {
      width: '400px' // szerokość okna
    });
  }*/
}
