import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { NgxIconModule } from '@vonlof/ngx-icons';
import {
  logoGithubMark,
  logoNpm,
  outlineClipboard,
  outlineDocumentCheck,
  solidChevronRight,
  staticLogo,
} from '../icons/generated';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxIconModule.forRoot({
      icons: [
        staticLogo,
        logoNpm,
        logoGithubMark,
        solidChevronRight,
        outlineClipboard,
        outlineDocumentCheck,
      ],
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
