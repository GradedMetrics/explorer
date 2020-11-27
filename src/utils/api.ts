import {
  mapKeys,
} from './keys';
import {
  cardSimple,
  expansion,
  pokemon,
  pokemonExpansion,
  rawPokemonData,
} from '../types';
import {
  formatExpansionName,
  formatYear,
} from '../utils/strings';

const API_URL = 'https://api.gradedmetrics.com';

/**
 * Fetch JSON data from the API.
 * @param file The name of the file to fetch (with path).
 */
const fetch = async (file: string) => {
  const cachedData = sessionStorage.getItem(file);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const data = await window.fetch(`${API_URL}/${file}.json`).then(data => data.json());
  sessionStorage.setItem(file, JSON.stringify(data));
  return data;
}

/**
 * API key mapping returned from /keys.json.
 * This caches the result in session storage to be used throughout the application.
 */
export const keys = async () => {
  const keys = await fetch('keys');
  return keys;
}

/**
 * Pokémon expansions (sets) returned from /sets.json.
 */
export const getExpansions = async () => {
  const data = await fetch('sets');
  return mapKeys(Object.values(data)) as expansion[];
}

/**
 * Individual Pokémon data returned from /pokemon/{name}.json mapped as a list of expansions with
 * relevant cards matching that Pokémon.
 * @param name The name of the Pokémon to fetch data for.
 */
export const getPokemon = async (name: string) => {
  const response = await fetch(`pokemon/${name}`);

  if (!response) {
    throw new Error(`Could not load data for Pokémon: ${name}.`);
  }

  const mappedResponse = mapKeys(response) as rawPokemonData;

  if (!mappedResponse?.data) {
    throw new Error(`Pokémon data is in unexpected format?`);
  }

  const expansions = await getExpansions();

  const sortByExpansionName = (a: expansion, b: expansion) => {
    const aName = formatExpansionName(a);
    const bName = formatExpansionName(b);

    if (aName === bName) {
      throw new Error(`Encountered two expansions with identical formatted names: ${aName}.`)
    }

    return aName < bName ? -1 : 1;
  }

  return (expansions.reduce((arr: pokemonExpansion[], expansion: expansion) => {
    const cards = (mappedResponse.data as cardSimple[]).filter(({ set: expansionId }) => expansionId === expansion.id);

    if (!cards.length) {
      return arr;
    }

    return [
      ...arr,
      {
        expansion,
        cards,
      }
    ];
  }, []) as pokemonExpansion[]).sort(({ expansion: a }, { expansion: b }) => {
    const aYear = formatYear(a.year);
    const aYearAsNumber = Number(aYear.substr(0, 4));
    const bYear = formatYear(b.year);
    const bYearAsNumber = Number(bYear.substr(0, 4));

    if (aYearAsNumber === bYearAsNumber) {
      const aIsMultiYear = aYear.length === 9;
      const bIsMultiYear = bYear.length === 9;

      if (aIsMultiYear && bIsMultiYear) {
        return sortByExpansionName(a, b);
      }

      if (aIsMultiYear) {
        return 1;
      }

      if (bIsMultiYear) {
        return -1;
      }

      return sortByExpansionName(a, b);
    }

    return aYearAsNumber < bYearAsNumber ? -1 : 1;
  });
}

/**
 * Pokémon returned from /pokemon.json.
 */
export const getPokemonList = async () => {
  const data = await fetch('pokemon');
  return (mapKeys(data) as pokemon[]).sort(({ number: a }, { number: b }) => Number(a) > Number(b) ? 1 : -1);
}