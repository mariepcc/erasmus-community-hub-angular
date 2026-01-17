// src/app/shared/components/chat-widget/chat-widget.component.ts
import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  // Zamknij przy kliknięciu poza widget
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.chat-widget');
    const clickedButton = target.closest('.action-btn');
    
    if (this.isOpen && !clickedInside && !clickedButton) {
      this.close.emit();
    }
  }
}