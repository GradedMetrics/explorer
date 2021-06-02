import {
  card,
  expansion,
} from '../types';
import {
  formatExpansionName,
  formatYear,
} from '../utils/strings';

/**
 * Sort expansions by year, name and variant.
 * @param {expansion[]} expansions The expansions to sort.
 * @returns {expansion[]} A sorted set of expansions.
 */
export const sortExpansions: ((expansions: expansion[]) => expansion[]) = (expansions) => {
  const sortByExpansionName = (a: expansion, b: expansion) => {
    const aName = formatExpansionName(a);
    const bName = formatExpansionName(b);

    if (aName === bName) {
      console.error(`Encountered two expansions with identical formatted names: ${aName}.`);
      return 0;
    }

    return aName < bName ? -1 : 1;
  }

  return [...expansions].sort((a: expansion, b: expansion) => {
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
  })
}

/**
 * Sort Pokémon data by expansion year, expansion name and expansion variant.
 * @param {card[]} cards The cards to sort.
 * @returns {card[]} A sorted set of cards.
 */
export const sortPokemonExpansions: ((cards: card[]) => card[]) = (cards) => {
  const sortByExpansionName = (a: expansion, b: expansion) => {
    const aName = formatExpansionName(a);
    const bName = formatExpansionName(b);

    if (aName === bName) {
      console.error(`Encountered two expansions with identical formatted names: ${aName}.`);
      return 0;
    }

    return aName < bName ? -1 : 1;
  }

  return [...cards].sort((a: card, b: card) => {
    const aYear = formatYear(a.expansion!.year);
    const aYearAsNumber = Number(aYear.substr(0, 4));
    const bYear = formatYear(b.expansion!.year);
    const bYearAsNumber = Number(bYear.substr(0, 4));

    if (aYearAsNumber === bYearAsNumber) {
      const aIsMultiYear = aYear.length === 9;
      const bIsMultiYear = bYear.length === 9;

      if (aIsMultiYear && bIsMultiYear) {
        return sortByExpansionName(a.expansion!, b.expansion!);
      }

      if (aIsMultiYear) {
        return 1;
      }

      if (bIsMultiYear) {
        return -1;
      }

      return sortByExpansionName(a.expansion!, b.expansion!);
    }

    return aYearAsNumber < bYearAsNumber ? -1 : 1;
  })
}