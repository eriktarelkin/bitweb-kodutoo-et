import {
  Component,
  ChangeDetectionStrategy,
  ViewEncapsulation,
  input,
  output,
  computed,
} from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';

export type ToastType = 'primary' | 'success' | 'warning' | 'danger';
export type ToastTitleType = 'h1' | 'div';

export interface Toast {
  id: number;
  title?: string;
  description?: string;
  type: ToastType;
  icon?: boolean;
  showClose?: boolean;
}

@Component({
  standalone: true,
  selector: 'toast',
  imports: [CommonModule, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': 'classes()',
    '[attr.role]': "'status'",
  },
})

export class ToastComponent {
  toast = input<Toast>();
  remove = output<number>();

  classes = computed(() => {
    const t = this.toast();
    return `toast toast--${t?.type ?? 'primary'}`;
  });

  onClose() {
    const id = this.toast()?.id;
    if (id != null) this.remove.emit(id);
  }

  title = computed(() => this.toast()?.title ?? '');
  description = computed(() => this.toast()?.description ?? '');
  showClose = computed(() => !!this.toast()?.showClose);
}
