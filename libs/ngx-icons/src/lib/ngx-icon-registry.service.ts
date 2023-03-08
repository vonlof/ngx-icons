import { inject, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { NgxIcon, NgxIconOptions } from './ngx-icon.interface';
import { ICON_OPTIONS } from './providers';

@Injectable({
  providedIn: 'root',
})
export class NgxIconRegistryService {
  private readonly svgMap = new Map<string, string>();
  private readonly renderer: Renderer2;
  private readonly config: NgxIconOptions = inject(ICON_OPTIONS);

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
    this.configure();
  }

  get(name: string): string | undefined {
    const icon = this.svgMap.get(name);
    if (!icon) {
      console.warn(`Icon ${name} does not exist`);
      return this.config.missingIcon?.name
        ? this.svgMap.get(`${this.config.missingIcon.name}`)
        : undefined;
    }
    return icon;
  }

  /**
   * Register icons
   */
  register(icons: NgxIcon[]) {
    icons.forEach(({ name, data }) => {
      if (!this.svgMap.has(name)) {
        const svg = this.updateSVGAttributesAndReturn(name, data);
        this.svgMap.set(name, svg);
      }
    });
  }

  /**
   * Update attributes for the new cached svg in the registry
   */
  private updateSVGAttributesAndReturn(name: string, data: string): string {
    const svg = this.convertSVGStringToElement(data);
    this.renderer.setAttribute(svg, 'fit', '');
    this.renderer.setAttribute(svg, 'height', '100%');
    this.renderer.setAttribute(svg, 'width', '100%');
    this.renderer.setAttribute(svg, 'preserveAspectRatio', 'xMidYMid meet');
    this.renderer.setAttribute(svg, 'focusable', 'false');
    this.renderer.setAttribute(svg, 'aria-label', `${name}-icon`);
    return svg.outerHTML;
  }

  /**
   * Convert string to svg element
   */
  private convertSVGStringToElement(data: string): SVGElement {
    const div = this.renderer.createElement('div');
    div.innerHTML = data;
    return div.querySelector('svg') as SVGElement;
  }

  /**
   * Initialize the service by registering icons/missing icon from the config
   */
  private configure() {
    if (this.config?.icons) {
      this.register(this.config.icons);
    }

    if (this.config?.missingIcon) {
      this.register([this.config.missingIcon]);
    }
  }
}
