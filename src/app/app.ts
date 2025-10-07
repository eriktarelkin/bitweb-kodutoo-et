import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastComponent, Toast } from './Components/Toast/toast.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class AppComponent {
  toasts = signal<Toast[]>([]);
  private nextId = 0;

  /** Kasutan hetkel iconit kui booleani. Kasutaks string'i kui tuleks suurem vajadus selle jaoks. */
  showToast(title: string, description: string, type: Toast['type'] = 'primary', duration = 3000, icon: boolean) {
    const id = this.nextId++;
    const toast: Toast = {
      id,
      title,
      description,
      type,
      icon,
      showClose: true,
    };

    this.toasts.update((list) => [...list, toast]);

    setTimeout(() => {
      this.removeToast(id);
    }, duration);
  }

  removeToast(id: number) {
    this.toasts.update((list) => list.filter((t) => t.id !== id));
  }

  showPrimary(title: string, description: string, duration?: number) {
    this.showToast(title, description, 'primary', duration, false);
  }

  showSuccess(title: string, description: string, duration?: number) {
    this.showToast(title, description, 'success', duration, false);
  }

  showWarning(title: string, description: string, duration?: number) {
    this.showToast(title, description, 'warning', duration, true);
  }

  showDanger(title: string, description: string, duration?: number) {
    this.showToast(title, description, 'danger', duration, true);
  }
}
