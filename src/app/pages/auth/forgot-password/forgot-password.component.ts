import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email: string = '';
  isEmailSent: boolean = false;
  showError: boolean = false;

  constructor(private router: Router) {}

  onSubmit() {

    if (!this.email || this.email.trim() === '') {
      this.showError = true;
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.showError = true;
      return;
    }

    this.showError = false;
    console.log('Password reset requested for:', this.email);
    this.isEmailSent = true;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}