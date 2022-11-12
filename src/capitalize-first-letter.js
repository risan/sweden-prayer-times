/**
 * Capitalize first letter.
 *
 * @param {String} str
 * @return {String}
 */

// str.charAt(char_index_within_string) -> gets first char(character) from string

// str.toUpperCase() -> Capitalizes string or char(character).
// In this case the char(character) at index 0 within string.

// + str.slice(1).toLowerCase() -> Makes every character after index 0 lowercase.

const capitalizeFirstLetter = str =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();


//Exports module, allowing use for function outside of current file. 
module.exports = capitalizeFirstLetter;
