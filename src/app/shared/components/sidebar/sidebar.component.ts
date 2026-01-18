import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Home, User, Users, Plus, ChevronRight } from 'lucide-angular';

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
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() isOpen = false; 
  
  readonly HomeIcon = Home;
  readonly UserIcon = User;
  readonly UsersIcon = Users;
  readonly PlusIcon = Plus;
  readonly ChevronRightIcon = ChevronRight;

  countries: Country[] = [
    {
      code: 'ES',
      name: 'Spain',
      isExpanded: false,
      cities: [
        { name: 'Madrid', memberCount: '1.2k' },
        { name: 'Barcelona', memberCount: '980' },
        { name: 'Valencia', memberCount: '450' }
      ]
    },
    {
      code: 'FR',
      name: 'France',
      isExpanded: false,
      cities: [
        { name: 'Paris', memberCount: '1.5k' },
        { name: 'Lyon', memberCount: '620' },
        { name: 'Marseille', memberCount: '530' }
      ]
    },
    {
      code: 'IT',
      name: 'Italy',
      isExpanded: false,
      cities: [
        { name: 'Rome', memberCount: '890' },
        { name: 'Milan', memberCount: '750' },
        { name: 'Florence', memberCount: '420' }
      ]
    },
    {
      code: 'DE',
      name: 'Germany',
      isExpanded: false,
      cities: [
        { name: 'Berlin', memberCount: '1.1k' },
        { name: 'Munich', memberCount: '680' },
        { name: 'Hamburg', memberCount: '540' }
      ]
    }
  ];

  toggleCountry(countryCode: string): void {
    const country = this.countries.find(c => c.code === countryCode);
    if (country) {
      country.isExpanded = !country.isExpanded;
    }
  }
}