# Generate icons

The icons generator is used to optimize SVG files, and to generate typescript files (or a barrel).
These icons can then be consumed (typed) by the `ngx-icon` component, go here more info
about [@vonlof/ngx-icons](https://github.com/vonlof/ngx-icons/blob/main/libs/ngx-icons/README.md).

For a quick start please go [here](https://github.com/vonlof/ngx-icons)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Setup generator](#setup-generator)
  - [Run script](#run-script)
  - [Svgo config](#setup-generator)
- [Config](#config)

## Installation

Getting started with Generate icons is a breeze. Simply run one of the following commands:

```sh
  npm install --save-dev @vonlof/generate-icons
```

Or, if you prefer yarn:

```sh
  yarn add -D @vonlof/generate-icons
```

## Usage

### Setup generator

All you need to do is create a folder named ./app/src/icons (you can choose any
directory you like), add a base config file (such as app/src/icons/.base-iconrc.json) with the following contents:

```json
{
  "srcPath": "./app/src/icons/svg",
  "outputPath": "./app/src/icons/generated",
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

### Run script

Add your desired svg files to the app/src/icons/svg folder. Then, simply run:

```sh
generate-icons --config app/src/icons/.base-iconrc.json
```

This will improve your SVG files and convert them to TypeScript files, making them even easier to work with.

### Svgo config

To get full control over the behaviour of our svg optimizations, you could add a file .iconrc.json (you can change the
config name in base-iconrc.json with the overrideConfigName property) that will
override the base config. For example if you have the following folder structure we could override the svgo config:

```
app
  /src
    /icons
      - .base-iconrc.json
      - svg
        - static
          - .iconrc.json <--- overrides the .base-iconrc.json
          - logo
        - outline
          - .iconrc.json <--- overrides the .base-iconrc.json
          - chevron-right.svg
        - solid
      - generated

```

As an example if you look at `app/src/icons/svg/outline/.iconrc.json`, and our base config removes the stroke
attr from a svg. For our outline icons we still want to keep the stroke, but we want to remove the fill. So we could
write something like this.

```json
{
  "prefix": "outline",
  "svgoConfig": {
    "plugins": [
      {
        "name": "removeAttrs",
        "params": {
          "attrs": ["stroke", "fill", "color", "width", "height"]
        }
      },
      {
        "name": "addAttributesToSVGElement",
        "params": {
          "attribute": {
            "fill": "none",
            "stroke": "currentColor"
          }
        }
      }
    ]
  }
}
```

This is just a small example, but please check the demo in the repo to fully understand this behaviour.
Now run the script again, it should generate/optimize the icons differently.

## Config

The following properties can be added to the .base-iconrc.json and the overridable .iconrc.json.

| key                | type    | default        | description                                                                                 |
| ------------------ | ------- | -------------- | ------------------------------------------------------------------------------------------- |
| srcPath            | string  | required\*     | The path where svg icons are located                                                        |
| outputPath         | string  | required\*     | The path where typescript icon files/barrel should be generated                             |
| barrel             | boolean | false          | If the output should be an index.ts barrel file or seperated files                          |
| prefix             | string  | -              | Add prefix to the output icon file names f.e. ${prefix}ChevronDown - #{prefix}-chevron-down |
| suffix             | string  | -              | Add suffix to the output icon file names f.e. chevronDown${suffix} - chevron-down-${suffix} |
| overrideConfigName | string  | .iconrc.json   | The file name to override the config in a sub directory                                     |
| svgoConfig         | object  | default-preset | Please check the [svgo documentation](https://github.com/svg/svgo).                         |
