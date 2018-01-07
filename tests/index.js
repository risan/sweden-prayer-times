import nock from 'nock';
import SwedenPrayerTimes from '../src';
import { format as formatDate } from 'date-fns';

const PRAYER_TIMES_URI =
  'http://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php';
const REQUEST_BODY =
  'ifis_bonetider_widget_city=Stockholm%2C+SE&ifis_bonetider_widget_date=Sunday+7+January+2018';

const SUCCESS_RESPONSE = `
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

// Somehow we can't match the request body with form data format with nock
// That's why we need a mocked request config without the `data` property
const withMockedRequestConfig = () => {
  const swedenPrayerTimes = new SwedenPrayerTimes();

  swedenPrayerTimes.getRequestConfig = jest.fn();
  swedenPrayerTimes.getRequestConfig.mockReturnValueOnce({
    url: PRAYER_TIMES_URI,
    method: 'POST'
  });

  return swedenPrayerTimes;
};

const createServer = ({
  statusCode = 200,
  response = SUCCESS_RESPONSE
} = {}) => {
  return nock('http://www.islamiskaforbundet.se')
    .post('/wp-content/plugins/bonetider/Bonetider_Widget.php')
    .reply(statusCode, response);
};

const createServerWithError = error => {
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
  const swedenPrayerTimes = withMockedRequestConfig();
  const city = 'Stockholm';
  const date = formatDate(new Date(), 'YYYY-MM-DD');

  expect.assertions(1);

  return expect(swedenPrayerTimes.get()).resolves.toEqual({
    city,
    date,
    schedule: SCHEDULE
  });
});

test('can get prayer times with optional parameters', () => {
  const server = createServer();
  const swedenPrayerTimes = withMockedRequestConfig();
  const city = 'Lund';
  const date = '2018-01-07';

  expect.assertions(1);

  return expect(swedenPrayerTimes.get({ city, date })).resolves.toEqual({
    city,
    date,
    schedule: SCHEDULE
  });
});

test('throws error when server returns bad response', () => {
  const server = createServer({ statusCode: 500 });
  const swedenPrayerTimes = withMockedRequestConfig();
  const city = 'Stockholm';
  const date = '2018-01-07';

  expect.assertions(1);

  return expect(swedenPrayerTimes.get()).rejects.toEqual(
    new Error('Failed requesting data from server: [500] Unknown error')
  );
});

test('throws error when request failed', () => {
  const server = createServerWithError('foo');
  const swedenPrayerTimes = withMockedRequestConfig();
  const city = 'Stockholm';
  const date = '2018-01-07';

  expect.assertions(1);

  return expect(swedenPrayerTimes.get()).rejects.toEqual(
    new Error('Failed sending request to server, no response was received.')
  );
});

test('throws error when casting invalid date', () => {
  const invalidDate = 'foo';
  expect(() => SwedenPrayerTimes.castToDate(invalidDate)).toThrow(
    new Error(`The given date is not valid: ${invalidDate}`)
  );
});

test('can cast string to date', () => {
  expect(SwedenPrayerTimes.castToDate('2018-01-07')).toEqual(
    new Date(2018, 0, 7)
  );
});

test('can get request config', () => {
  const city = 'Stockholm';
  const date = new Date(2018, 0, 7);

  expect(swedenPrayerTimes.getRequestConfig({ city, date })).toEqual({
    url: PRAYER_TIMES_URI,
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Content-Length': REQUEST_BODY.length
    },
    responseType: 'text',
    data: REQUEST_BODY
  });
});

test('can get form data', () => {
  const city = 'Stockholm';
  const date = new Date(2018, 0, 7);
  expect(SwedenPrayerTimes.getFormData({ city, date })).toEqual(REQUEST_BODY);
});

test('can parse response', () => {
  expect(SwedenPrayerTimes.parseResponse(SUCCESS_RESPONSE)).toEqual(SCHEDULE);
});

test('can cast error response to error object', () => {
  expect(
    SwedenPrayerTimes.castToError({
      response: { status: 404, statusText: 'Not Found' }
    })
  ).toEqual(new Error('Failed requesting data from server: [404] Not Found'));
});

test('can cast error request to error object', () => {
  expect(SwedenPrayerTimes.castToError({ request: true })).toEqual(
    new Error('Failed sending request to server, no response was received.')
  );
});

test('it wont cast error object', () => {
  const error = new Error('foo');
  expect(SwedenPrayerTimes.castToError(error)).toEqual(error);
});
