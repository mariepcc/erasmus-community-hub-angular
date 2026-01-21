import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user.service';
import { take } from 'rxjs';

interface City {
  id: string;
  name: string;
  selected: boolean;
}

interface CountryGroup {
  name: string;
  image: string;
  cities: City[];
}

@Component({
  selector: 'app-city-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.css'],
})
export class CitySelectorComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
  ) {}
  private router = inject(Router);

  allCities: Record<string, string[]> = {
    Poland: ['Warsaw', 'Krakow', 'Wroclaw', 'Gdansk', 'Poznan', 'Lodz'],
    Spain: [
      'Barcelona',
      'Madrid',
      'Valencia',
      'Sevilla',
      'Malaga',
      'Granada',
      'Alicante',
      'Marcia',
    ],
    Italy: [
      'Rome',
      'Milan',
      'Bologna',
      'Florence',
      'Naples',
      'Turin',
      'Palermo',
      'Venice',
      'Verona',
      'Genoa',
      'Bergamo',
    ],
    Germany: [
      'Berlin',
      'Munich',
      'Hamburg',
      'Cologne',
      'Frankfurt',
      'Heidelberg',
    ],
    France: [
      'Paris',
      'Lyon',
      'Marseille',
      'Bordeaux',
      'Lille',
      'Montpellier',
      'Toulouse',
      'Nice',
    ],
    Greece: [
      'Athens',
      'Thessaloniki',
      'Patras',
      'Heraklion',
      'Rhodes',
      'Ioannina',
    ],
    Netherlands: [
      'Amsterdam',
      'Rotterdam',
      'Utrecht',
      'Groningen',
      'Maastricht',
      'Eindhoven',
      'Leiden',
    ],
    Sweden: [
      'Stockholm',
      'Gothenburg',
      'Lund',
      'Uppsala',
      'Linköping',
      'Malmö',
      'Umeå',
    ],
    CzechRepublic: ['Prague', 'Brno', 'Ostrava'],
    Portugal: ['Lisbon', 'Porto', 'Coimbra', 'Braga', 'Aveiro', 'Faro'],
  };

  selectedGroups: CountryGroup[] = [];

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const countries = params['countries'] || [];
      this.selectedGroups = countries.map((country: string) => ({
        name: country,
        image: `/images/${country.replace(' ', '').toLowerCase()}.jpg`,
        cities: (this.allCities[country.replace(' ', '')] || []).map(
          (city) => ({
            id: `${country}-${city}`,
            name: city,
            selected: false,
          }),
        ),
      }));
    });
  }

  toggleCity(groupIndex: number, cityIndex: number) {
    const city = this.selectedGroups[groupIndex].cities[cityIndex];
    city.selected = !city.selected;
  }

  scroll(el: HTMLElement, distance: number) {
    el.scrollBy({
      left: distance,
      behavior: 'smooth',
    });
  }

  onNext() {
    const finalSelection = this.selectedGroups
      .map((g) => ({
        country: g.name,
        cities: g.cities.filter((c) => c.selected).map((c) => c.name),
      }))
      .filter((g) => g.cities.length > 0);

    console.log('Final Selection:', finalSelection);

    this.userService.currentUserProfile$.pipe(take(1)).subscribe((user) => {
      if (user) {
        this.userService
          .updateUser({
            ...user,
            groups: finalSelection,
          } as any)
          .subscribe({
            next: () => {
              console.log('Selection saved to Firestore!');
              this.router.navigate(['/']);
            },
            error: (err) => console.error('Error saving selection:', err),
          });
      }
    });
  }
}
