import {
  Component,
  EventEmitter,
  Input,
  Output,
  HostListener,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  X,
  Image,
  Tag,
  Smile,
  Globe,
} from 'lucide-angular';
import { PostService } from '../../../../core/services/post.service';

@Component({
  selector: 'app-community-create-post',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './community-create-post.component.html',
  styleUrls: ['./community-create-post.component.scss'],
})
export class CommunityCreatePostComponent {
  @Input() communityId: string = '';
  @Input() communityName: string = '';
  @Output() close = new EventEmitter<boolean>();

  readonly XIcon = X;
  readonly TagIcon = Tag;
  readonly GlobeIcon = Globe;
  readonly ImageIcon = Image;
  readonly SmileIcon = Smile;

  postContent = '';
  isTagMenuOpen = false;
  selectedTags: string[] = [];
  availableTags = ['Question', 'Event', 'Housing', 'Advice', 'Social'];

  constructor(
    private postService: PostService,
    private eRef: ElementRef,
  ) {}

  toggleTagMenu(event: Event): void {
    event.stopPropagation();
    this.isTagMenuOpen = !this.isTagMenuOpen;
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags = this.selectedTags.filter((t) => t !== tag);
    } else {
      this.selectedTags = [...this.selectedTags, tag];
    }
    this.isTagMenuOpen = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event: any) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isTagMenuOpen = false;
    }
  }

  submitPost(): void {
    if (this.postContent.trim()) {
      this.postService.createPost(
        this.postContent,
        this.communityId,
        this.selectedTags,
      );
      this.close.emit(true);
    }
  }

  closeModal(): void {
    this.close.emit(false);
  }
}
