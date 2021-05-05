import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';

/**
 * Fetches metrics
 * @param {(string|undefined)} category Name of building category
 * @return {Array} Fetched data
 */
// eslint-disable-next-line import/prefer-default-export
export async function getMetrics(category: string | undefined) {
  const query = category || '';
  try {
    const results = await axios.get(`${getServerBaseUri}/metrics/${query}`);
    return results.data;
  } catch (e) {
    return e;
  }
}
