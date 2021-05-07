import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';
import { IBuilding, IBuildings, IBuildingsData } from '../types/interfaces';

/**
 * Fetches a list of buildings
 * @param {string} query Query for the request
 * @return {IBuildingsData[]} Fetched data
 */
export async function getBuildings(query: string): Promise<IBuildingsData[]> {
  try {
    const response: IBuildings = await axios.get(`${getServerBaseUri}/buildings${query}`);
    return response.data;
  } catch (e) {
    return [e];
  }
}

/**
 * Fetches details about specific building by name
 * @param {string} query Name of building
 * @return {IBuildingsData} Building found
 */
export async function getSpecificBuilding(query: string): Promise<IBuildingsData> {
  try {
    const response: IBuilding = await axios.get(`${getServerBaseUri}/search?name=${query}`);
    return response.data;
  } catch (e) {
    return e;
  }
}
