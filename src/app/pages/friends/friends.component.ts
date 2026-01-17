import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import routera
import { LucideAngularModule, Users, UserPlus, Search, Eye, MessageSquare } from 'lucide-angular';

@Component({
  selector: 'app-friends',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.scss']
})
export class FriendsComponent {
  readonly UsersIcon = Users;
  readonly UserPlusIcon = UserPlus;
  readonly SearchIcon = Search;
  readonly EyeIcon = Eye;
  readonly MessageIcon = MessageSquare;

  friends: any[] = [
    { id: 1, name: 'Sarah Johnson', location: 'Madrid, Spain', avatar: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Mike Chen', location: 'Barcelona, Spain', avatar: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Emma Wilson', location: 'Paris, France', avatar: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Alex Martinez', location: 'Rome, Italy', avatar: 'https://i.pravatar.cc/150?img=4' }
  ];

  constructor(private router: Router) {}

  navigateToProfile(friendId: number): void {
    // Możesz tu przekazać ID, by wyświetlić konkretny profil
    this.router.navigate(['/my-profile']); 
  }
}