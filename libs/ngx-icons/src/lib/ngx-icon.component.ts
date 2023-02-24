import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  inject,
  Input,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgxIconsTypes } from './types';
import { NgxIconRegistryService } from './ngx-icon-registry.service';

@Component({
  selector: 'ngx-icon',
  standalone: true,
  imports: [CommonModule],
  template: ``,
  styleUrls: ['./ngx-icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxIconComponent {
  @HostBinding('innerHTML')
  private template?: SafeHtml;

  @HostBinding('attr.role')
  private role = 'img';

  @HostBinding('attr.aria-hidden')
  private ariaHidden = true;
  private lastKey: NgxIconsTypes | undefined;

  private readonly sanitizer = inject(DomSanitizer);

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private registry: NgxIconRegistryService
  ) {}

  @Input()
  set name(key: NgxIconsTypes) {
    this.lastKey = key;
    const icon = this.registry.get(key);
    if (!icon) {
      return;
    }
    this.template = this.sanitizer.bypassSecurityTrustHtml(icon);
  }

  @HostBinding('class')
  private get class() {
    return {
      'ngx-icon-outline': !!this.lastKey?.match(/outline/),
      'ngx-icon-solid': !!this.lastKey?.match(/solid/),
    };
  }
}
