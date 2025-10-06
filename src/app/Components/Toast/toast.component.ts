import { Component, NgZone, ChangeDetectorRef, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Toast {
  id: number;
  title: string;
  description: string;
  type: 'primary' | 'success' | 'warning' | 'danger';
  duration?: number;
}

@Component({
  selector: 'toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',  // or inline template
  styleUrls: ['./toast.component.css']    // or inline styles
})

export class ToastComponent {
  toasts: Toast[] = [];
  private nextId = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  show(title: string, description: string, type: Toast['type'], duration = 3000) {
    console.log('Showing toast:', { title, description, type, duration });
    const id = this.nextId++;
    const toast: Toast = { id, title, description, type, duration };
    this.toasts = [...this.toasts, toast];
 

    setTimeout(() => {
    this.toasts = this.toasts.filter(t => t.id !== id);  
    this.cdr.detectChanges();
    }, duration);
  }

  trackById(index: number, toast: Toast) {
    return toast.id;
  }

   removeToast(id: number) {
    this.toasts = this.toasts.filter(t => t.id !== id);
    this.cdr.detectChanges();
   }

  primary(title: string, description: string, duration?: number) {
    this.show(title, description, 'primary', duration);
  }
  success(title: string, description: string, duration?: number) {
    this.show(title, description, 'success', duration);
  }
  warning(title: string, description: string, duration?: number) {
    this.show(title, description, 'warning', duration);
  }
  danger(title: string, description: string, duration?: number) {
    this.show(title, description, 'danger', duration);
  }
}
