import { ChangeDetectionStrategy, Component } from '@angular/core';
import * as DemoIcons from '../../icons/generated';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconsComponent {
  icons = Object.values(DemoIcons).filter(
    (icon) => !['logo-github-mark', 'logo-npm'].includes(icon.name)
  );
}
