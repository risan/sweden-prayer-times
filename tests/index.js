import SwedenPrayerTimes from '../src';

const PRAYER_TIMES_URI = 'http://www.islamiskaforbundet.se/wp-content/plugins/bonetider/Bonetider_Widget.php';

test('can get URI', () => {
  expect(SwedenPrayerTimes.URI).toBe(PRAYER_TIMES_URI);
});
