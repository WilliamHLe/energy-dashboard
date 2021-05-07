import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';
import {
  ICarriersAllReturn,
  ICarriersAll,
  IUsageAll,
  IUsageSlug,
  IUsageReturn,
  ICarriersCategory,
  ICarriersCategoryReturn,
  ISavedAll,
  ISavedAllReturn,
  ISavedTotal,
  ISavedWeekly,
  IAverage,
  IAverageData,
  ISavedTotalData,
} from '../types/interfaces';

/**
 * Fetches energy usage and transforms the data to be used in a line chart
 * @return {IUsageReturn[]} Transformed data
 */
export async function getEnergyUsageAll(): Promise<IUsageReturn[]> {
  try {
    const response: IUsageAll = await axios.get(`${getServerBaseUri}/energy/usage/`);
    // Temporary stores the transformed data
    const tempData: IUsageReturn[] = [];
    for (let i = 0; i < response.data.length; i += 1) {
      tempData.push({ name: response.data[i].category.name, data: [] });
      for (let j = 0; j < response.data[i].usage.length; j += 1) {
        const date = new Date(response.data[i].usage[j].date).getTime();
        tempData[i].data.push({
          x: date,
          y: response.data[i].usage[j].value,
        });
      }
    }
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches energy usage and transforms the data to be used in a line chart
 * @param {string} query Name of building category or building
 * @return {IUsageReturn[]} Transformed data
 */
export async function getEnergyUsageSlug(query: string): Promise<IUsageReturn[]> {
  try {
    const response: IUsageSlug = await axios.get(`${getServerBaseUri}/energy/usage/${query}`);
    // Temporary stores the transformed data
    const tempData: IUsageReturn[] = [];
    tempData.push({ name: query, data: [] });
    for (let i = 0; i < response.data.length; i += 1) {
      const date = new Date(response.data[i].date).getTime();
      tempData[0].data.push({
        x: date,
        y: response.data[i].value,
      });
    }
    return tempData;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches energy carriers for all building categories to be used in sankey diagram
 * @return {ICarriersAllReturn[]} Transformed data
 */
export async function getEnergyCarriersAll(): Promise<ICarriersAllReturn[]> {
  try {
    const response: ICarriersAll = await axios.get(`${getServerBaseUri}/energy/carriers`);
    // Temporary stores the transformed data
    const tempData:ICarriersAllReturn[] = [{
      keys: ['from', 'to', 'weight'],
      data: [],
      type: 'sankey',
      name: 'Energibærer',
    }];
    for (let i = 0; i < response.data.length; i += 1) {
      for (let j = 0; j < response.data[i].carriers.length; j += 1) {
        tempData[0].data.push([
          response.data[i].carriers[j].name,
          response.data[i].category.name,
          response.data[i].carriers[j].amount,
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
 * @return {ICarriersCategoryReturn} Transformed data
 */
export async function getEnergyCarriersCategory(category: string)
    : Promise<ICarriersCategoryReturn> {
  try {
    const response: ICarriersCategory = await axios.get(`${getServerBaseUri}/energy/carriers/${category}`);
    // Temporary stores the transformed data
    const tempData: ICarriersCategoryReturn = { name: 'Energibærer', colorByPoint: true, data: [] };
    for (let i = 0; i < response.data.length; i += 1) {
      tempData.data.push({ name: response.data[i].name, y: response.data[i].amount });
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
 * @return {ISavedAllReturn[]} Transformed data
 */
export async function getEnergySavedAll(): Promise<ISavedAllReturn[]> {
  try {
    const response: ISavedAll = await axios.get(`${getServerBaseUri}/energy/saved`);
    // Temporary stores the transformed data
    const tempData: ISavedAllReturn[] = [];
    for (let i = 0; i < response.data.length; i += 1) {
      tempData.push({
        name: response.data[i].category.name,
        y: parseFloat(response.data[i].saved.toFixed(2)),
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
 * @return {ISavedTotalData} Fetched data
 */
export async function getEnergySavedTotal(query: string): Promise<ISavedTotalData> {
  try {
    const response: ISavedTotal = await axios.get(`${getServerBaseUri}/energy/saved/total/${query}`);
    return response.data;
  } catch (e) {
    return e;
  }
}

/**
 * Fetches data for a building and transforms it to be used in a heatmap
 * @param {string} query Building to fetch for
 * @return {number[][]} Transformed data
 */
export async function getEnergySavedWeekly(query: string): Promise<number[][]> {
  try {
    const response: ISavedWeekly = await axios.get(`${getServerBaseUri}/energy/saved/weekly/${query}`);
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
 * @return {IAverageData} Fetched data
 */
export async function getEnergyAverage(query: string): Promise<IAverageData> {
  try {
    const response: IAverage = await axios.get(`${getServerBaseUri}/energy/average/${query}`);
    return response.data;
  } catch (e) {
    return e;
  }
}
