# Web Extensions polyfill: `icons`

Web Extensions polyfill for the `icons` API.

The goal with this package is to implmenet a subset of the Web Extensions API that works for Chrome, Firefox, Safari and Edge.

This module will help you generate all neccessary icons from a single SVG source.

## Installation

```sh
npm install --save @wext/icons
```

## Usage

```js
const wextIcons = require('@wext/icons')

const source = '<svg viewBox="0 0 64 64"><rect x="10" ...'

console.log(wextIcons.extension(source, 'safari'))
//=> {
//   spec: {
//     '32': 'Icon-32.png',
//     '64': 'Icon-64.png',
//     ...
//   },
//   files: [
//     { name: 'Icon-32.png', data: Buffer < ... > },
//     { name: 'Icon-64.png', data: Buffer < ... > },
//     ...
//   ]
// }

console.log(wextIcons.extension(source, 'chrome', { shape: 'circle' }))
//=> {
//   spec: {
//     48: 'icon-48.png',
//     96: 'icon-96.png',
//     ...
//   },
//   files: [
//     { size: 48, data: Buffer < ... >, name: 'icon-48.png' },
//     { size: 96, data: Buffer < ... >, name: 'icon-96.png' },
//     ...
//   ]
// }

console.log(wextIcons.action(source, 'firefox'))
//=> {
//   spec: {
//     32: 'action.svg'
//   },
//   files: [
//     { name: 'action.svg', data: Buffer < ... > }
//   ]
// }

console.log(wextIcons.action(source, 'edge'))
//=> {
//   spec: {
//     20: 'action.svg',
//     25: 'action.svg',
//     ...
//   },
//   files: [
//     { name: 'action-20.png', data: Buffer < ... > },
//     { name: 'action-25.png', data: Buffer < ... > },
//     ...
//   ]
// }
```

## Sizes

### Extension icon (`icons`)

| Browser | Canvas Sizes | Content Size | Notes |
| ------- | :---------: | :----------: | :-------- |
| Chrome | `48`, `96`, `128`, `256` | `87.5%` | (circle) |
| Chrome | `48`, `96`, `128`, `256` | `75%` | (square) |
| Edge | `44`, `48`, `50`, `128`, `150`, `176` | | |
| Firefox | SVG 🎉 | | |
| Opera | `48`, `96`, `128`, `256` | | |
| Safari | `32`, `48`, `64`, `96`, `128` | | (must be named `Icon-SIZE.png`) |

### Action icon (`browser_action.default_icon`)

| Browser | Sizes | Notes |
| ------- | ----- | ----- |
| Chrome | `16`, `32` | |
| Edge | `20`, `25`, `30`, `40` | |
| Firefox | SVG 🎉 | |
| Opera | `16`, `32` | |
| Safari | `16`, `32` | (only alpha is used) |
