import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


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

constructor(private router: Router) {}

  onLogin() {
    console.log('Login attempt:', {
      email: this.email,
      password: this.password
    });
  }

onForgotPassword() {
  this.router.navigate(['/forgot-password']);
}

  onSignUp() {
  this.router.navigate(['/register']);
}
}