import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  onLogin() {
    console.log('Login attempt:', {
      email: this.email,
      password: this.password
    });
    // Tutaj dodasz logikę logowania
  }

  onForgotPassword() {
    console.log('Forgot password clicked');
    // Tutaj dodasz logikę resetowania hasła
  }

  onSignUp() {
    console.log('Sign up clicked');
    // Tutaj dodasz nawigację do rejestracji
  }
}