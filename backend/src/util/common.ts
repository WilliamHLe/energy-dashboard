/**
 * Adds a filter to the query without side-effects.
 * This will filter the query on the sensors mesurement date.
 * @param {object[]} query - The mongoose query to add the filter to
 * @param {Date} [fromDate] - The earliest date to include
 * @param {Date} [toDate] - The latest date to include
 * @returns {object[]} - A new query with the added filter
 */
const filterQueryBydate = (
  query: object[], index: number, fromDate?: Date, toDate?: Date,
): object[] => {
  const newQuery = [...query];

  if (fromDate || toDate) {
    const filter: any = {
      ...((fromDate || toDate) && {
        $match: {
          'measurements.date': {
            ...(fromDate && { $gte: fromDate }),
            ...(toDate && { $lte: toDate }),
          },
        },
      }),
    };

    newQuery.splice(index, 0, filter);
  }

  return newQuery;
};

export default {
  filterQueryBydate,
};
