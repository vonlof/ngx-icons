![Alt banner](https://raw.githubusercontent.com/vonlof/ngx-icons/main/banner.png 'NgxIcons')

# NgxIcons

## Bring your own icons to Angular with Ease

Are you tired of relying on the same old icons in your Angular projects? Look no further than NgxIcons! This package
allows you to easily use your own custom icons in your Angular applications.
[Check out this demo](https://vonlof.github.io/ngx-icons/) to see what NgxIcons can do for you.

For a quick start please go [here](https://github.com/vonlof/ngx-icons)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Use as module](#use-as-module)
  - [Use as standalone](#use-as-standalone)
  - [Component](#component)
  - [Inputs](#inputs)

## Installation

Getting started with NgxIcons is a breeze. Simply run the following command:

Note: I strongly suggest to install the [@vonlof/generate-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/generate-icons/README.md) first before you use this package.

```sh
  npm install @vonlof/ngx-icons
```

Or, if you prefer yarn:

```sh
  yarn add @vonlof/ngx-icons
```

## Usage

There are two ways to use this component, Import it as module, or use it as a standalone.

### Use as module

You can provide the options for you icons with `forRoot()` or with a provider:

```typescript
import { NgxIconModule, provideIconOptions } from '@vonlof/ngx-icons';
import { myAwesomeMissingIcon, myAwesomeGlobalIcon } from './my-icons';

@NgModule({
  declarations: [AppComponent],

  // 1. Use with forRoot()
  imports: [
    BrowserModule,
    NgxIconModule.forRoot({
      missingIcon: myAwesomeMissingIcon,
      icons: [myAwesomeGlobalIcon],
    }),
  ],

  // 2. Or directly with a provider
  providers: [
    provideIconOptions({
      missingIcon: myAwesomeMissingIcon,
      icons: [myAwesomeGlobalIcon],
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

And then for lazy loaded modules add your icons like so:

```typescript
import { NgxIconModule, provideIcons } from '@vonlof/ngx-icons';
import { myAwesomeLazyIcon } from './my-icons';

@NgModule({
  declarations: [LazyComponent],

  // 1. Use with forChild()
  imports: [NgxIconModule.forChild([myAwesomeLazyIcon])],

  // 2. Or directly with a provider
  providers: [provideIcons([myAwesomeLazyIcon])],
})
export class LazyLoadedModule {}
```

### Use as standalone

Set icon options in main.ts

```typescript
import { NgxIconModule, provideIconOptions } from '@vonlof/ngx-icons';
import { myAwesomeMissingIcon, myAwesomeGlobalIcon } from './my-icons';

bootstrapApplication(AppComponent, {
  providers: [
    provideIconOptions({
      missingIcon: myAwesomeMissingIcon,
      icons: [myAwesomeGlobalIcon],
    }),
  ],
});
```

To lazy load icons add the following to your routes, for example:

```typescript
import { NgxIconModule, provideIcons } from '@vonlof/ngx-icons';
import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'lazy',
    loadComponent: () =>
      import('./lazy/lazy.component').then((c) => c.LazyComponent),
    providers: [provideIcons([myAwesomeLazyIcon])],
  },
];
```

### Component

Use the component like so:

```html
<ngx-icon name="my-awesome-icon"></ngx-icon>
```

To change the size color etc. Just use classes/style directly on the component. F.e. with tailwindCSS:

```html
<ngx-icon name="my-awesome-icon" class="h-12 text-blue-500"></ngx-icon>
```

### Inputs

```
@Input() name: NgxIconsTypes;
```

NgxIconsTypes are the types located in `node_modules/@vonlof/ngx-icons/lib/types.d.ts`. These types wil be updated/generated if you use `@vonlof/generate-icons`
