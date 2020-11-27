import {
  expansion,
} from '../types';

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

export const formatExpansionName: ((expansion: expansion) => string) = ({
  name,
  language,
  variant,
  year,
}) => {
  const parts = [
    formatYear(year),
    name
  ];

  if (language) {
    parts.push(`[${language}]`);
  }


  if (variant) {
    parts.push(`(${variant})`);
  }

  return parts.join(' ');
}