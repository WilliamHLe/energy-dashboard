import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';

/**
 * Fetches energy usage and transforms the data to be used in a line chart
 * @param {(string|undefined)} category Name of building category
 * @param {(string|undefined)} id       Name of building
 * @return {Array} tempData Transformed data
 */
export async function getEnergyUsage(category: string | undefined, id: string | undefined) {
  const query = id || category || '';
  try {
    const response = await axios.get(`${getServerBaseUri}/energy/usage/${query}`);
    // Temporary stores the transformed data
    const tempData: { name: string, data: { x: number, y: number }[] }[] = [];
    if (query !== '') {
      tempData.push({ name: query, data: [] });
    }
    for (let i = 0; i < response.data.length; i += 1) {
      if (query === '') {
        tempData.push({ name: response.data[i].category.name, data: [] });
        for (let j = 0; j < response.data[i].usage.length; j += 1) {
          const date = new Date(response.data[i].usage[j].date).getTime();
          tempData[i].data.push({
            x: date,
            y: response.data[i].usage[j].value,
          });
        }
      } else {
        const date = new Date(response.data[i].date).getTime();
        tempData[0].data.push({
          x: date,
          y: response.data[i].value,
        });
      }
    }
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches energy carriers for all building categories to be used in sankey diagram
 * @return {Array} tempData Transformed data
 */
export async function getEnergyCarriersAll() {
  try {
    const result = await axios.get(`${getServerBaseUri}/energy/carriers`);
    // Temporary stores the transformed data
    const tempData:{ data: any[]; keys: string[]; name: string; type: string }[] = [{
      keys: ['from', 'to', 'weight'],
      data: [],
      type: 'sankey',
      name: 'Energibærer',
    }];
    for (let i = 0; i < result.data.length; i += 1) {
      for (let j = 0; j < result.data[i].carriers.length; j += 1) {
        tempData[0].data.push([
          result.data[i].carriers[j].name,
          result.data[i].category.name,
          result.data[i].carriers[j].amount,
        ]);
      }
    }
    // Sorts the data to make the graph look more consistent
    tempData[0].data.sort((a: string[], b: string[]) => a[0].localeCompare(b[0]));
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches energy carriers for building category to be used in a pie chart
 * @param {string } category Name of building category
 * @return {Object} tempData Transformed data
 */
export async function getEnergyCarriersCategory(category: string) {
  try {
    const result = await axios.get(`${getServerBaseUri}/energy/carriers/${category}`);
    // Temporary stores the transformed data
    const tempData: {name: string, colorByPoint:boolean, data: { name: string; y: number; }[]} = { name: 'Energibærer', colorByPoint: true, data: [] };
    for (let i = 0; i < result.data.length; i += 1) {
      tempData.data.push({ name: result.data[i].name, y: result.data[i].amount });
    }
    // Sorts the data to make the graph look more consistent
    tempData.data.sort((a, b) => ((a.name > b.name) ? 1 : -1));
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches energy saved for all building categories to be used in column chart
 * @return {Array} tempData Transformed data
 */
export async function getEnergySavedAll() {
  try {
    const result = await axios.get(`${getServerBaseUri}/energy/saved`);
    // Temporary stores the transformed data
    const tempData: {name: string, y: number}[] = [];
    for (let i = 0; i < result.data.length; i += 1) {
      tempData.push({
        name: result.data[i].category.name,
        y: parseFloat(result.data[i].saved.toFixed(2)),
      });
    }
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches total energy saved for a building
 * @param {string} query Building to fetch for
 * @return {Array} response.data Fetched data
 */
export async function getEnergySavedTotal(query: string) {
  try {
    const response = await axios.get(`${getServerBaseUri}/energy/saved/total/${query}`);
    return response.data;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches data for a building and transforms it to be used in a heatmap
 * @param {string} query Building to fetch for
 * @return {Array} tempData Transformed data
 */
export async function getEnergySavedWeekly(query: string) {
  try {
    const response = await axios.get(`${getServerBaseUri}/energy/saved/weekly/${query}`);
    // Temporary stores the transformed data
    const tempData:number[][] = [[], [], [], [], []];
    for (let i = 0; i < response.data.length; i += 1) {
      tempData[i % 4][Math.floor(i / 4)] = response.data[i].percentSaved;
    }
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches the average energy of a building ccategory or building
 * @param {string} query Building category or building to fetch for
 * @return {Array} response.data Fetched data
 */
export async function getEnergyAverage(query: string) {
  try {
    const response = await axios.get(`${getServerBaseUri}/energy/average/${query}`);
    return response.data;
  } catch (e) {
    return e;
  }
}
