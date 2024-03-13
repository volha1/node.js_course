import {PublicHoliday, PublicHolidayShort} from "../types";

export const holidays: Array<PublicHoliday> = [
  {
    date: "2024-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"]
  },
  {
    date: "2024-05-27",
    localName: "Spring Bank Holiday",
    name: "Spring Bank Holiday",
    countryCode: "GB",
    fixed: false,
    global: true,
    counties: null,
    launchYear: null,
    types: ["Public"]
  },
  {
    date: "2024-07-12",
    localName: "Battle of the Boyne",
    name: "Battle of the Boyne",
    countryCode: "GB",
    fixed: false,
    global: false,
    counties: ["GB-NIR"],
    launchYear: null,
    types: ["Public"]
  }
]

export const shortHolidays: Array<PublicHolidayShort> = [
  {
    date: "2024-01-01",
    localName: "New Year's Day",
    name: "New Year's Day",
  },
  {
    date: "2024-05-27",
    localName: "Spring Bank Holiday",
    name: "Spring Bank Holiday",
  },
  {
    date: "2024-07-12",
    localName: "Battle of the Boyne",
    name: "Battle of the Boyne",
  }
]