import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, Lock, ArrowRight, Plane } from 'lucide-angular';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly ArrowRightIcon = ArrowRight;
  readonly PlaneIcon = Plane;
}