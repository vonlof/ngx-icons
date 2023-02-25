import { Component } from '@angular/core';
import * as DemoIcons from '../icons/generated/index';

@Component({
  selector: 'ngx-icons-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  icons = Object.values(DemoIcons).filter((icon) => icon.name !== 'logo-github-mark');
}
