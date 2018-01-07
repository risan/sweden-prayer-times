import axios from 'axios';
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
      axios
        .request(this.getRequestConfig({ city, date: parsedDate }))
        .then(res =>
          resolve({
            city,
            date: formatDate(parsedDate, 'YYYY-MM-DD'),
            schedule: SwedenPrayerTimes.parseResponse(res.data)
          })
        )
        .catch(err => reject(SwedenPrayerTimes.castToError(err)));
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
    const data = SwedenPrayerTimes.getFormData({ city, date });

    return {
      url: this.uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Length': data.length
      },
      responseType: 'text',
      data
    };
  }

  static getFormData({ city, date }) {
    const cityEncoded = `${city}%2C+SE`;
    const dateEncoded = formatDate(date, 'dddd D MMMM YYYY').replace(/ /g, '+');

    return `ifis_bonetider_widget_city=${cityEncoded}&ifis_bonetider_widget_date=${dateEncoded}`;
  }

  static parseResponse(response) {
    const timePattern = /\d{2}:\d{2}/g;
    const timeNames = ['fajr', 'sunrise', 'dhuhr', 'asr', 'maghrib', 'isha'];

    return response.match(timePattern).reduce((schedule, time, idx) => {
      const newSchedule = Object.assign({}, schedule);
      newSchedule[timeNames[idx]] = time;

      return newSchedule;
    }, {});
  }

  static castToError(error) {
    if (error.response) {
      const { status, statusText } = error.response;

      return new Error(
        `Failed requesting data from server: [${status}] ${statusText ||
          'Unknown error'}`
      );
    }

    if (error.request) {
      return new Error(
        'Failed sending request to server, no response was received.'
      );
    }

    return error;
  }
}
