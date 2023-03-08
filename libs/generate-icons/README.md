# Generate icons

## Getting Started

### Installation

Getting started with Generate icons is a breeze. Simply run one of the following commands:

```sh
  npm install --save-dev @vonlof/generate-icons
```

Or, if you prefer yarn:

```sh
  yarn add -D @vonlof/generate-icons
```

### Configure

All you need to do is create a folder named ./app/src/icons (you can choose any
directory you like), add a base config file (such as app/src/icons/.base-iconrc.json) with the following contents:

```json
{
  "srcPath": "./app/src/icons/svg",
  "outputPath": "./app/src/icons/generated",
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
generate-icons --config app/src/icons/.base-iconrc.json
```

This will improve your SVG files and convert them to TypeScript files, making them even easier to work with.
For more detailed instructions, see the documentation for [@vonlof/generate-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/generate-icons/README.md).
