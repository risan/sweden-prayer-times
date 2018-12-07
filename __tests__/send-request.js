/* global jest:false, test:false, expect:false */
const request = require("send-request");
const sendRequest = require("../src/send-request");

jest.mock("send-request");

test("it can send request", async () => {
  request.mockResolvedValue({ body: "foo" });

  const response = await sendRequest("stockholm", "2018-08-17");

  expect(request).toHaveBeenCalledTimes(1);

  const args = request.mock.calls[0];
  expect(args[0]).toMatch(/islamiskaforbundet/);
  expect(args[1]).toHaveProperty("method", "POST");
  expect(args[1]).toHaveProperty("body.ifis_bonetider_widget_city");
  expect(args[1]).toHaveProperty("body.ifis_bonetider_widget_date");

  expect(args[1].body.ifis_bonetider_widget_city).toMatch(/stockholm/i);
  expect(args[1].body.ifis_bonetider_widget_date).toMatch(/2018-08-17/i);

  expect(response).toBe("foo");
});
