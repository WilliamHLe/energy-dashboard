import dateUtil from '../date';

describe('date', () => {
  it('Creates a date from valid string', () => {
    const dateString = '2021-01-02';
    const expectedDate = new Date('2021-01-02T00:00:00.000Z');
    const date = dateUtil.stringToDate(dateString);
    expect(date).toStrictEqual(expectedDate);
  });
});
