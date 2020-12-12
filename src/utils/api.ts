import {
  mapKeys,
} from './keys';
import {
  cardSimple,
  expansion,
  expansionDetailed,
  pokemon,
  pokemonExpansion,
  rawPokemonData,
} from '../types';
import {
  sortExpansions,
} from '../utils/data';

const API_URL = 'https://api.gradedmetrics.com';

/**
 * Fetch JSON data from the API.
 * @param {string} file The name of the file to fetch (with path).
 * @param {boolean} [bypassCache=false] Whether to ignore cached data (used by `version`).
 */
const fetch = async (file: string, bypassCache: boolean = false) => {
  if (!bypassCache) {
    // Check for cached data and return that instead of calling the API (default behaviour).
    const cachedData = sessionStorage.getItem(file);

    if (cachedData) {
      return JSON.parse(cachedData);
    }
  }

  const data = await window.fetch(`${API_URL}/${file}.json`).then(data => data.json());
  sessionStorage.setItem(file, JSON.stringify(data));
  return data;
}

/**
 * Get the current data version.
 * This API grabs the cached version (if it exists) and then fetches a fresh copy of version.json
 * from the API. If the two are not in sync it means the locally-cached data is out of date and
 * needs updating - it does this by clearing session storage.
 */
export const version = async () => {
  const cachedVersion = sessionStorage.getItem('version');
  const version = await fetch('version', true);

  if (!cachedVersion) {
    // There is no cached data, clear session storage anyway just to be safe.
    sessionStorage.clear();
    return version;
  }

  const {
    v: cachedVersionNumber,
  } = JSON.parse(cachedVersion);

  const {
    v: newVersionNumber,
  } = version;

  if (cachedVersionNumber === newVersionNumber) {
    // The latest version matches the cached version, do nothing.
    return version;
  }

  // The cached version is out of date, clear session storage.
  console.log(`New version ${newVersionNumber} detected. Upgrading from ${cachedVersionNumber}...`);
  sessionStorage.clear();
  return version;
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
 * Individual expansion data returned from /sets/{expansionId}.json.
 * @param {string} expansionId The ID of the expansion to fetch.
 */
export const getExpansion = async (expansionId: string) => {
  const response = await fetch(`sets/${expansionId}`);

  const {
    cards,
    ...rest
  } = mapKeys(response);

  return {
    cards: [...cards].sort((a, b) => {
      const {
        name: aName,
        number: aNumber,
        variants: aVariants = [],
      } = a;
      const {
        name: bName,
        number: bNumber,
        variants: bVariants = [],
      } = b;

      if (aNumber && bNumber === undefined) {
        return 1;
      }

      if (aNumber === undefined && bNumber) {
        return -1;
      }

      if ((aNumber === undefined && bNumber === undefined) || (aNumber === bNumber)) {
        if (aName === bName) {
          return aVariants.toString() > bVariants.toString() ? 1 : -1;
        }

        return aName > bName ? 1 : -1;
      }

      // @ts-ignore: Object is possibly undefined
      return aNumber > bNumber ? 1 : -1;
    }),
    ...rest,
  } as expansionDetailed;
}

/**
 * Individual expansion card data returned from /sets/{expansionId}/{cardId}.json.
 * @param {string} expansionId The ID of the expansion (set) which the card belongs to.
 * @param {string} cardId The ID of the card to fetch data for.
 */
export const getExpansionCard = async (expansionId: string, cardId: string) => {
  const response = await fetch(`sets/${expansionId}/${cardId}`);
  return mapKeys(response);
}

/**
 * Pokémon expansions (sets) returned from /sets.json.
 */
export const getExpansions = async () => {
  const data = await fetch('sets');
  return sortExpansions(
    mapKeys(Object.values(data)).sort()
   ) as expansion[];
}

/**
 * Individual Pokémon data returned from /pokemon/{name}.json mapped as a list of expansions with
 * relevant cards matching that Pokémon.
 * @param name The name of the Pokémon to fetch data for.
 */
export const getPokemon = async (base: string, name: string) => {
  const response = await fetch(`${base}/${name}`);

  if (!response) {
    throw new Error(`Could not load data for Pokémon: ${name}.`);
  }

  const mappedResponse = mapKeys(response) as rawPokemonData;

  if (!mappedResponse?.data) {
    throw new Error(`Pokémon data is in unexpected format?`);
  }

  const expansions = await getExpansions();

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
  }, []) as pokemonExpansion[]);
}

/**
 * Pokémon returned from /pokemon.json.
 */
export const getPokemonList = async () => {
  const data = await fetch('pokemon');
  return (mapKeys(data) as pokemon[]).sort(({ number: a }, { number: b }) => Number(a) > Number(b) ? 1 : -1);
}

/**
 * Pokémon returned from /pokemon.json.
 */
export const getTrainerList = async () => {
  const data = await fetch('trainers');
  return (mapKeys(data) as pokemon[]).sort(({ name: a }, { name: b }) => a > b ? 1 : -1);
}