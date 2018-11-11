/* global test:false, expect:false */
const capitalizeFirstLetter = require("../src/capitalize-first-letter");

test("it can capitalize first letter", () => {
  expect(capitalizeFirstLetter("foo bar")).toBe("Foo bar");
  expect(capitalizeFirstLetter("fOO BAR")).toBe("Foo bar");
  expect(capitalizeFirstLetter("Foo Bar")).toBe("Foo bar");
});
