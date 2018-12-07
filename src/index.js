const formatDate = require("date-fns/format");
const isValidDate = require("date-fns/is_valid");
const parseDate = require("date-fns/parse");

const sendRequest = require("./send-request");

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

  const data = await sendRequest(city, parsedDate);

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
