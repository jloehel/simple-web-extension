[<img align="right" alt="logo" src="">](https://github.com/jloehel/simple-web-extension)
# simple-web-extension

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is a simple web extension for learning purpose. How to develop, test, package and publish cross-browser extensions.

## What is a web extension
Extensions can extend and modify the capability of a browser. This extension is built using the WebExtensions API, a cross-browser system for developing extensions.

## Supported browsers

  - [x] Firefox
  - [ ] Microsoft Edge
  - [ ] Chromium
  - [ ] Opera

## Dependencies
You need [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/) to build the plugin.

## Create the dev/test/build environment

    $ # Run npm install
    $ make init

## How to build the extension
The extension can be build by [webpack](https://webpack.js.org) and uses the
[webpack-webextension-plugin](https://github.com/webextension-toolbox/webpack-webextension-plugin).

    $ # Run webpack on your code and create the needed files in the folder addon.
    $ make source-build

## How to test the extension

### Manually
You always can try to load the extension manually in the browser of your choice. You can use [web-ext](https://github.com/mozilla/web-ext) to load the extension for tesing.

#### Firefox

    $ make moz-run

#### Chromium

    $ make chrome-run

### Automated
https://github.com/mdn/webextensions-examples/tree/master/mocha-client-tests


## How to publish the extension
TODO


## How to install the extension
TODO
