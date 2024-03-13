import axios from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../../services/public-holidays.service';
import {holidays, shortHolidays} from '../test-data';

const DATE_API = 'https://date.nager.at/api/v3';

describe('Get list of public holidays', () => {
  test('should return list of short holidays',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays }));
    const holidaysResponse = await getListOfPublicHolidays(2024,"GB");
    expect(holidaysResponse).toEqual(shortHolidays);
  });

  test('should call API with proper arguments', async () => {
    const country = "GB";
    const year = 2024;
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays }));
    await getListOfPublicHolidays(year,country);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${DATE_API}/PublicHolidays/${year}/${country}`);
  });

  test('should throw error if country is invalid', async () => {
    const invalidCountry = 'GB1';
    await expect(getListOfPublicHolidays(2024, invalidCountry)).rejects.toThrow(new Error(`Country provided is not supported, received: ${invalidCountry}`));
  });

  test('should throw error if year is invalid', async () => {
    const invalidYear = 2023
    await expect(getListOfPublicHolidays(invalidYear, "GB")).rejects.toThrow(new Error(`Year provided not the current, received: ${invalidYear}`));
  });

  test('should return empty array if axios error occurs', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('error'));
    const holidaysResponse = await getListOfPublicHolidays(2024,"GB");
    expect(holidaysResponse).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Check if today is public holiday', () => {
  test('should return true if today is public holiday',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
    const isPublicHolidayToday = await checkIfTodayIsPublicHoliday("GB");
    expect(isPublicHolidayToday).toBe(true);
  });

  test('should return false if today is not public holiday',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 204 }));
    const isPublicHolidayToday = await checkIfTodayIsPublicHoliday("GB");
    expect(isPublicHolidayToday).toBe(false);
  });

  test('should call API with proper argument', async () => {
    const country = "GB"
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
    await checkIfTodayIsPublicHoliday(country);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${DATE_API}/IsTodayPublicHoliday/${country}`);
  });

  test('should throw error if country is invalid', async () => {
    const invalidCountry = 'GB1';
    await expect(checkIfTodayIsPublicHoliday(invalidCountry)).rejects.toThrow(new Error(`Country provided is not supported, received: ${invalidCountry}`));
  });

  test('should return false if axios error occurs', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('error'));
    const response = await checkIfTodayIsPublicHoliday("GB");
    expect(response).toBe(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Get next public holidays', () => {
  test('should return next public holidays',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays.slice(-2) }));
    const nextHolidaysResponse = await getNextPublicHolidays("GB");
    expect(nextHolidaysResponse).toEqual(shortHolidays.slice(-2));
  });

  test('should call API with proper argument', async () => {
    const country = "GB";
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays.slice(-2) }));
    await getNextPublicHolidays(country);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${DATE_API}/NextPublicHolidays/${country}`);
  });

  test('should throw error if country is invalid', async () => {
    const invalidCountry = 'GB1';
    await expect(getNextPublicHolidays(invalidCountry)).rejects.toThrow(new Error(`Country provided is not supported, received: ${invalidCountry}`));
  });

  test('should return empty array if axios error occurs', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('error'));
    const nextHolidaysResponse = await getNextPublicHolidays("GB");
    expect(nextHolidaysResponse).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
