import {
  mapKeys,
} from './keys';
import {
  card,
  expansion,
  expansionCard,
  expansionDetailed,
  pokemon,
  pokemonData,
  ranking,
  version as versionType,
} from '../types';
import {
  sortExpansions,
} from '../utils/data';

const API_URL = 'https://api.pokemetrics.org';

/**
 * Fetch JSON data from the API.
 * @param {string} file The name of the file to fetch (with path).
 * @param {boolean} [bypassCache=false] Whether to ignore cached data (used by `version`).
 * @returns {Promise<any>} API data.
 */
const fetch = async (file: string, bypassCache: boolean = false): Promise<any> => {
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
 * @returns {Promise<versionType>} Version API data.
 */
export const version = async (): Promise<versionType> => {
  const cachedVersion = sessionStorage.getItem('version');
  const version = await fetch('version', true) as versionType;

  if (!cachedVersion) {
    // There is no cached data, clear session storage anyway just to be safe.
    sessionStorage.clear();
    return version;
  }

  const {
    v: cachedVersionNumber,
  } = JSON.parse(cachedVersion) as versionType;

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
 * @returns {Promise<Object>} Keys API data.
 */
export const keys = async (): Promise<Object> => {
  const keys = await fetch('keys');
  return keys;
}

/**
 * Individual expansion data returned from /sets/{expansionId}.json.
 * @param {string} expansionId The ID of the expansion to fetch.
 * @returns {Promise<expansionDetailed>} Detailed Expansion API data.
 */
export const getExpansion = async (expansionId: string): Promise<expansionDetailed> => {
  const response = await fetch(`sets/${expansionId}`);
  const miscList = await getMiscList();
  const pokemonList = await getPokemonList();

  const {
    cards,
    ...rest
  } = mapKeys(response);

  return {
    cards: [...cards].map(card => ({
      ...card,
      // Pull any matching Pokémon names through. Cards like "Reshiram & Charizard GX" have multiple, so an array is required.
      pokemon: pokemonList.filter(pokemon => card.name.toLowerCase().indexOf(pokemon.name.toLowerCase()) !== -1),
    })).map(card => {
      const output = {
        ...card,
        pokemon:  card.pokemon?.map((entry: pokemon) => entry.name),
      }

      // if (output.pokemon) {
      //   output.rank = card.pokemon.rank;
      //   output.rankTotal = card.pokemon.total;
      // } else {
      //   const miscData = miscList.find(misc => card.name.toLowerCase() === misc.name.toLowerCase());

      //   output.rank = miscData?.rank;
      //   output.rankTotal = miscData?.total;
      // }

      return output
    }).sort((a, b) => {
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
 * @returns {Promise<expansionCard>} Expansion->Card API data.
 */
export const getExpansionCard = async (expansionId: string, cardId: string): Promise<expansionCard> => {
  const response = await fetch(`sets/${expansionId}/${cardId}`);
  return mapKeys(response as expansionCard);
}

/**
 * Pokémon expansions (sets) returned from /sets.json.
 * @returns {Promise<expansion[]>} Expansions API data.
 */
export const getExpansions = async (): Promise<expansion[]> => {
  const data = await fetch('sets');
  return sortExpansions(
    mapKeys(Object.values(data)).sort()
  ) as expansion[];
}

/**
 * Individual Pokémon data returned from /pokemon/{name}.json mapped as a list of expansions with
 * relevant cards matching that Pokémon.
 * @param {"misc"|"pokemon"} base The type of content to fetch.
 * @param {string} name The name of the Pokémon content to fetch data for.
 * @returns {Promise<pokemonData>} Pokémon API data.
 */
export const getPokemon = async (base: "misc" | "pokemon", name: string): Promise<pokemonData> => {
  const response = await fetch(`${base}/${name}`);

  if (!response) {
    throw new Error(`Could not load data for Pokémon: ${name}.`);
  }

  const mappedResponse = mapKeys(response) as pokemonData;

  if (!mappedResponse?.data) {
    throw new Error(`Pokémon data is in unexpected format?`);
  }

  const expansions = await getExpansions();

  const mappedCardData = mappedResponse.data.map((cardData: card) => ({
    ...cardData,
    expansion: expansions.find(({ id }) => id === cardData.set)
  })) as card[];

  return {
    ...mappedResponse,
    data: mappedCardData,
  };
}

const withRankInfo = (entry: pokemon, ranks: pokemon[]) => {
  const rankData = ranks.find(rankEntry => rankEntry.name === entry.name);

  return {
    rank: rankData?.rank,
    total: rankData?.total,
  };
}

/**
 * Pokémon returned from /pokemon.json.
 * @returns {Promise<pokemon[]>} Pokémon API data.
 */
export const getPokemonList = async (): Promise<pokemon[]> => {
  const data = await fetch('pokemon');
  const ranks = await getPokemonRanks();

  return (mapKeys(data) as pokemon[]).sort(({ number: a }, { number: b }) => Number(a) > Number(b) ? 1 : -1).map(entry => ({
    ...entry,
    ...withRankInfo(entry, ranks)
  }));
}

/**
 * Pokémon returned from /misc.json.
 * @returns {Promise<pokemon[]>} Pokémon API data.
 */
export const getMiscList = async (): Promise<pokemon[]> => {
  const data = await fetch('misc');
  const ranks = await getMiscRanks();

  return (mapKeys(data) as pokemon[]).sort(({ name: a }, { name: b }) => a.toLowerCase() > b.toLowerCase() ? 1 : -1).map(entry => ({
    ...entry,
    ...withRankInfo(entry, ranks)
  }));
}

export const getHistory = async (): Promise<expansion[]> => {
  const data = await fetch('history');
  return mapKeys(data.reverse());
}

/**
 * Ranking data returned from /ranks.json.
 * @returns {Promise<ranking>} Ranks API data.
 */
export const getRanks = async (): Promise<ranking> => {
  const data = await fetch('ranks');
  return mapKeys(data);
}

/**
 * Ranking data returned from /misc-ranks.json.
 * @returns {Promise<pokemon[]>} Misc ranks API data.
 */
export const getMiscRanks = async (): Promise<pokemon[]> => {
  const data = await fetch('misc-ranks');
  return mapKeys(data);
}

/**
 * Ranking data returned from /pokemon-ranks.json.
 * @returns {Promise<pokemon[]>} Pokémon ranks API data.
 */
export const getPokemonRanks = async (): Promise<pokemon[]> => {
  const data = await fetch('pokemon-ranks');
  return mapKeys(data);
}