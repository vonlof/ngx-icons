import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgxIconComponent,
  provideIconOptions,
  provideIcons,
} from '@vonlof/ngx-icons';
import { NgxIcon, NgxIconOptions } from './ngx-icon.interface';

@NgModule({
  imports: [CommonModule, NgxIconComponent],
  exports: [NgxIconComponent],
})
export class NgxIconModule {
  static forRoot(options: NgxIconOptions): ModuleWithProviders<NgxIconModule> {
    return {
      ngModule: NgxIconModule,
      providers: [provideIconOptions(options)],
    };
  }

  static forChild(icons: Array<NgxIcon>): ModuleWithProviders<NgxIconModule> {
    return {
      ngModule: NgxIconModule,
      providers: [provideIcons(icons)],
    };
  }
}
