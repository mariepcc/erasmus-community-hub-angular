import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Send, MessageSquarePlus } from 'lucide-angular';

interface Message {
  text: string;
  type: 'sent' | 'received';
  time: string;
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  lastMsgTime: string;
  messages: Message[];
}

@Component({
  selector: 'app-chat-widget',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.scss']
})
export class ChatWidgetComponent {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  readonly XIcon = X;
  readonly SendIcon = Send;
  readonly MessageSquarePlusIcon = MessageSquarePlus;

  newMessage: string = '';

  contacts: Contact[] = [
    {
      id: 1,
      name: 'Julian Rivera',
      avatar: 'https://i.pravatar.cc/150?img=11',
      lastMsgTime: '11:02 AM',
      messages: [
        { text: 'Hey! Is your Erasmus in Madrid still going strong? 🇪🇸', type: 'received', time: '10:42 AM' },
        { text: 'Yes! Just sent you some photos of the lunch we had today.', type: 'sent', time: '10:45 AM' },
        { text: 'Those look amazing! I definitely need to visit you.', type: 'received', time: '11:02 AM' }
      ]
    },
    {
      id: 2,
      name: 'Elena Rossi',
      avatar: 'https://i.pravatar.cc/150?img=32',
      lastMsgTime: 'Yesterday',
      messages: [
        { text: 'The project is ready to ship! 🚀', type: 'received', time: '4:20 PM' },
        { text: 'Awesome, I will check the final build tonight.', type: 'sent', time: '4:45 PM' }
      ]
    },
    {
      id: 3,
      name: 'Marcus Chen',
      avatar: 'https://i.pravatar.cc/150?img=44',
      lastMsgTime: 'Monday',
      messages: [
        { text: 'Check the new UI designs.', type: 'received', time: '09:15 AM' },
        { text: 'Looks very clean, I like the sea-green accents!', type: 'sent', time: '10:00 AM' }
      ]
    }
  ];

  selectedContact: Contact = this.contacts[0];

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    setTimeout(() => this.scrollToBottom(), 10);
  }

  sendMessage() {
    if (this.newMessage.trim()) {
      const now = new Date();
      this.selectedContact.messages.push({
        text: this.newMessage,
        type: 'sent',
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
      this.newMessage = '';
      setTimeout(() => this.scrollToBottom(), 10);
    }
  }

  private scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) {}
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (this.isOpen && !target.closest('.chat-widget') && !target.closest('.action-btn')) {
      this.close.emit();
    }
  }
}