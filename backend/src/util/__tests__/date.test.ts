import dateUtil from '../date';

describe('stringToDate', () => {
  it('Returns a valid date object from a valid date string', () => {
    const dateString = '2021-01-02';
    const expectedDate = new Date('2021-01-02T00:00:00.000Z');
    const result: Date | undefined = dateUtil.stringToDate(dateString);
    expect(result).toEqual(expectedDate);
  });

  it('Returns undefined from an undefined data string', () => {
    const dateString = undefined;
    const result: Date | undefined = dateUtil.stringToDate(dateString);
    expect(result).toEqual(undefined);
  });

  it('Throws error when datestring is invalid', () => {
    const dateString = 'invalid';
    expect(() => dateUtil.stringToDate(dateString)).toThrowError();
  });
});

describe('getFirstDateInYear', () => {
  it('Returns 1st of January in the given year for the Date', () => {
    const year = 2021;
    const date = new Date(year, 4, 7);
    const result: Date = dateUtil.getFirstDateInYear(date);
    expect(result.getFullYear()).toBe(year);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });
});

describe('previousYear', () => {
  it('Returns same date in the previous year given a date', () => {
    const year = 2021;
    const day = 7;
    const month = 4;
    const date = new Date(year, month, day);
    const result: Date = dateUtil.previousYear(date);
    expect(result.getFullYear()).toBe(year - 1);
    expect(result.getMonth()).toBe(month);
    expect(result.getDate()).toBe(day);
  });
});
