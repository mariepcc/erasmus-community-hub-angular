// ===================================== 
// src/app/shared/components/sidebar/sidebar.component.ts
// =====================================
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommunityService } from '../../../core/services/community.service';
import { Country } from '../../../core/models/community.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  countries: Country[] = [];

  constructor(private communityService: CommunityService) {}

  ngOnInit(): void {
    this.communityService.getCountries().subscribe(
      countries => this.countries = countries
    );
  }

  toggleCountry(countryCode: string): void {
    this.communityService.toggleCountry(countryCode);
  }
}