import common from '../common';

describe('filterQueryBydate', () => {
  let query: object[] = [];

  beforeEach(() => {
    query = [{ hello: 'world' }, { hello: 'world' }];
  });

  it('Inserts nothing if no dates are given', () => {
    const result: object[] = common.filterQueryBydate(query, 1);
    expect(result).toEqual(query);
  });

  it('Inserts match-filter with fromDate given fromDate', () => {
    const fromDate = new Date(2021, 4, 7);
    const result: object[] = common.filterQueryBydate(query, 1, fromDate);

    expect(result).toHaveLength(query.length + 1);
    expect(result[0]).toBe(query[0]);
    expect(result[2]).toBe(query[1]);
    expect(result[1]).toEqual({
      $match: {
        'measurements.date': {
          $gte: fromDate,
        },
      },
    });
  });

  it('Inserts match-filter with toDate given toDate', () => {
    const toDate = new Date(2021, 4, 7);
    const result: object[] = common.filterQueryBydate(query, 1, undefined, toDate);

    expect(result).toHaveLength(query.length + 1);
    expect(result[0]).toBe(query[0]);
    expect(result[2]).toBe(query[1]);
    expect(result[1]).toEqual({
      $match: {
        'measurements.date': {
          $lte: toDate,
        },
      },
    });
  });

  it('Inserts match-filter with fromDate and toDate given both', () => {
    const date = new Date(2021, 4, 7);
    const result: object[] = common.filterQueryBydate(query, 1, date, date);

    expect(result).toHaveLength(query.length + 1);
    expect(result[0]).toBe(query[0]);
    expect(result[2]).toBe(query[1]);
    expect(result[1]).toEqual({
      $match: {
        'measurements.date': {
          $gte: date,
          $lte: date,
        },
      },
    });
  });
});
