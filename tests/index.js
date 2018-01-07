import nock from 'nock';
import SwedenPrayerTimes from '../src';
import { format as formatDate } from 'date-fns';

const PRAYER_TIMES_URI = 'http://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php';

const BODY = `
  <ul>
    <li>01:00</li>
    <li>02:00</li>
    <li>03:00</li>
    <li>04:00</li>
    <li>05:00</li>
    <li>06:00</li>
  </ul>
`;

const SCHEDULE = {
  fajr: '01:00',
  sunrise: '02:00',
  dhuhr: '03:00',
  asr: '04:00',
  maghrib: '05:00',
  isha: '06:00'
};

const swedenPrayerTimes = new SwedenPrayerTimes();

const createServer = ({ statusCode = 200, body = BODY } = {}) => {
  return nock('http://www.islamiskaforbundet.se/wp-content/plugins/bonetider')
    .post('/Bonetider_Widget.php')
    .reply(statusCode, body);
}

const createServerWithError = (error) => {
  return nock('http://www.islamiskaforbundet.se/wp-content/plugins/bonetider')
    .post('/Bonetider_Widget.php')
    .replyWithError(error);
};

test('can get URI', () => {
  expect(SwedenPrayerTimes.URI).toBe(PRAYER_TIMES_URI);
});

test('can set default defaultCity parameter', () => {
  expect(swedenPrayerTimes.defaultCity).toBe('Stockholm');
});

test('can set default uri parameter', () => {
  expect(swedenPrayerTimes.uri).toBe(PRAYER_TIMES_URI);
});

test('can set defaultCity parameter', () => {
  const defaultCity = 'Lund';
  const swedenPrayerTimes = new SwedenPrayerTimes({ defaultCity });
  expect(swedenPrayerTimes.defaultCity).toBe(defaultCity);
});

test('can set uri parameter', () => {
  const uri = 'http://example.com';
  const swedenPrayerTimes = new SwedenPrayerTimes({ uri });
  expect(swedenPrayerTimes.uri).toBe(uri);
});

test('can get prayer times', () => {
  const server = createServer();
  const city = 'Stockholm';
  const date = formatDate(new Date(), 'YYYY-MM-DD');

  expect.assertions(1);

  return expect(swedenPrayerTimes.get())
    .resolves.toEqual({ city, date, schedule: SCHEDULE });
});

test('can get prayer times with optional parameters', () => {
  const server = createServer();
  const city = 'Lund';
  const date = '2018-01-07';

  expect.assertions(1);

  return expect(swedenPrayerTimes.get({ city, date }))
    .resolves.toEqual({ city, date, schedule: SCHEDULE });
});

test('throws error when request failed', () => {
  const error = new Error('foo');
  const server = createServerWithError(error);

  expect.assertions(1);

  return expect(swedenPrayerTimes.get()).rejects.toEqual(error);
});

test('throws error when server returns bad response', () => {
  const server = createServer({ statusCode: 404 });

  expect.assertions(1);

  return expect(swedenPrayerTimes.get()).rejects.toEqual(
    new Error('[404] Failed requesting data from server.')
  );
});

test('throws error when casting invalid date', () => {
  const invalidDate = 'foo';
  expect(() => SwedenPrayerTimes.castToDate(invalidDate)).toThrow(
    new Error(`The given date is not valid: ${invalidDate}`)
  );
});

test('can cast string to date', () => {
  expect(SwedenPrayerTimes.castToDate('2018-01-07')).toEqual(new Date(2018, 0, 7));
});

test('can get request config', () => {
  const city = 'Stockholm';
  const date = new Date(2018, 0, 7);

  expect(swedenPrayerTimes.getRequestConfig({ city, date }))
    .toEqual({
      url: PRAYER_TIMES_URI,
      method: 'POST',
      form: {
        ifis_bonetider_widget_city: `${city}, SE`,
        ifis_bonetider_widget_date: 'Sunday 7 January 2018'
      }
    });
});

test('can cast response to error', () => {
  const response = { statusCode: 404 };
  expect(SwedenPrayerTimes.castResponseToError(response)).toEqual(
    new Error('[404] Failed requesting data from server.')
  );
});

test('can parse body', () => {
  expect(SwedenPrayerTimes.parseBody(BODY)).toEqual(SCHEDULE);
});
