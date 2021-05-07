import { IParsedDates } from '../types/interfaces';

/**
 * Returns a new date with 1st of January of the same year as the given date
 * @param {Date} date - A date
 * @returns {Date} - The first date in the year
 */
const getFirstDateInYear = (date: Date): Date => new Date(date.getFullYear(), 0, 1);

/**
 * Takes a possible datestring and parses it into a Date. Undefined string
 * is valid is simply returns undefined. If a string is passed it has to be
 * a valid datestring otherwise an error is thrown.
 * @param {string?} datestring - The datestring on expected format of yyyy-mm-dd
 * @returns {Date | undefined} - Date if datestring is valid, else undefined
 * @throws {Error} - Throws an error if the given datestring is invalid
 */
const stringToDate = (datestring?: string): Date | undefined => {
  if (!datestring) {
    return undefined;
  }

  const timestamp = Date.parse(datestring);

  if (timestamp) {
    return new Date(timestamp);
  }

  throw new Error('Invalid datestring');
};

/**
 * Returns a new date with the same date as the given date in the previous year
 * @param {Date} date - A date
 * @returns {Date} - Returns the same date in the previous year
 */
const previousYear = (date: Date): Date => {
  const prevDate = new Date(date);
  const prevYear: number = date.getFullYear() - 1;
  prevDate.setFullYear(prevYear);
  return prevDate;
};

/**
 * Hardcoded date to match the data in the dataset for the prototype
 * returns last day in december of 2019
 */
const latestDateInDataset = (): Date => new Date(2019, 12, 0);

/**
 * Creates date objects if the datestrings are provided, otherwise sets the dates as undefined
 * @param {Date} fromDate - A date
 * @param {Date} toDate - A date
 * @returns {IParseDates} - An object with fromDate and toDate
 */
const parseDates = (fromDate?: string, toDate?: string): IParsedDates => {
  const parsedFromDate: Date | undefined = fromDate ? new Date(fromDate) : undefined;
  const parsedToDate: Date | undefined = parsedFromDate && toDate ? new Date(toDate) : undefined;

  return {
    fromDate: parsedFromDate,
    toDate: parsedToDate,
  };
};

export default {
  stringToDate,
  previousYear,
  getFirstDateInYear,
  latestDateInDataset,
  parseDates,
};
