import axios from 'axios';
import { getServerBaseUri } from './getServerBaseUri';

/**
 * Fetches the highscore list for building category
 * @param {string} query Building category name
 * @return {Array} response.data Highscore list
 */
export default async function getHighscoreList(query: string) {
  try {
    const response = await axios.get(`${getServerBaseUri}/highscores/${query}`);
    return response.data;
  } catch (e) {
    return [e];
  }
}
