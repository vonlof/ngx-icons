import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxIconComponent, provideIconOptions } from '@vonlof/ngx-icons';
import * as DemoIcons from '../icons/generated';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxIconComponent],
  bootstrap: [AppComponent],
  providers: [
    provideIconOptions({
      icons: Object.values(DemoIcons),
    }),
  ],
})
export class AppModule {}
