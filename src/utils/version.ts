import {
  version,
} from '../types';

export const getVersion = (version: version) => {
  return `API v0.${version.v}.${version['@'].toString().substr(6, 16)}`;
}

export const getDataReliability = (version: version) => {
  const DAY_LENGTH = 86400000;
  const now = Date.now();
  let updated;

  const days = Math.ceil((now - version.d) / DAY_LENGTH);

  if (now - version.d < DAY_LENGTH) {
    updated = 'today';
  } else if (now - version.d < DAY_LENGTH * 2) {
    updated = 'yesterday';
  } else {
    updated = `${days > 7 ? 7 : days} days ago`;
  }

  return `Last updated ${updated}`;
}