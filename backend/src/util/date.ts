import { IParsedDates } from '../types/interfaces';

/**
 * Input: new Date('2021-05-17T00:00:00.000Z')
 * Output: new Date('2021-01-01T00:00:00.000Z')
 */
const getFirstDateInYear = (date: Date): Date => {
  const year = date.getFullYear();
  return new Date(year, 0, 1);
};

// yyyy-mm-dd
const stringToDate = (datestring: string): Date => new Date(datestring);

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
