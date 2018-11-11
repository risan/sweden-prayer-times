const axios = require("axios");
const formatDate = require("date-fns/format");
const qs = require("qs");

const capitalizeFirstLetter = require("./capitalize-first-letter");

/**
 * Send request to retrieve prayer times.
 *
 * @param {String} city
 * @param {Date} date
 * @return {Object}
 */
const sendRequest = async (city, date) => {
  const url =
    "https://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php";

  const params = {
    ifis_bonetider_widget_city: `${capitalizeFirstLetter(city)}, SE`,
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

module.exports = sendRequest;
