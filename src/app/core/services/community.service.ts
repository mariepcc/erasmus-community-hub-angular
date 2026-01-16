import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Country } from '../models/community.model';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private countries: Country[] = [
    {
      code: 'ES',
      name: 'Spain',
      flag: '🇪🇸',
      cities: [
        { id: 'mad', name: 'Madrid', country: 'Spain', memberCount: 234 },
        { id: 'bcn', name: 'Barcelona', country: 'Spain', memberCount: 189 },
        { id: 'val', name: 'Valencia', country: 'Spain', memberCount: 98 }
      ],
      isExpanded: false
    },
    {
      code: 'IT',
      name: 'Italy',
      flag: '🇮🇹',
      cities: [
        { id: 'rom', name: 'Rome', country: 'Italy', memberCount: 178 },
        { id: 'mil', name: 'Milan', country: 'Italy', memberCount: 156 },
        { id: 'bol', name: 'Bologna', country: 'Italy', memberCount: 87 }
      ],
      isExpanded: false
    },
    {
      code: 'FR',
      name: 'France',
      flag: '🇫🇷',
      cities: [
        { id: 'par', name: 'Paris', country: 'France', memberCount: 267 },
        { id: 'lyo', name: 'Lyon', country: 'France', memberCount: 134 },
        { id: 'mar', name: 'Marseille', country: 'France', memberCount: 92 }
      ],
      isExpanded: false
    },
    {
      code: 'DE',
      name: 'Germany',
      flag: '🇩🇪',
      cities: [
        { id: 'ber', name: 'Berlin', country: 'Germany', memberCount: 201 },
        { id: 'mun', name: 'Munich', country: 'Germany', memberCount: 167 },
        { id: 'ham', name: 'Hamburg', country: 'Germany', memberCount: 123 }
      ],
      isExpanded: false
    }
  ];

  private countriesSubject = new BehaviorSubject<Country[]>(this.countries);
  
  getCountries(): Observable<Country[]> {
    return this.countriesSubject.asObservable();
  }

  toggleCountry(countryCode: string): void {
    const updated = this.countries.map(c => 
      c.code === countryCode ? { ...c, isExpanded: !c.isExpanded } : c
    );
    this.countries = updated;
    this.countriesSubject.next(updated);
  }
}