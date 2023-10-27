# Teal Owl Project
The Teal Owl project is part of my master thesis in computer science at University of Bologna.
The goal of the project is to prototype a system that allows for tracking of textual media provenance, providing a way to verify the authenticity of the content and the authorship of the text.

## Teal Owl components
- [Teal Owl Reader - Chrome Extension (this repository)](https://github.com/ale-ben/Teal-Owl_Reader)
- [Teal Owl Publisher - Google Workspace Add On](https://github.com/ale-ben/Teal-Owl_Publisher)
- [Teal Owl Contract - Smart Contract on Ethereum blockchain](https://github.com/ale-ben/Teal-Owl_Contract)
- [Teal Owl Watermarking - Core Watermarking logic used by Publisher and Reader](https://github.com/ale-ben/Teal-Owl_Watermarking)

## Teal Owl Reader - Chrome Extension
Teal Owl Reader is the end user interface for the project.
This component is responsible for reading the information stored in the text, validating it, and displaying it to the user.

# Installation and Usage
## Installation
### MetaMask
Since the project relies on a blockchain to store the information, the user needs to have a wallet installed.

The first step is to install the MetaMask extension for Chrome. The extension can be found at the following link: https://metamask.io/download.html

Please note that, even thoug MetaMask is available for other browsers, the extension has been tested only on Chrome.

#### TODO: Metamask configuration

### Teal Owl Reader
The second step is to install the Teal Owl Reader extension. The extension can be found at the following link: 
TODO: Link

## Usage
To use the extension, you just have to navigate to the page you are interested in and click on the extension icon.

TODO: Usage

# Build
In order to build the extension, you need to have Node.js installed.
The build process is managed by Webpack, which is configured to build the extension in the `dist` folder.

TODO: Build

## Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)


## Includes the following

* TypeScript
* Webpack
* React
* Jest
* Example Code
    * Chrome Storage
    * Options Version 2
    * content script
    * count up badge number
    * background

## Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## Setup

```
npm install
```

## Import as Visual Studio Code project

...

## Build

```
npm run build
```

## Build in watch mode

### terminal

```
npm run watch
```

### Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## Load extension to chrome

Load `dist` directory

## Test
`npx jest` or `npm run test`

# References
- [https://github.com/chibat/chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
