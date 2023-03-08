import { Routes } from '@angular/router';
import { provideIcons } from '@vonlof/ngx-icons';
import * as DemoIcons from '../icons/generated';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./module/icons.module').then((m) => m.IconsModule),
      },
      {
        path: 'standalone',
        loadComponent: () =>
          import('./standalone/standalone-icons.component').then(
            (c) => c.StandaloneIconsComponent
          ),
        providers: [provideIcons(Object.values(DemoIcons))],
      },
    ],
  },
];
