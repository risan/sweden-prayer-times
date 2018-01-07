# Sweden Prayer Times

[![Latest Stable Version](https://img.shields.io/npm/v/sweden-prayer-times.svg)](https://www.npmjs.com/package/sweden-prayer-times)
[![Build Status](https://travis-ci.org/risan/sweden-prayer-times.svg?branch=master)](https://travis-ci.org/risan/sweden-prayer-times)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d280abf72f4f0d414dae/test_coverage)](https://codeclimate.com/github/risan/sweden-prayer-times/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/d280abf72f4f0d414dae/maintainability)](https://codeclimate.com/github/risan/sweden-prayer-times/maintainability)
[![Code Style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/risan/sweden-prayer-times)
[![License](https://img.shields.io/npm/l/sweden-prayer-times.svg)](https://www.npmjs.com/package/sweden-prayer-times)

A package to retrieve prayer times in Sweden from [Islamiska Förbundet](http://www.islamiskaforbundet.se)'s website.

## Install

The easier way to install this package is through NPM:

```bash
$ npm install sweden-prayer-times
```

You can also use this library on browser. Simply drop the provided UMD bundle within the `script` tag:

```html
<!-- For development -->
<script src="https://unpkg.com/sweden-prayer-times@latest/dist/sweden-prayer-times.umd.js"></script>

<!-- Minified version for production -->
<script src="https://unpkg.com/sweden-prayer-times@latest/dist/sweden-prayer-times.umd.min.js"></script>
```

If you're using it on the browser, make sure to include the [axios](https://github.com/axios/axios) library first.

## Usage

```js
const SwedenPrayerTimes = require('sweden-prayer-times');

const prayerTimes = new SwedenPrayerTimes();

prayerTimes.get({ city: 'Stockholm' })
  .then(data => console.log(data))
  .catch(err => console.error(err.message));
```

### Prayer times object

The `get` method will return a promise which on resolved will pass the prayer times object as it's parameter.

```js
{
  city: "Stockholm",
  date: "2018-01-30",
  schedule: {
    fajr: "05:35",
    sunrise: "07:57",
    dhuhr: "12:07",
    asr: "13:39",
    maghrib: "16:05"
    isha: "17:25"
  }
}
```

### Set default city

You can set a default city to use by passing an optional `defaultCity` parameter to the constructor. By default the `defaultCity` will be `Stockholm`.

```js
const prayerTimes = new SwedenPrayerTimes({ defaultCity: 'Malmö' });

prayerTimes.get(); // Will get prayer times in Malmö
```

### Set the date to retrieve

By default the `get` method will retrieve the prayer times for today. However you can also pass the optional `date` parameter to `get` method to retrieve prayer times for a specific date. You can eiter pass a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) object or a `String`.

```js
// Both will get prayer times for August 1st 2018
prayerTimes.get({ date: new Date(2018, 7, 1) });

prayerTimes.get({ date: '2018-08-01' });
```

## License

MIT © [Risan Bagja Pradana](https://risan.io)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by [Islamiska Förbundet](http://www.islamiskaforbundet.se) or any of its affiliates or subsidiaries. This is an independent and unofficial API.
