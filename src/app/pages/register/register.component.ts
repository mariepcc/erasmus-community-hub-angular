import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Mail, Lock, ArrowRight, Plane, User, Globe, School } from 'lucide-angular';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly ArrowRightIcon = ArrowRight;
  readonly PlaneIcon = Plane;
  readonly UserIcon = User;
  readonly GlobeIcon = Globe;
  readonly SchoolIcon = School;
}