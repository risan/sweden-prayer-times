const axios = require("axios");
const formatDate = require("date-fns/format");
const isValidDate = require("date-fns/is_valid");
const parseDate = require("date-fns/parse");
const qs = require("qs");

/**
 * Send request to retrieve prayer times.
 *
 * @param {String} city
 * @param {Date} date
 * @return {Object}
 */
const request = async (city, date) => {
  const url =
    "https://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php";

  const params = {
    ifis_bonetider_widget_city: `${city}, SE`,
    ifis_bonetider_widget_date: formatDate(date, "YYYY-MM-DD")
  };

  const response = await axios.post(url, qs.stringify(params), {
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    responseType: "text"
  });

  return response;
};

/**
 * Get the prayer times.
 *
 * @param {String} city
 * @param {Date} date
 * @return {Object}
 */
const getPrayerTimes = async (city, date = new Date()) => {
  const parsedDate = parseDate(date);

  if (!isValidDate(parsedDate)) {
    throw new Error("The given date is invalid.");
  }

  const { data } = await request(city, parsedDate);

  const times = data.match(/\d{2}:\d{2}/gm);

  if (!Array.isArray(times) || times.length !== 6) {
    throw new Error(
      `Failed to retrieve prayer times in ${city}: no data found.`
    );
  }

  const timeKeys = ["fajr", "sunrise", "dhuhr", "asr", "maghrib", "isha"];

  return {
    city,
    date: formatDate(parsedDate, "YYYY-MM-DD"),
    schedule: times.reduce(
      (schedule, time, index) => ({ ...schedule, [timeKeys[index]]: time }),
      {}
    )
  };
};

module.exports = getPrayerTimes;
