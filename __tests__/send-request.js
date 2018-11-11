/* global jest:false, test:false, expect:false */
const axios = require("axios");
const sendRequest = require("../src/send-request");

jest.mock("axios");

test("it can send request", async () => {
  axios.post.mockResolvedValue("foo");

  const response = await sendRequest("stockholm", "2018-08-17");

  const args = axios.post.mock.calls[0];

  expect(axios.post).toHaveBeenCalledTimes(1);
  expect(args[0]).toMatch(/islamiskaforbundet/);
  expect(args[1]).toMatch(/2018-08-17/);
  expect(args[1]).toMatch(/Stockholm/);

  expect(response).toBe("foo");
});
