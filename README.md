# 1. Teal Owl Project
The Teal Owl project is part of my master thesis in computer science at University of Bologna.
The goal of the project is to prototype a system that allows for tracking of textual media provenance, providing a way to verify the authenticity of the content and the authorship of the text.

## 1.1. Teal Owl components
- [Teal Owl Reader - Chrome Extension (this repository)](https://github.com/ale-ben/Teal-Owl_Reader)
- [Teal Owl Publisher - Google Workspace Add On](https://github.com/ale-ben/Teal-Owl_Publisher)
- [Teal Owl Contract - Smart Contract on Ethereum blockchain](https://github.com/ale-ben/Teal-Owl_Contract)
- [Teal Owl Watermarking - Core Watermarking logic used by Publisher and Reader](https://github.com/ale-ben/Teal-Owl_Watermarking)

## 1.2. Teal Owl Reader - Chrome Extension
Teal Owl Reader is the end user interface for the project.
This component is responsible for reading the information stored in the text, validating it, and displaying it to the user.

# 2. Table Of Contents
- [1. Teal Owl Project](#1-teal-owl-project)
	- [1.1. Teal Owl components](#11-teal-owl-components)
	- [1.2. Teal Owl Reader - Chrome Extension](#12-teal-owl-reader---chrome-extension)
- [2. Table Of Contents](#2-table-of-contents)
- [3. Installation and Usage](#3-installation-and-usage)
	- [3.1. Installation](#31-installation)
		- [3.1.1. MetaMask](#311-metamask)
		- [3.1.2. Teal Owl Reader](#312-teal-owl-reader)
	- [3.2. Usage](#32-usage)
- [4. Build](#4-build)
	- [4.1. Prerequisites](#41-prerequisites)
	- [4.2. Includes the following](#42-includes-the-following)
	- [4.3. Project Structure](#43-project-structure)
	- [4.4. Setup](#44-setup)
	- [4.5. Import as Visual Studio Code project](#45-import-as-visual-studio-code-project)
	- [4.6. Build](#46-build)
	- [4.7. Build in watch mode](#47-build-in-watch-mode)
		- [4.7.1. terminal](#471-terminal)
		- [4.7.2. Visual Studio Code](#472-visual-studio-code)
	- [4.8. Load extension to chrome](#48-load-extension-to-chrome)
	- [4.9. Test](#49-test)
- [5. References](#5-references)


# 3. Installation and Usage
## 3.1. Installation
### 3.1.1. MetaMask
Since the project relies on a blockchain to store the information, the user needs to have a wallet installed.

The first step is to install the MetaMask extension for Chrome. The extension can be found at the following link: https://metamask.io/download.html

Please note that, even thoug MetaMask is available for other browsers, the extension has been tested only on Chrome.

#### TODO: Metamask configuration

### 3.1.2. Teal Owl Reader
The second step is to install the Teal Owl Reader extension. The extension can be found at the following link: 
TODO: Link

## 3.2. Usage
To use the extension, you just have to navigate to the page you are interested in and click on the extension icon.

TODO: Usage

# 4. Build
In order to build the extension, you need to have Node.js installed.
The build process is managed by Webpack, which is configured to build the extension in the `dist` folder.

TODO: Build

## 4.1. Prerequisites

* [node + npm](https://nodejs.org/) (Current Version)


## 4.2. Includes the following

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

## 4.3. Project Structure

* src/typescript: TypeScript source files
* src/assets: static files
* dist: Chrome Extension directory
* dist/js: Generated JavaScript files

## 4.4. Setup

```
npm install
```

## 4.5. Import as Visual Studio Code project

...

## 4.6. Build

```
npm run build
```

## 4.7. Build in watch mode

### 4.7.1. terminal

```
npm run watch
```

### 4.7.2. Visual Studio Code

Run watch mode.

type `Ctrl + Shift + B`

## 4.8. Load extension to chrome

Load `dist` directory

## 4.9. Test
`npx jest` or `npm run test`

# 5. References
- [https://github.com/chibat/chrome-extension-typescript-starter](https://github.com/chibat/chrome-extension-typescript-starter)
