import {
  card,
  expansion,
  pokemon,
  variant,
} from '../types';

/**
 * Create a URL-friendly card name from a card object.
 * @param {card} expansion The expansion object.
 * @returns {string} A URL-friendly expansion name.
 */
export const urlFriendlyCardName = (card?: card): string => {
  if (!card?.id) {
    return '';
  }

  return card.id;
}

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

/**
 * Create a URL-friendly Pokémon name from a Pokémon object.
 * @param {pokemon | variant} pokemon The Pokémon object.
 * @returns {string} A URL-friendly Pokémon name.
 */
export const urlFriendlyPokemonName = (pokemon?: pokemon | variant): string => {
  if (!pokemon?.name) {
    return '';
  }

  return pokemon.name.replace(/[!?:/"']/g, '');
}