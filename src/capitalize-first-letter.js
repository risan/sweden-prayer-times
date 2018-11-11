/**
 * Capitalize first letter.
 *
 * @param {String} str
 * @return {String}
 */
const capitalizeFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

module.exports = capitalizeFirstLetter;
