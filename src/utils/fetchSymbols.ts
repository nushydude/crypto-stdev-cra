import { config } from '../config';
import { DEFAULT_SYMBOLS } from '../consts/DefaultSymbols';

export const fetchSymbols = async (): Promise<Array<string>> => {
  try {
    const response = await fetch(`${config.API_URI}/api/symbols`);

    const { symbols } = await response.json();

    return symbols;
  } catch (error) {
    return DEFAULT_SYMBOLS;
  }
};
