import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';
import { IMetrics, IMetricsData } from '../types/interfaces';

/**
 * Fetches metrics
 * @param {(string|undefined)} category Name of building category
 * @return {IMetricsData} Fetched data
 */
export default async function getMetrics(category: string | undefined): Promise<IMetricsData> {
  const query = category || '';
  try {
    const results: IMetrics = await axios.get(`${getServerBaseUri}/metrics/${query}`);
    return results.data;
  } catch (e) {
    return e;
  }
}
