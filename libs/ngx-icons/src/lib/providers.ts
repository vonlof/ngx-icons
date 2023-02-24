/* istanbul ignore file */

import { ENVIRONMENT_INITIALIZER, inject, InjectionToken } from '@angular/core';
import {NgxIcon, NgxIconOptions} from './ngx-icon.interface';
import { NgxIconRegistryService } from './ngx-icon-registry.service';

export const ICON_OPTIONS = new InjectionToken<NgxIconOptions>('ICON_OPTIONS', {
  providedIn: 'root',
  factory() {
    return {} as NgxIconOptions;
  },
});

export function provideIcons(icons: NgxIcon[]) {
  return {
    provide: ENVIRONMENT_INITIALIZER,
    multi: true,
    useValue() {
      inject(NgxIconRegistryService).register(icons);
    },
  };
}

export function provideIconOptions(options: Partial<NgxIconOptions>) {
  return {
    provide: ICON_OPTIONS,
    useValue: options,
  };
}
