import {
  expansion,
} from '../types';
import {
  formatExpansionName,
  formatYear,
} from '../utils/strings';

export const sortExpansions = (expansions: expansion[]) => {
  const sortByExpansionName = (a: expansion, b: expansion) => {
    const aName = formatExpansionName(a);
    const bName = formatExpansionName(b);

    if (aName === bName) {
      throw new Error(`Encountered two expansions with identical formatted names: ${aName}.`)
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