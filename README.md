
[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

# NgxIcons: Bring Your Own Icons to Angular with Ease

Are you tired of relying on the same old icons in your Angular projects? Look no further than NgxIcons! Our
straightforward package allows you to easily use your own custom icons in your Angular applications.

[Check out this demo](https://vonlof.github.io/ngx-icons/) to see what NgxIcons can do for you.

## Getting Started

### Installation

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

### Configure icon generator

Configuring NgxIcons couldn't be easier. All you need to do is create a folder named ./app/src/icons (you can choose any
directory you like), add a base config file (such as app/src/icons/.iconrc.json) with the following contents:

```json
{
  "srcPath": "./apps/demo/src/icons/svg",
  "outputPath": "./apps/demo/src/icons/generated",
  "barrel": false,
  "svgoConfig": {
    "plugins": [
      {
        "name": "preset-default"
      },
      {
        "name": "removeAttrs",
        "params": {
          "attrs": ["fill", "color", "width", "height"]
        }
      },
      {
        "name": "addAttributesToSVGElement",
        "params": {
          "attribute": {
            "fill": "currentColor"
          }
        }
      }
    ]
  }
}
```
_For the svgo configuration please checkout the [svgo documentation](https://github.com/svg/svgo)._

Add your desired SVG to the app/src/icons/svg folder. Then, simply run:

```sh
generate-icons --config app/src/icons/.iconrc.json
```

This will improve your SVG files and convert them to TypeScript files, making them even easier to work with.
For more detailed instructions, see the documentation for [@vonlof/generate-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/generate-icons/README.md).

### Add Icons with NgxIconComponent

With everything set up, it's time to add the NgxIconComponent! Choose whether you want to lazy load your icons, and add them to your component or module. For example:

```typescript
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, NgxIconComponent],
  bootstrap: [AppComponent],
  providers: [
    provideIconOptions({
      icons: [outlineArrowDown, outlineArrowUp],
    }),
  ],
})
export class AppModule {}
```

The simply use it as follows:

```html 
<ngx-icon name="outline-arrow-down"></ngx-icon>
<ngx-icon name="outline-arrow-up"></ngx-icon>
```

For more info about this lib, please go
to [@vonlof/ngx-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/ngx-icons/README.md)
