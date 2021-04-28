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

  if (now - version.d < DAY_LENGTH) {
    updated = 'today';
  } else if (now - version.d < DAY_LENGTH * 2) {
    updated = 'yesterday';
  } else {
    updated = `${Math.ceil((now - version.d) / DAY_LENGTH)} days ago`;
  }

  return `Last updated ${updated}`;
}