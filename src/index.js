import request from 'request';
import {
  format as formatDate,
  parse as parseDate,
  isValid as isValidDate
} from 'date-fns';

export default class SwedenPrayerTimes {
  static get URI() {
    return 'http://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php';
  }

  constructor({ defaultCity = 'Stockholm', uri = SwedenPrayerTimes.URI } = {}) {
    this.defaultCity = defaultCity;
    this.uri = uri;
  }

  get({ city = this.defaultCity, date = new Date() } = {}) {
    const parsedDate = SwedenPrayerTimes.castToDate(date);

    return new Promise((resolve, reject) => {
      request(
        this.getRequestConfig({ city, date: parsedDate }),
        (err, httpResponse, body) => {
          if (err) {
            return reject(err);
          }

          if (httpResponse.statusCode !== 200) {
            return reject(SwedenPrayerTimes.castResponseToError(httpResponse));
          }

          return resolve({
            city,
            date: formatDate(parsedDate, 'YYYY-MM-DD'),
            schedule: SwedenPrayerTimes.parseBody(body)
          });
        }
      );
    });
  }

  static castToDate(date) {
    const parsedDate = parseDate(date);

    if (!isValidDate(parsedDate)) {
      throw new Error(`The given date is not valid: ${date}`);
    }

    return parsedDate;
  }

  getRequestConfig({ city, date }) {
    return {
      url: this.uri,
      method: 'POST',
      form: {
        ifis_bonetider_widget_city: `${city}, SE`,
        ifis_bonetider_widget_date: formatDate(date, 'dddd D MMMM YYYY')
      }
    };
  }

  static castResponseToError(httpResponse) {
    return new Error(
      `[${httpResponse.statusCode}] Failed requesting data from server.`
    );
  }

  static parseBody(body) {
    const timePattern = /\d{2}:\d{2}/g;
    const timeNames = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

    return body.match(timePattern).reduce((schedule, time, idx) => {
      const newSchedule = Object.assign({}, schedule);
      newSchedule[timeNames[idx]] = time;

      return newSchedule;
    }, {});
  }
}
