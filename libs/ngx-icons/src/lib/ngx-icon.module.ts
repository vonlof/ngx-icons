import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideIconOptions, provideIcons } from './providers';
import { NgxIcon, NgxIconOptions } from './ngx-icon.interface';
import { NgxIconComponent } from './ngx-icon.component';

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
