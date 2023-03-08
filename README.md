![Alt banner](./banner.png?raw=true 'NgxIcons')

# NgxIcons

## Bring Your Own Icons to Angular with Ease

Are you tired of relying on the same old icons in your Angular projects? Look no further than NgxIcons! This package
allows you to easily use your own custom icons in your Angular applications.
[Check out this demo](https://vonlof.github.io/ngx-icons/) to see what NgxIcons can do for you.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Configure icon generator](#configure-icon-generator)
  - [Use ngx-icon component](#use-ngx-icon-component)
- [Contributing](#contributing)
- [License](#license)

## Installation

Getting started with NgxIcons is a breeze. Simply run the following commands:

```sh
  npm install @vonlof/ngx-icons
  npm install --save-dev @vonlof/generate-icons
```

Or, if you prefer yarn:

```sh
  yarn add @vonlof/ngx-icons
  yarn add -D @vonlof/generate-icons
```

For more detailed information about these two packages go to:

- [@vonlof/ngx-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/ngx-icons/README.md)
- [@vonlof/generate-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/generate-icons/README.md)

## Usage

### Configure icon generator

The icons generator is used to optimize SVG files, and to generate typescript files (or a barrel).
These icons can then be consumed (typed) by the `ngx-icon` component.

For example create a folder named ./app/src/icons (you can choose any directory you like), add a base config file (such
as app/src/icons/.base-iconrc.json) with the following contents:

```json
{
  "srcPath": "./app/src/icons/svg",
  "outputPath": "./app/src/icons/generated",
  "barrel": false,
  "svgoConfig": {
    "plugins": [
      {
        "name": "preset-default"
      }
    ]
  }
}
```

_For the svgo configuration please check out the [svgo documentation](https://github.com/svg/svgo)._

Add your desired SVG's to the app/src/icons/svg folder. Then, simply run:

```sh
generate-icons --config app/src/icons/.base-iconrc.json
```

This will optimize your SVG files and converts them to TypeScript files, making them even easier to work with.
For more detailed instructions, see the documentation
for [@vonlof/generate-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/generate-icons/README.md).

#### (Optionally)

_If you have a project as a monorepo (f.e. with Nx), I would suggest to create a typescript icons library. And add
your icons there, so that it could be shared._

_Then in your project.json add the following in the target:_

```
...
  "generate-icons": {
    "executor": "nx:run-commands",
    "options": {
      "command": "generate-icons --config libs/icons/src/lib/.base-iconrc.json"
    }
  }
...
```

### Use ngx-icon component

With everything set up, it's time to add the NgxIconComponent. There are two ways to use this component, import it as
module, or use it as a standalone component.

#### Module

You can provide the options for you icons with `forRoot()` or with a provider:

```typescript
import { NgxIconModule, provideIconOptions } from '@vonlof/ngx-icons';
import { myAwesomeMissingIcon, myAwesomeGlobalIcon } from './my-icons';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxIconModule.forRoot({
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
  imports: [NgxIconModule.forChild([myAwesomeLazyIcon])],
})
export class LazyLoadedModule {}
```

#### Standalone

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

For more info about this lib, please go
to [@vonlof/ngx-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/ngx-icons/README.md)

## Issues

Please if you have any issues or you think something should be totally different. Then create an issue, I will try
respond as soon as possible.

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE)
