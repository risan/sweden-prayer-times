/* global jest:false, test:false, expect:false */
const getPrayerTimes = require("../src");
const sendRequest = require("../src/send-request");

jest.mock("../src/send-request");

const SUCCESS_RESPONSE = `
  <ul>
    <li>01:00</li>
    <li>02:00</li>
    <li>03:00</li>
    <li>04:00</li>
    <li>05:00</li>
    <li>06:00</li>
  </ul>
`;

test("it can get prayer times", async () => {
  sendRequest.mockResolvedValue(SUCCESS_RESPONSE);

  const result = await getPrayerTimes("Stockholm");

  expect(result.city).toBe("Stockholm");
  expect(result.date).toMatch(/\d{4}-\d{2}-\d{2}/);
  expect(result.schedule.fajr).toBe("01:00");
  expect(result.schedule.sunrise).toBe("02:00");
  expect(result.schedule.dhuhr).toBe("03:00");
  expect(result.schedule.asr).toBe("04:00");
  expect(result.schedule.maghrib).toBe("05:00");
  expect(result.schedule.isha).toBe("06:00");
});

test("it can get prayer times for the specified city", async () => {
  sendRequest.mockResolvedValue(SUCCESS_RESPONSE);

  const result = await getPrayerTimes("Uppsala");

  expect(result.city).toBe("Uppsala");
  expect(sendRequest).toHaveBeenCalledTimes(1);
  expect(sendRequest.mock.calls[0][0]).toMatch(/Uppsala/m);
});

test("it can get prayer times at the specified date", async () => {
  sendRequest.mockResolvedValue(SUCCESS_RESPONSE);

  const date = new Date("2018-08-17");

  const result = await getPrayerTimes("Stockholm", date);

  expect(result.date).toBe("2018-08-17");
  expect(sendRequest).toHaveBeenCalledTimes(1);
  expect(sendRequest.mock.calls[0][1]).toEqual(date);
});

test("it throws an error if date is invalid", async () => {
  expect.assertions(1);

  try {
    await getPrayerTimes("Stockholm", "invalid date");
  } catch (error) {
    expect(error.message.toLowerCase()).toContain("date is invalid");
  }
});

test("it throws an error if response is empty", async () => {
  sendRequest.mockResolvedValue("");

  try {
    await getPrayerTimes("Stockholm");
  } catch (error) {
    expect(error.message.toLowerCase()).toContain("no data");
  }
});
