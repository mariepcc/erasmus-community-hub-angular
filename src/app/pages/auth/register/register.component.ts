import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Country {
  name: {
    common: string;
    official: string;
  };
  cca2: string;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  country: string = '';
  university: string = '';
  gender: string = 'male';
  bio: string = '';
  acceptTerms: boolean = false;
  receiveNotifications: boolean = false;
  profileImage: string = '';

  showEmailError: boolean = false;
  showFirstNameError: boolean = false;
  showLastNameError: boolean = false;

  countries: Country[] = [];
  isLoadingCountries: boolean = true;

  constructor(
    private router: Router,
    private http: HttpClient,
  ) {}

  ngOnInit() {
    this.loadCountries();
  }

  loadCountries() {
    this.isLoadingCountries = true;

    this.http
      .get<Country[]>('https://restcountries.com/v3.1/all?fields=name,cca2')
      .subscribe({
        next: (data) => {
          this.countries = data.sort((a, b) =>
            a.name.common.localeCompare(b.name.common),
          );
          this.isLoadingCountries = false;
        },
        error: (error) => {
          console.error('Błąd podczas pobierania krajów:', error);
          this.isLoadingCountries = false;
          this.countries = [
            {
              name: { common: 'Poland', official: 'Republic of Poland' },
              cca2: 'PL',
            },
            {
              name: {
                common: 'Germany',
                official: 'Federal Republic of Germany',
              },
              cca2: 'DE',
            },
            {
              name: { common: 'France', official: 'French Republic' },
              cca2: 'FR',
            },
            {
              name: { common: 'Spain', official: 'Kingdom of Spain' },
              cca2: 'ES',
            },
            {
              name: { common: 'Italy', official: 'Italian Republic' },
              cca2: 'IT',
            },
          ];
        },
      });
  }

  get isEmailValid(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  get passwordLength(): boolean {
    return this.password.length >= 8 && this.password.length <= 20;
  }

  get hasLetters(): boolean {
    return /[a-zA-Z]/.test(this.password);
  }

  get hasNumbers(): boolean {
    return /[0-9]/.test(this.password);
  }

  get hasNoSpaces(): boolean {
    return !/\s/.test(this.password);
  }

  get isPasswordValid(): boolean {
    return (
      this.passwordLength &&
      this.hasLetters &&
      this.hasNumbers &&
      this.hasNoSpaces
    );
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profileImage = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage() {
    this.profileImage = '';
  }

  onRegister() {
    this.showEmailError = false;
    this.showFirstNameError = false;
    this.showLastNameError = false;

    let hasErrors = false;

    if (!this.firstName || this.firstName.trim() === '') {
      this.showFirstNameError = true;
      hasErrors = true;
    }

    if (!this.lastName || this.lastName.trim() === '') {
      this.showLastNameError = true;
      hasErrors = true;
    }

    if (!this.email || this.email.trim() === '' || !this.isEmailValid) {
      this.showEmailError = true;
      hasErrors = true;
    }

    if (!this.isPasswordValid) {
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    console.log('Register attempt:', {
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      country: this.country,
      university: this.university,
      gender: this.gender,
      bio: this.bio,
      acceptTerms: this.acceptTerms,
      receiveNotifications: this.receiveNotifications,
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
