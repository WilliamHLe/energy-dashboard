import axios from 'axios';
import { IHighscore, IHighscoreData } from '../types/interfaces';
import { getServerBaseUri } from './getServerBaseUri';

/**
 * Fetches the highscore list for building category
 * @param {string} query Building category name
 * @return {IHighscoreData[]} Highscore list
 */
export default async function getHighscoreList(query: string): Promise<IHighscoreData[]> {
  try {
    const response: IHighscore = await axios.get(`${getServerBaseUri}/highscores/${query}`);
    return response.data;
  } catch (e) {
    return [e];
  }
}
