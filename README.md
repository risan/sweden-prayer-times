# Sweden Prayer Times

[![Build Status](https://flat.badgen.net/travis/risan/sweden-prayer-times)](https://travis-ci.org/risan/sweden-prayer-times)
[![Test Coverage](https://flat.badgen.net/codeclimate/coverage/risan/sweden-prayer-times)](https://codeclimate.com/github/risan/sweden-prayer-times)
[![Maintainability](https://flat.badgen.net/codeclimate/maintainability/risan/sweden-prayer-times)](https://codeclimate.com/github/risan/sweden-prayer-times)
[![Latest Stable Version](https://flat.badgen.net/npm/v/sweden-prayer-times)](https://www.npmjs.com/package/sweden-prayer-times)
[![Node Version](https://flat.badgen.net/npm/node/sweden-prayer-times)](https://www.npmjs.com/package/sweden-prayer-times)
[![Code Style: Prettier](https://flat.badgen.net/badge/code%20style/prettier/ff69b4)](https://github.com/prettier/prettier)
[![License](https://flat.badgen.net/npm/license/sweden-prayer-times)](https://github.com/risan/sweden-prayer-times/blob/master/LICENSE)

Get prayer times in Sweden based on the data from [Islamiska Förbundet](http://www.islamiskaforbundet.se)'s website.

## Requirement

* [Node](https://nodejs.org/) version `>= 8.0.0`

## Installation

```bash
$ npm install sweden-prayer-times

# Or if you use Yarn
$ yarn add sweden-prayer-times
```

## Quick Start

Get prayer times in Stockholm:

```js
const swedenPrayerTimes = require("sweden-prayer-times");

(async () => {
  const prayerTimes = await swedenPrayerTimes("Stockholm");

  console.log(prayerTimes);
})();
```

The example output:

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

## Recipe

### Get Prayer Times for a Specified Date

```js
const swedenPrayerTimes = require("sweden-prayer-times");

(async () => {
  const prayerTimes = await getPrayerTimes("Uppsala", "2018-08-17");

  console.log(prayerTimes);
})();
```

### Handling Error

```js
const swedenPrayerTimes = require("sweden-prayer-times");

(async () => {
  try {
    const prayerTimes = await getPrayerTimes("Foo");
    console.log(prayerTimes);
  } catch(error) {
    console.error(error.message);
  }
})();
```

## API

### `swedenPrayerTimes`

```js
swedenPrayerTime(city, [date])
```

#### Parameters

* `city` (`String`): The city name in Sweden.
* `date` (optional `Date|String|Number`): The date to retrieve, default to today's date. It will be parsed by [`date-fns/parse`](https://date-fns.org/docs/parse).

#### Return

It returns a `Promise` which when resolved contains an object with the following structure:

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

## License

MIT © [Risan Bagja Pradana](https://bagja.net)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by [Islamiska Förbundet](http://www.islamiskaforbundet.se) or any of its affiliates or subsidiaries. This is an independent and unofficial API.
