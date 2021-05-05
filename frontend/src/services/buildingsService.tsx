import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';

/**
 * Fetches a list of buildings
 * @param {string} query Query for the request
 * @return {Array} request.data Fetched data
 */
export async function getBuildings(query: string) {
  try {
    const response = await axios.get(`${getServerBaseUri}/buildings${query}`);
    return response.data;
  } catch (e) {
    return [e];
  }
}

/**
 * Fetches details about specific building by name
 * @param {string} query Name of building
 * @return {Object} response.data[0] Building found
 */
export async function getSpecificBuilding(query: string) {
  try {
    const response = await axios.get(`${getServerBaseUri}/search?name=${query}`);
    return response.data[0];
  } catch (e) {
    return [e];
  }
}
