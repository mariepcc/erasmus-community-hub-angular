import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { gsap } from 'gsap';

gsap.registerPlugin();
@Component({
  selector: 'app-country-selector',
  imports: [],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css',
})
export class CountrySelectorComponent implements AfterViewInit {
  @ViewChild('box') box!: ElementRef;

  ngAfterViewInit() {
    console.log('Target:', this.box.nativeElement);
    gsap.to(this.box.nativeElement, { duration: 1, x: 100, opacity: 1 });
  }
}
