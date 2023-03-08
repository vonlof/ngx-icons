import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as DemoIcons from '../../icons/generated';
import { NgxIconComponent } from '@vonlof/ngx-icons';

@Component({
  selector: 'app-standalone-icons',
  standalone: true,
  imports: [CommonModule, NgxIconComponent],
  templateUrl: './standalone-icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StandaloneIconsComponent {
  icons = Object.values(DemoIcons).filter(
    (icon) => !['logo-github-mark', 'logo-npm'].includes(icon.name)
  );
}
