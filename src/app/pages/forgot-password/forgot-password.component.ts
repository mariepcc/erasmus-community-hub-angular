import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, ArrowRight, Plane, Key, Lock } from 'lucide-angular';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly ArrowRightIcon = ArrowRight;
  readonly PlaneIcon = Plane;
  readonly KeyIcon = Key;
}