import request from 'supertest';
import {PUBLIC_HOLIDAYS_API_URL, SUPPORTED_COUNTRIES} from '../../config';

const year = 2024;
const country = SUPPORTED_COUNTRIES[0];

describe('Date API tests', () => {
  describe('/PublicHolidays', () => {
    test('should return 200 and list of holidays', async () => {
      const {status, body} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${year}/${country}`);

      expect(status).toEqual(200);
      expect(Array.isArray(body)).toBe(true);
      body.forEach((item: any) => {
        expect(item).toEqual({
          date: expect.any(String),
          localName: expect.any(String),
          name: expect.any(String),
          countryCode: expect.any(String),
          fixed: expect.any(Boolean),
          global: expect.any(Boolean),
          counties: expect.toBeOneOf([expect.any(Array<String>), null]),
          launchYear: expect.toBeOneOf([expect.any(Array<Number>), null]),
          types: expect.any(Array<String>)
        })
      });
    });

    test('should return 400 if year is invalid', async () => {
      const invalidYear = 9999;
      const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${invalidYear}/${country}`);
      expect(status).toEqual(400);
    });

    test('should return 404 if country is invalid', async () => {
      const invalidCountry = "GB1";
      const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/PublicHolidays/${year}/${invalidCountry}`);
      expect(status).toEqual(404);
    });
  });

  describe('/IsTodayPublicHoliday', () => {
    test('should return 204 if today is not holiday', async () => {
      const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${country}`);
      expect(status).toEqual(204);
    });

    test('should return 404 if country code is unknown', async () => {
      const invalidCountry = "GB1"
      const {status} = await request(PUBLIC_HOLIDAYS_API_URL).get(`/IsTodayPublicHoliday/${invalidCountry}`);
      expect(status).toEqual(404);
    });
  });
});