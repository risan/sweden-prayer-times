# Sweden Prayer Times

[![Build Status](https://badgen.net/travis/risan/sweden-prayer-times)](https://travis-ci.org/risan/sweden-prayer-times)
[![Test Covarage](https://badgen.net/codecov/c/github/risan/sweden-prayer-times)](https://codecov.io/gh/risan/sweden-prayer-times)
[![Latest Version](https://badgen.net/npm/v/sweden-prayer-times)](https://www.npmjs.com/package/sweden-prayer-times)

Get prayer times in Sweden based on the data from [Islamiska Förbundet](http://www.islamiskaforbundet.se)'s website.

## Installation

```bash
$ npm install sweden-prayer-times
```

## Usage

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

## Recipes

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

```js
swedenPrayerTimes(city, [date])
```

### Parameters

* `city` (`String`): The city name in Sweden.
* `date` (optional `Date|String|Number`): The date to retrieve, default to today's date. It will be parsed by [`date-fns/parse`](https://date-fns.org/docs/parse).

### Return

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

## Related

* [sweden-prayer-times-cli](https://github.com/risan/sweden-prayer-times-cli): The CLI tool for this module.

## License

[MIT](https://github.com/risan/sweden-prayer-times/blob/master/LICENSE) © [Risan Bagja Pradana](https://bagja.net)

## Legal

This code is in no way affiliated with, authorized, maintained, sponsored or endorsed by [Islamiska Förbundet](http://www.islamiskaforbundet.se) or any of its affiliates or subsidiaries. This is an independent and unofficial API.
