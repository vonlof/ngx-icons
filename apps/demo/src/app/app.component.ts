import { Component } from '@angular/core';

interface NpmInstall {
  value: string;
  copied: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  npmInstalls: NpmInstall[] = [
    {
      value: 'npm install @vonlof/ngx-icons',
      copied: false,
    },
    {
      value: 'npm install --save-dev @vonlof/generate-icons',
      copied: false,
    },
  ];

  copyClipboard(install: NpmInstall) {
    this.npmInstalls.forEach((install) => (install.copied = false));
    install.copied = true;

    /* istanbul ignore next */
    const listener = (e: ClipboardEvent) => {
      e.clipboardData?.setData('text/plain', install.value);
      e.preventDefault();
    };

    document.addEventListener('copy', listener);
    document.execCommand('copy');
    document.removeEventListener('copy', listener);
  }
}
