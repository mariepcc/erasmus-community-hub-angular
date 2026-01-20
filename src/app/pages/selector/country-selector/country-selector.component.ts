import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  inject,
  PLATFORM_ID,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { gsap } from 'gsap';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css',
})
export class CountrySelectorComponent implements AfterViewInit, OnDestroy {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  @ViewChild('galleryWrapper') galleryWrapper!: ElementRef;
  @ViewChildren('cardItem') cardItems!: QueryList<ElementRef>;

  public selectedCountries: string[] = [];
  private ctx?: gsap.Context;
  private spacing = 0.1;
  private seamlessLoop?: gsap.core.Timeline;
  private scrub?: gsap.core.Tween;
  private playhead = { offset: 0 };

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initSeamlessLoop(), 100);
    }
  }

  ngOnDestroy() {
    if (this.ctx) {
      this.ctx.revert();
    }
  }

  next() {
    this.scrubTo(this.playhead.offset + this.spacing);
  }

  prev() {
    this.scrubTo(this.playhead.offset - this.spacing);
  }

  private scrubTo(offset: number) {
    const snap = gsap.utils.snap(this.spacing);
    this.scrub?.kill();
    this.scrub = gsap.to(this.playhead, {
      offset: snap(offset),
      duration: 0.5,
      ease: 'power3',
      onUpdate: () => {
        const totalTime = this.seamlessLoop?.duration() || 0;
        const wrap = gsap.utils.wrap(0, totalTime);
        this.seamlessLoop?.time(wrap(this.playhead.offset));
      },
    });
  }

  toggleCountry(countryName: string) {
    const index = this.selectedCountries.indexOf(countryName);
    if (index > -1) {
      this.selectedCountries.splice(index, 1);
    } else {
      this.selectedCountries.push(countryName);
    }
  }

  isSelected(countryName: string): boolean {
    return this.selectedCountries.includes(countryName);
  }

  confirmSelection() {
    this.router.navigate(['/city-selector'], {
      queryParams: { countries: this.selectedCountries },
    });
  }

  private initSeamlessLoop() {
    this.ctx = gsap.context(() => {
      const cards = this.cardItems.map((el) => el.nativeElement);
      gsap.set(cards, { xPercent: 400, opacity: 0, scale: 0 });

      const animateFunc = (element: HTMLElement) => {
        const tl = gsap.timeline();
        tl.fromTo(
          element,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            zIndex: 100,
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: 'power1.in',
            immediateRender: false,
          },
        ).fromTo(
          element,
          { xPercent: 400 },
          { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
          0,
        );
        return tl;
      };

      this.seamlessLoop = this.buildSeamlessLoop(
        cards,
        this.spacing,
        animateFunc,
      );
      this.playhead.offset = this.seamlessLoop.duration() * 100;
    }, this.galleryWrapper);
  }

  private buildSeamlessLoop(
    items: any[],
    spacing: number,
    animateFunc: Function,
  ) {
    let overlap = Math.ceil(1 / spacing);
    let startTime = items.length * spacing;
    let loopTime = (items.length + overlap) * spacing + 1;
    let rawSequence = gsap.timeline({ paused: true });
    let seamlessLoop = gsap.timeline({
      paused: true,
      repeat: -1,
      onRepeat() {
        if (this['_time'] === this['_dur']) {
          this['_tTime'] += this['_dur'] - 0.01;
        }
      },
    });

    let l = items.length + overlap * 2;
    for (let i = 0; i < l; i++) {
      let index = i % items.length;
      let time = i * spacing;
      rawSequence.add(animateFunc(items[index]), time);
    }

    rawSequence.time(startTime);
    seamlessLoop
      .to(rawSequence, {
        time: loopTime,
        duration: loopTime - startTime,
        ease: 'none',
      })
      .fromTo(
        rawSequence,
        { time: overlap * spacing + 1 },
        {
          time: startTime,
          duration: startTime - (overlap * spacing + 1),
          immediateRender: false,
          ease: 'none',
        },
      );
    return seamlessLoop;
  }

  countries = [
    { name: 'Spain', flag: '🇪🇸', img: '/images/spain.jpg' },
    { name: 'Italy', flag: '🇮🇹', img: '/images/italy.jpg' },
    { name: 'Portugal', flag: '🇵🇹', img: '/images/portugal.jpg' },
    { name: 'Greece', flag: '🇬🇷', img: '/images/greece.jpg' },
    { name: 'France', flag: '🇫🇷', img: '/images/france.jpg' },
    { name: 'Germany', flag: '🇩🇪', img: '/images/germany.jpg' },
    { name: 'Czech Republic', flag: '🇨🇿', img: '/images/czechrepublic.jpg' },
    { name: 'Poland', flag: '🇵🇱', img: '/images/poland.jpg' },
    { name: 'Netherlands', flag: '🇳🇱', img: '/images/netherlands.jpg' },
    { name: 'Sweden', flag: '🇸🇪', img: '/images/sweden.jpg' },
  ];
}
