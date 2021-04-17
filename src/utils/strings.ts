import {
  card,
  cardExpanded,
  cardRanking,
  cardSimple,
  expansion,
  expansionRanking,
  pokemon,
} from '../types';

/**
 * Generate a human-readable card name from a card object.
 * @param {card} card The card object.
 * @returns {string} The formatted card name.
 */
export const formatCardName: ((card: card | cardRanking) => string) = ({
  name,
  number,
  psaName,
  variants,
}) => {
  const parts = [];

  if (number) {
    parts.push(`#${number} :`);
  } else {
    parts.push('#-- :')
  }

  parts.push(name);

  if (psaName) {
    parts.push(`“${psaName}”`);
  }

  if (Array.isArray(variants)) {
    parts.push(`{${variants.join(', ')}}`);
  }

  return parts.join(' ');
}

type formatCardSimpleNameOptions = {
  defaultName?: string
  numberParens?: boolean
}

/**
 * Generate a human-readable card name from a simplified card object.
 * @param {cardSimple} card The simplified card object.
 * @returns {string} The formatted card name.
 */
export const formatCardSimpleName: ((
  card: cardSimple | cardExpanded,
  options?: formatCardSimpleNameOptions,
) => string) = ({
  name,
  number,
  psaName,
  variant,
}, options) => {
  const {
    defaultName,
    numberParens = true,
  } = (options || {});

  const parts = [name || defaultName];

  if (number) {
    parts.push(numberParens ? `(${number})` : number);
  }

  if (psaName) {
    parts[0] += '*';
  }

  if (Array.isArray(variant)) {
    parts.push(`{${variant.join(', ')}}`);
  }

  return parts.join(' ');
}

type formatExpansionNameOptions = {
  showYear?: boolean
}

/**
 * Generate a human-readable expansion name from an expansion object.
 * @param {expansion | expansionRanking} expansion The expansion object.
 * @param {formatExpansionNameOptions} options A collection of options.
 * @returns {string} The formatted expansion name.
 */
export const formatExpansionName: ((
  expansion: expansion | expansionRanking,
  options?: formatExpansionNameOptions
) => string) = ({
  name,
  language,
  variant,
  year,
}, options) => {
    const {
      showYear = true,
    } = (options || {});

    const parts = [name];

    if (showYear) {
      parts.unshift(formatYear(year));
    }

    if (language) {
      parts.push(`[${language}]`);
    }


    if (variant) {
      parts.push(`(${variant})`);
    }

    return parts.join(' ');
  }

type formatPokemonOptions = {
  hideNumber?: boolean
}

/**
 * Generate a human-readable Pokémon name from a Pokémon object.
 * @param {pokemon} pokemon The Pokémon object.
 * @returns {string} The formatted Pokémon name.
 */
export const formatPokemonName: ((pokemon: pokemon, options?: formatPokemonOptions) => string) = ({
  language,
  name,
  number,
  psaName,
  translation,
}, options = {}) => {
  const {
    hideNumber = false,
  } = options;

  if (psaName) {
    console.log(psaName);
  }

  const parts = [];

  if (!hideNumber && number) {
    parts.push(number);
    parts.push('-');
  }

  parts.push(name);

  if (language) {
    parts.push(`[${translation ? `${translation}: ` : ''}${language}]`);
  }

  return parts.join(' ');
}

/**
 * Convert short-form year values (e.g. 99, 01-03) to fully-qualified years.
 * @param {string} year The short-form year.
 * @returns {string} A fully-qualified formatted year.
 */
export const formatYear: ((year: string) => string) = (year) => {
  const getFullYear = (twoDigitYear: string) => {
    if (twoDigitYear.length === 4) {
      return twoDigitYear;
    }

    if (twoDigitYear.length !== 2) {
      throw new Error(`Unexpected year format provided to formatYear -> getFullYear: ${twoDigitYear}.`);
    }

    if (Number(twoDigitYear) > 94 && Number(twoDigitYear) <= 99) {
      return `19${twoDigitYear}`;
    }

    return `20${twoDigitYear}`;
  }

  if (!year) {
    return '';
  }

  if (year.length === 2) {
    return getFullYear(year);
  }

  if (year.length === 5 || year.length === 7) {
    const [yearStart, yearEnd] = year.split('-');
    return `${getFullYear(yearStart)}-${getFullYear(yearEnd)}`;
  }

  throw new Error(`Unexpected year format provided to formatYear: ${year}.`);
}

/**
 * Generate dynamic search placeholder text based on an array of cards.
 * This takes an array like `[{ number: 4, name: 'Pikachu', variants: ['Reverse'] }, ...]` and
 * generates a string like `e.g. 4 or Pikachu or Reverse ...`
 * @param {card[]} cards An array of cards to generate the placeholder from.
 */
export const getDynamicCardSearchPlaceholder = (cards: card[]): string => {
  const getRandomArrayEntry = (arr: any[]): any => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  if (!cards.length) {
    return 'No results found?';
  }

  const parts: any[] = [];

  const populatePartsArray = () => {
    // Cards with numbers.
    const numbered = cards.filter(card => card.number !== undefined);
    if (numbered.length) {
      parts.push(getRandomArrayEntry(numbered).number);
    }
  
    // Card names.
    parts.push(getRandomArrayEntry(cards).name);
  
    // Card variants.
    const variants = cards.filter(card => Array.isArray(card.variants) && card.variants.length).reduce((arr: any[], { variants }) => {
      const unique = variants!.filter(variant => arr.indexOf(variant) === -1);
      return [
        ...arr,
        ...unique,
      ];
    }, []);
    if (variants.length) {
      parts.push(getRandomArrayEntry(variants));
    }
  }

  populatePartsArray();

  if (cards.length > 1 && parts.length === 1) {
    /** 
     * If there was only one placeholder suggestion but multiple cards exist, grab another card to
     * include as well. This prevents ending up with a result like "e.g. Pikachu ..." and instead
     * gives a result like "e.g. Pikachu or Dugtrio ...".
     */
    populatePartsArray();
    
    if (parts[0] === parts[1]) {
      // This ensures we don't end up with a placeholder like "e.g. Hitmonchan or Hitmonchan ...".
      delete parts[1];
    }
  }

  return `e.g. ${parts.join(' or ')} ...`;
}

export const getDynamicCardExpandedSearchPlaceholder = (cards: cardExpanded[]): string => {
  const getRandomArrayEntry = (arr: any[]): any => {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  if (!cards.length) {
    return 'No results found?';
  }

  const parts = [];

  // Cards with numbers.
  const numbered = cards.filter(card => card.number !== undefined);
  if (numbered.length) {
    parts.push(getRandomArrayEntry(numbered).number);
  }

  // Card variants.
  const variants = cards.filter(card => Array.isArray(card.variant) && card.variant.length).reduce((arr: any[], { variant: variants }) => {
    const unique = variants!.filter(entry => arr.indexOf(entry) === -1);
    return [
      ...arr,
      ...unique,
    ];
  }, []) as string[];
  if (variants.length) {
    parts.push(getRandomArrayEntry(variants));
  }

  // Card expansion.
  parts.push(getRandomArrayEntry(cards).expansion.name);

  return `${parts.join(' or ')} ...`;
}

/**
 * This converts the name of a piece of content into a URL-friendly name.
 * This needs to match how the API formats friendly names to keep the data consistent.
 * @param {string} name The name to make friendly.
 */
export const urlFriendlyName = (name: string): string => {
  return name.replace(/[!?:/]/g, '');
}