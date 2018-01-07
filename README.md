# Sweden Prayer Times

[![Latest Stable Version](https://img.shields.io/npm/v/sweden-prayer-times.svg)](https://www.npmjs.com/package/sweden-prayer-times)
[![Build Status](https://travis-ci.org/risan/sweden-prayer-times.svg?branch=master)](https://travis-ci.org/risan/sweden-prayer-times)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d280abf72f4f0d414dae/test_coverage)](https://codeclimate.com/github/risan/sweden-prayer-times/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d280abf72f4f0d414dae/maintainability)](https://codeclimate.com/github/risan/sweden-prayer-times/maintainability)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/risan/sweden-prayer-times)
[![License](https://img.shields.io/npm/l/sweden-prayer-times.svg)](https://www.npmjs.com/package/sweden-prayer-times)

A package to find prayer times in Sweden.

## Install

You can install this package through NPM:

```bash
$ npm install sweden-prayer-times
```

You can also use this library on browser. Simply drop the provided UMD bundle within the `script` tag.

```html
<!-- For development -->
<script src="https://unpkg.com/sweden-prayer-times@latest/dist/sweden-prayer-times.umd.js"></script>

<!-- Minified version for production -->
<script src="https://unpkg.com/sweden-prayer-times@latest/dist/sweden-prayer-times.umd.min.js"></script>
```

## Usage

```js
const SwedenPrayerTimes = require('sweden-prayer-times');

const prayerTimes = new SwedenPrayerTimes();

prayerTimes.get({ city: 'Stockholm' })
  .then(data => console.log(data))
  .catch(e => console.error(e.message));
```

## License

MIT © [Risan Bagja Pradana](https://risan.io)

This package retrieve the prayer times data directly from [Islamiska Förbundet](http://www.islamiskaforbundet.se)'s website.
