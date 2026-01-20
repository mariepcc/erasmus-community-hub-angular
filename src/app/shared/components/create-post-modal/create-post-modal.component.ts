import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  LucideAngularModule,
  X,
  Image,
  Smile,
  ChevronDown,
  Globe,
  Tag,
} from 'lucide-angular';
import { PostService } from '../../../core/services/post.service';

@Component({
  selector: 'app-create-post-modal',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.scss'],
})
export class CreatePostModalComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  readonly XIcon = X;
  readonly ImageIcon = Image;
  readonly SmileIcon = Smile;
  readonly ChevronDownIcon = ChevronDown;
  readonly GlobeIcon = Globe;
  readonly TagIcon = Tag;

  postContent = '';
  currentUser: any = null;
  selectedTags: string[] = [];
  availableTags = ['Question', 'Event', 'Housing', 'Advice', 'Social'];

  selectedCommunity: any = null;
  communities = [
    { id: 'public', name: 'Public', isPublic: true },
    {
      id: 'es-mad',
      name: 'Madrid Erasmus',
      image: 'https://hatscripts.github.io/circle-flags/flags/es.svg',
    },
    {
      id: 'pl-war',
      name: 'Warsaw Students',
      image: 'https://hatscripts.github.io/circle-flags/flags/pl.svg',
    },
  ];

  constructor(private postService: PostService) {
    this.selectedCommunity = this.communities[0];
  }

  ngOnInit(): void {}

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
  }

  createPost(): void {
    const trimmed = this.postContent.trim();
    if (trimmed && this.selectedCommunity) {
      this.postService.createPost(
        trimmed,
        this.selectedCommunity.id,
        this.selectedTags,
      );
      this.onClose();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
