import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  LucideAngularModule,
  Mail,
  Lock,
  ArrowRight,
  Plane,
  User,
  Globe,
  School,
} from 'lucide-angular';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserService } from '../../../core/services/user.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly ArrowRightIcon = ArrowRight;
  readonly PlaneIcon = Plane;
  readonly UserIcon = User;
  readonly GlobeIcon = Globe;
  readonly SchoolIcon = School;

  error: boolean = false;
  fb: FormBuilder = inject(FormBuilder);
  authService: AuthService = inject(AuthService);
  userService: UserService = inject(UserService);
  router: Router = inject(Router);

  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
      ],
    ],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        ),
      ],
    ],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    country: ['', Validators.required],
    university: ['', Validators.required],
    gender: ['', Validators.required],
  });

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.form.invalid) {
      console.log('Formularz jest niepoprawny:', this.form.errors);
      return;
    }

    const values = this.form.getRawValue();
    const now = new Date();
    const month = now.toLocaleString('en-US', { month: 'short' });
    const year = now.getFullYear();
    const joinedDate = `${month} ${year}`;

    this.authService
      .register(values.email, values.username, values.password)
      .pipe(
        switchMap((userCredential) => {
          const uid = userCredential.user.uid;
          return this.userService.addUser({
            uid,
            email: values.email,
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            country: values.country,
            university: values.university,
            gender: values.gender,
            joinedDate: joinedDate,
            avatarUrl: '',
            coverUrl: '',
            bio: '',
          });
        }),
      )
      .subscribe({
        next: () => {
          this.router.navigate(['/country-selector']);
        },
        error: (err) => {
          this.error = true;
        },
      });
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
