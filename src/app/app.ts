import { Component, ViewChild  } from '@angular/core';
import { ToastComponent } from './Components/Toast/toast.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})

export class AppComponent {
  @ViewChild('toast', { static: true }) toast!: ToastComponent;
  title = 'Toast component demo';

  showPrimary() { if (this.toast) this.toast.primary('Primary toast', 'This is the primary toast container!'); }
  showSuccess() { if (this.toast) this.toast.success('Success toast', 'This is the success toast container!'); }
  showWarning() { if (this.toast) this.toast.warning('Warning toast', 'This is the warning toast container!', 15000); }
  showDanger() { if (this.toast) this.toast.danger('Danger toast', 'This is the danger toast container.', 1000); }
}
