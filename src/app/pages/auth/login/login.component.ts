import { Component, inject } from '@angular/core';
import {
  FormsModule,
  Validators,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-login',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styles: '',
})
export class LoginComponent {
  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  router: Router = inject(Router);
  form = this.fb.nonNullable.group({
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: ['', Validators.required],
  });

  onSubmit(): void {
    const rawForm = this.form.getRawValue();
    this.authService.login(rawForm.email, rawForm.password).subscribe({
      next: () => {
        console.log('Login successful!');
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        this.error = true;
        console.error('Email/Password Sign-In error:', error);
      },
    });
  }

  guestLogin(): void {
    const values = { email: 'guest@mail.uk', password: 'fake_password' };
    this.form.patchValue(values);
    const subscription = this.form.valueChanges.subscribe(() => {
      if (this.form.valid) {
        subscription.unsubscribe();
        this.onSubmit();
      }
    });
  }
  /*
  async onGoogleSignIn(): Promise<void> {
  try {
    await this.authService.googleLogin();
    this.router.navigateByUrl('/main');
  } catch (error) {
    console.error('Google Sign-In error:', error);
  }
}


async googleLogin(): Promise<void> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(this.firebaseAuth, provider);
    const user = result.user;
    if (!user) {
      throw new Error('Google-Login error');
    }
  } catch (error) {
    console.error('Google-Login error:', error);
    throw error;
  }
}
*/

  onForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }

  onSignUp() {
    this.router.navigate(['/register']);
  }
}
