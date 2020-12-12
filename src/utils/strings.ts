import {
  card,
  cardSimple,
  expansion,
  pokemon,
} from '../types';

export const formatCardName: ((card: card) => string) = ({
  name,
  number,
  variants,
}) => {
  const parts = [];

  if (number) {
    parts.push(`#${number} :`);
  } else {
    parts.push('#-- :')
  }

  parts.push(name);

  if (Array.isArray(variants)) {
    parts.push(`{${variants.join(', ')}}`);
  }

  return parts.join(' ');
}

export const formatCardSimpleName: ((card: cardSimple) => string) = ({
  name,
  number,
  variant,
}) => {
  const parts = [name];

  if (number) {
    parts.push(`(${number})`);
  }

  if (Array.isArray(variant)) {
    parts.push(`{${variant.join(', ')}}`);
  }

  return parts.join(' ');
}

type formatExpansionNameOptions = {
  showYear?: boolean
}
export const formatExpansionName: ((
  expansion: expansion,
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

export const formatPokemonName: ((pokemon: pokemon) => string) = ({
  language,
  name,
  number,
  translation,
}) => {
  const parts = [];

  if (number) {
    parts.push(number);
    parts.push('-');
  }

  parts.push(name);

  if (language) {
    parts.push(`[${translation ? `${translation}: ` : ''}${language}]`);
  }

  return parts.join(' ');
}

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