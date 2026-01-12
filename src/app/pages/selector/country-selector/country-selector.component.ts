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
import { gsap } from 'gsap';
import { Draggable, ScrollTrigger } from 'gsap/all';

@Component({
  selector: 'app-country-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './country-selector.component.html',
  styleUrl: './country-selector.component.css',
})
export class CountrySelectorComponent implements AfterViewInit, OnDestroy {
  @ViewChild('galleryWrapper') galleryWrapper!: ElementRef;
  @ViewChild('cardsList') cardsList!: ElementRef;
  @ViewChildren('cardItem') cardItems!: QueryList<ElementRef>;

  public selectedCountries: string[] = [];

  private platformId = inject(PLATFORM_ID);
  private ctx?: gsap.Context;

  private moveToOffset?: (offset: number) => void;
  private currentOffset = 0;
  private spacing = 0;

  constructor() {
    gsap.registerPlugin(ScrollTrigger, Draggable);
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => this.initSeamlessLoop(), 100);
    }
  }

  ngOnDestroy() {
    if (this.ctx) this.ctx.revert();
  }

  next() {
    if (this.moveToOffset) this.moveToOffset(this.currentOffset + this.spacing);
  }

  prev() {
    if (this.moveToOffset) this.moveToOffset(this.currentOffset - this.spacing);
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
    console.log('Wybrane kraje:', this.selectedCountries);
  }

  private initSeamlessLoop() {
    this.ctx = gsap.context(() => {
      const cards = this.cardItems.map((el) => el.nativeElement);

      this.spacing = 0.1;

      let iteration = 0;
      const spacing = this.spacing;
      const snapTime = gsap.utils.snap(spacing);

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
          }
        ).fromTo(
          element,
          { xPercent: 400 },
          { xPercent: -400, duration: 1, ease: 'none', immediateRender: false },
          0
        );
        return tl;
      };

      const seamlessLoop = this.buildSeamlessLoop(cards, spacing, animateFunc);
      const playhead = { offset: 0 };
      const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

      const scrub = gsap.to(playhead, {
        offset: 0,
        onUpdate: () => {
          seamlessLoop.time(wrapTime(playhead.offset));
        },
        duration: 0.5,
        ease: 'power3',
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        start: 0,

        onUpdate: (self) => {
          const scroll = self.scroll();

          if (scroll > self.end - 1) {
            wrap(1, 2);
          } else if (scroll < 1 && self.direction < 0) {
            wrap(-1, self.end - 2);
          } else {
            const newOffset =
              (iteration + self.progress) * seamlessLoop.duration();
            scrub.vars['offset'] = newOffset;
            scrub.invalidate().restart();
            this.currentOffset = newOffset;
          }
        },
        end: '+=3000',
        pin: this.galleryWrapper.nativeElement,
      });

      const getSafeScroll = (progress: number) => {
        return gsap.utils.clamp(
          1,
          trigger.end - 1,
          gsap.utils.wrap(0, 1, progress) * trigger.end
        );
      };

      const wrap = (iterationDelta: number, scrollTo: number) => {
        iteration += iterationDelta;
        trigger.scroll(scrollTo);
        trigger.update();
      };

      const scrollToOffset = (offset: number) => {
        const snappedTime = snapTime(offset);
        const progress =
          (snappedTime - seamlessLoop.duration() * iteration) /
          seamlessLoop.duration();
        const scroll = getSafeScroll(progress);

        if (progress >= 1 || progress < 0) {
          return wrap(Math.floor(progress), scroll);
        }
        trigger.scroll(scroll);
      };

      this.moveToOffset = scrollToOffset;

      Draggable.create('.drag-proxy', {
        type: 'x',
        trigger: this.cardsList.nativeElement,
        onPress() {
          (this as any).startOffset = scrub.vars['offset'];
        },
        onDrag() {
          const newOffset =
            (this as any).startOffset + (this['startX'] - this['x']) * 0.001;
          scrub.vars['offset'] = newOffset;
          scrub.invalidate().restart();
        },
        onDragEnd() {
          scrollToOffset(scrub.vars['offset'] as number);
        },
      });
    }, this.galleryWrapper);
  }

  private buildSeamlessLoop(
    items: any[],
    spacing: number,
    animateFunc: Function
  ) {
    let overlap = Math.ceil(1 / spacing);
    let startTime = items.length * spacing + 0.5;
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
    let time, i, index;

    for (i = 0; i < l; i++) {
      index = i % items.length;
      time = i * spacing;
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
        }
      );
    return seamlessLoop;
  }

  countries = [
    { name: 'Poland', flag: '🇵🇱', img: 'assets/images/poland.jpg' },
    { name: 'Spain', flag: '🇪🇸', img: 'assets/images/spain.jpg' },
    { name: 'Italy', flag: '🇮🇹', img: 'assets/images/italy.jpg' },
    { name: 'Germany', flag: '🇩🇪', img: 'assets/images/germany.jpg' },
    { name: 'France', flag: '🇫🇷', img: 'assets/images/france.jpg' },
    { name: 'Greece', flag: '🇬🇷', img: 'assets/images/greece.jpg' },
    { name: 'Netherlands', flag: '🇳🇱', img: 'assets/images/netherlands.jpg' },
    { name: 'Sweden', flag: '🇸🇪', img: 'assets/images/sweden.jpg' },
  ];
}
