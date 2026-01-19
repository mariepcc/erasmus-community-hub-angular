import { Component, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef, OnInit, Inject, PLATFORM_ID, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X, Send, MessageSquarePlus, ArrowLeft } from 'lucide-angular';

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
export class ChatWidgetComponent implements OnInit, OnChanges {
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  readonly XIcon = X;
  readonly SendIcon = Send;
  readonly MessageSquarePlusIcon = MessageSquarePlus;
  readonly ArrowLeftIcon = ArrowLeft;

  newMessage: string = '';
  showChatMain = false;
  isMobileView = false;

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
        { text: 'The project is ready to ship! 🚀', type: 'received', time: '4:20 PM' }
      ]
    }
  ];

  selectedContact: Contact = this.contacts[0];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (isPlatformBrowser(this.platformId) && changes['isOpen']) {
      this.toggleBodyScroll(changes['isOpen'].currentValue);
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobileView = window.innerWidth <= 768;
      if (!this.isMobileView) {
        this.showChatMain = true;
      }
    }
  }

  private toggleBodyScroll(disable: boolean) {
    if (disable) {
      this.renderer.addClass(document.body, 'no-scroll');
    } else {
      this.renderer.removeClass(document.body, 'no-scroll');
    }
  }

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    if (this.isMobileView) {
      this.showChatMain = true;
    }
    setTimeout(() => this.scrollToBottom(), 10);
  }

  toggleMobileView() {
    this.showChatMain = false;
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
    if (isPlatformBrowser(this.platformId) && this.scrollContainer) {
      try {
        this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
      } catch(err) {}
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const target = event.target as HTMLElement;
    if (this.isOpen && !target.closest('.chat-widget') && !target.closest('.action-btn') && !target.closest('.send-btn')) {
      this.close.emit();
    }
  }
}