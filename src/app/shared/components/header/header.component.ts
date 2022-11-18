import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // 24.3 dodaję zmienną title:
  title = "Lumpex";

  constructor() { }

  ngOnInit(): void {
  }
}