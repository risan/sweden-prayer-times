const request = require("send-request");
const formatDate = require("date-fns/format");

const capitalizeFirstLetter = require("./capitalize-first-letter");

/**
 * Send request to retrieve prayer times.
 *
 * @param {String} city
 * @param {Date} date
 * @return {String}
 */
const sendRequest = async (city, date) => {
  const url =
    "https://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php";

  const { body } = await request(url, {
    method: "POST",
    body: {
      ifis_bonetider_widget_city: `${capitalizeFirstLetter(city)}, SE`,
      ifis_bonetider_widget_date: formatDate(date, "YYYY-MM-DD")
    }
  });

  return body;
};

module.exports = sendRequest;
