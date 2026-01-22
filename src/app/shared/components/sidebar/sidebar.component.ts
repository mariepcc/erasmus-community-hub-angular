import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LucideAngularModule,
  Home,
  User,
  Users,
  Plus,
  ChevronRight,
} from 'lucide-angular';
import { UserService } from '../../../core/services/user.service';
import { map } from 'rxjs';

interface City {
  name: string;
  memberCount: string;
}

interface Country {
  code: string;
  name: string;
  cities: City[];
  isExpanded: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Input() isOpen = false;

  private userService = inject(UserService);

  readonly HomeIcon = Home;
  readonly UserIcon = User;
  readonly UsersIcon = Users;
  readonly PlusIcon = Plus;
  readonly ChevronRightIcon = ChevronRight;

  COUNTRY_ISO_MAP: Record<string, string> = {
    Poland: 'pl',
    Spain: 'es',
    Italy: 'it',
    Germany: 'de',
    France: 'fr',
    Netherlands: 'nl',
    Portugal: 'pt',
    Sweden: 'se',
    'Czech Republic': 'cz',
    Greece: 'gr',
    Turkey: 'tr',
    Austria: 'at',
    Belgium: 'be',
  };

  countries: Country[] = [];

  ngOnInit(): void {
    this.userService.currentUserProfile$
      .pipe(
        map((user) => {
          if (!user || !user.groups) return [];

          return user.groups.map((dest: any) => ({
            code: this.COUNTRY_ISO_MAP[dest.country] || 'eu',
            name: dest.country,
            isExpanded: false,
            cities: dest.cities.map((cityName: string) => ({
              name: cityName,
              memberCount: '0',
            })),
          }));
        }),
      )
      .subscribe((mappedCountries) => {
        this.countries = mappedCountries;
      });
  }

  toggleCountry(name: string): void {
    const country = this.countries.find((c) => c.name === name);
    if (country) {
      this.countries.forEach((c) => {
        if (c.name !== name) c.isExpanded = false;
      });
      country.isExpanded = !country.isExpanded;
    }
  }
}
