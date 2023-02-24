import { Component } from '@angular/core';
import * as DemoIcons from '../icons/generated/index';

@Component({
  selector: 'ngx-icons-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        @apply block min-h-screen bg-gray-900;
      }
    `,
  ],
})
export class AppComponent {
  icons = Object.values(DemoIcons).filter((icon) => icon.name !== 'logo-github-mark');
}
