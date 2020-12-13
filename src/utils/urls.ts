import {
  expansion,
} from '../types';

/**
 * Create a URL-friendly expansion name from an expansion object.
 * @param {expansion} expansion The expansion object.
 * @returns {string} A URL-friendly expansion name.
 */
export const urlFriendlyExpansionName = (expansion?: expansion): string => {
  if (!expansion?.id) {
    return '';
  }

  return expansion.id;
}