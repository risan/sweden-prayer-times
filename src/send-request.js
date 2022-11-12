//Imports request function from send-request.js file
const request = require("send-request");

const formatDate = require("date-fns/format");

//Imports capitalizeFirstLetter function from capitalize-first-letter.js file
const capitalizeFirstLetter = require("./capitalize-first-letter");

/**
 * Send request to retrieve prayer times.
 *
 * @param {String} city
 * @param {Date} date
 * @return {String}
 */
const sendRequest = async (city, date) => {
  //Requested url
  const url =
    "https://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php";

  //Awaiting post request from website
  const { body } = await request(url, {
    method: "POST",
    body: {
      ifis_bonetider_widget_city: `${capitalizeFirstLetter(city)}, SE`,
      ifis_bonetider_widget_date: formatDate(date, "YYYY-MM-DD")
    }
  });
  // Returns html body
  return body;
};

//Exports module, allowing use for function outside of current file. 
module.exports = sendRequest;
