import {validateInput, shortenPublicHoliday} from '../../helpers'
import {holidays, shortHolidays} from '../test-data'
import {SUPPORTED_COUNTRIES} from "../../config";

const year = 2024;
const country = SUPPORTED_COUNTRIES[0];

describe('Validate input', () => {
  test('should return true if year and country are correct',  () => {
    const inputValidationResult = validateInput({year, country});
    expect(inputValidationResult).toBe(true);
  });

  test('should return true if country is correct',  () => {
    const inputValidationResult = validateInput({country});
    expect(inputValidationResult).toBe(true);
  });

  test('should throw error if country is invalid', () => {
    const invalidCountry = "GB1"
    expect(() => validateInput({country: invalidCountry})).toThrow(`Country provided is not supported, received: ${invalidCountry}`);
  });

  test('should throw error if year is invalid', () => {
    const invalidYear = 2023
    expect(() => validateInput({year: invalidYear})).toThrow(`Year provided not the current, received: ${invalidYear}`);
  });
});

describe('Get short public holiday', () => {
  test('should return short public holiday',  () => {
    const shortPublicHoliday = shortenPublicHoliday(holidays[0]);
    expect(shortPublicHoliday).toStrictEqual(shortHolidays[0]);
  });
});