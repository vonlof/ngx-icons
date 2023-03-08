## Description

@vonlof/ngx-icons is a custom icon library package for Angular applications. This package contains a component library for standalone components and normal module imports. It allows developers to easily add and customize icons within their Angular applications.

## Installation

To install @vonlof/ngx-icons, run the following command in your Angular project:

```shell
npm install @vonlof/ngx-icons
```

Usage
Import NgxIconsModule in your app module:

```typescript
import { NgModule } from '@angular/core';
import { NgxIconsModule } from '@vonlof/ngx-icons';

@NgModule({
  imports: [NgxIconsModule],
})
export class AppModule {}
```

Add icons to your templates using the ngx-icon component:

html

```html
<ngx-icon name="icon-name"></ngx-icon>
```

Customize the size and color of icons using input properties:

License
@vonlof/ngx-icons is released under the MIT License. See the LICENSE file for details.

Contributing
Contributions to @vonlof/ngx-icons are welcome! Please see the CONTRIBUTING file for guidelines.
