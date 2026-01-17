import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-main-page',
  imports: [JsonPipe],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.css',
})
export class MainPageComponent {
  receivedSelection: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();

    this.receivedSelection = navigation?.extras.state?.['data'];

    console.log('Data received in Main Page:', this.receivedSelection);
  }
}
