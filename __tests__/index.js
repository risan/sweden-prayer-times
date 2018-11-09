/* global jest:false, test:false, expect:false */
import axios from "axios";
import getPrayerTimes from "../src";

jest.mock("axios");

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
  axios.post.mockResolvedValue({ data: SUCCESS_RESPONSE });

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
  axios.post.mockResolvedValue({ data: SUCCESS_RESPONSE });

  const result = await getPrayerTimes("Uppsala");

  expect(result.city).toBe("Uppsala");
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post.mock.calls[0][1]).toMatch(/Uppsala/m);
});

test("it can get prayer times at the specified date", async () => {
  axios.post.mockResolvedValue({ data: SUCCESS_RESPONSE });

  const result = await getPrayerTimes("Stockholm", "1945-08-17");

  expect(result.date).toBe("1945-08-17");
  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(axios.post.mock.calls[0][1]).toMatch(/1945-08-17/m);
});

test("it throws an error if date is invalid", async () => {
  expect.assertions(1);

  try {
    await getPrayerTimes("Stockholm", "invalid date");
  } catch (error) {
    expect(error.message.toLowerCase()).toContain("date is invalid");
  }
});

test("it throws an error if resonse is empty", async () => {
  axios.post.mockResolvedValue({ data: "" });

  try {
    await getPrayerTimes("Stockholm");
  } catch (error) {
    expect(error.message.toLowerCase()).toContain("no data");
  }
});
