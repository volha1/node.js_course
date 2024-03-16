import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../../services/public-holidays.service';
import {SUPPORTED_COUNTRIES} from "../../config";

const year = 2024;
const GB = SUPPORTED_COUNTRIES[0];
const FR = SUPPORTED_COUNTRIES[1];

describe('Get list of public holidays', () => {
  test('should return list of short holidays for GB', async () => {
    const holidays = await getListOfPublicHolidays(year, GB);
    expect(holidays.length).toEqual(15);
  });

  test('should return list of short holidays for FR', async () => {
    const holidays = await getListOfPublicHolidays(year, FR);
    expect(holidays.length).toEqual(11);
  });
});

describe('Check if today is public holiday', () => {
  test('should return false if today is not public holiday in GB',  async () => {
    const isPublicHolidayToday = await checkIfTodayIsPublicHoliday(GB);
    expect(isPublicHolidayToday).toBe(false);
  });

  test('should return false if today is not public holiday in FR',  async () => {
    const isPublicHolidayToday = await checkIfTodayIsPublicHoliday(FR);
    expect(isPublicHolidayToday).toBe(false);
  });
});

describe('Get next public holidays', () => {
  test('should return next public holidays for GB',  async () => {
    const nextHolidays = await getNextPublicHolidays(GB);
    expect(nextHolidays.length).toEqual(15);
  });

  test('should return next public holidays for FR',  async () => {
    const nextHolidays = await getNextPublicHolidays(FR);
    expect(nextHolidays.length).toEqual(11);
  });
});