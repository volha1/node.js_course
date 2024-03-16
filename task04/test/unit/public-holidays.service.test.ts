import axios from 'axios';
import {
  getListOfPublicHolidays,
  checkIfTodayIsPublicHoliday,
  getNextPublicHolidays
} from '../../services/public-holidays.service';
import {PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES} from '../../config';
import {holidays, shortHolidays} from '../test-data';

const year = 2024;
const country = SUPPORTED_COUNTRIES[0];

describe('Get list of public holidays', () => {
  test('should return list of short holidays',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays }));
    const holidaysResponse = await getListOfPublicHolidays(year, country);
    expect(holidaysResponse).toEqual(shortHolidays);
  });

  test('should call API with proper arguments', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays }));
    await getListOfPublicHolidays(year,country);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/PublicHolidays/${year}/${country}`);
  });

  test('should throw error if country is invalid', async () => {
    const invalidCountry = 'GB1';
    await expect(getListOfPublicHolidays(year, invalidCountry)).rejects.toThrow(new Error(`Country provided is not supported, received: ${invalidCountry}`));
  });

  test('should throw error if year is invalid', async () => {
    const invalidYear = 2023
    await expect(getListOfPublicHolidays(invalidYear, country)).rejects.toThrow(new Error(`Year provided not the current, received: ${invalidYear}`));
  });

  test('should return empty array if axios error occurs', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('error'));
    const holidaysResponse = await getListOfPublicHolidays(year, country);
    expect(holidaysResponse).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Check if today is public holiday', () => {
  test('should return true if today is public holiday',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
    const isPublicHolidayToday = await checkIfTodayIsPublicHoliday(country);
    expect(isPublicHolidayToday).toBe(true);
  });

  test('should return false if today is not public holiday',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 204 }));
    const isPublicHolidayToday = await checkIfTodayIsPublicHoliday(country);
    expect(isPublicHolidayToday).toBe(false);
  });

  test('should call API with proper argument', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));
    await checkIfTodayIsPublicHoliday(country);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/IsTodayPublicHoliday/${country}`);
  });

  test('should throw error if country is invalid', async () => {
    const invalidCountry = 'GB1';
    await expect(checkIfTodayIsPublicHoliday(invalidCountry)).rejects.toThrow(new Error(`Country provided is not supported, received: ${invalidCountry}`));
  });

  test('should return false if axios error occurs', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('error'));
    const response = await checkIfTodayIsPublicHoliday(country);
    expect(response).toBe(false);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe('Get next public holidays', () => {
  test('should return next public holidays',  async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays.slice(-2) }));
    const nextHolidaysResponse = await getNextPublicHolidays(country);
    expect(nextHolidaysResponse).toEqual(shortHolidays.slice(-2));
  });

  test('should call API with proper argument', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: holidays.slice(-2) }));
    await getNextPublicHolidays(country);
    expect(axiosGetSpy).toHaveBeenCalledWith(`${PUBLIC_HOLIDAYS_API_URL}/NextPublicHolidays/${country}`);
  });

  test('should throw error if country is invalid', async () => {
    const invalidCountry = 'GB1';
    await expect(getNextPublicHolidays(invalidCountry)).rejects.toThrow(new Error(`Country provided is not supported, received: ${invalidCountry}`));
  });

  test('should return empty array if axios error occurs', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.reject('error'));
    const nextHolidaysResponse = await getNextPublicHolidays(country);
    expect(nextHolidaysResponse).toEqual([]);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
