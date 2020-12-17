import React from 'react';
import {
  withRouter,
} from 'react-router-dom';
import {
  pokemon,
} from '../types';
import {
  getPokemonList,
} from '../utils/api';
import PokemonExpansions from '../trees/PokemonExpansions';
import {
  formatPokemonName,
} from '../utils/strings';
import {
  urlFriendlyPokemonName,
} from '../utils/urls';
import SearchPage from '../components/SearchPage';

const PokemonList = () => {
  return (
    <>
      <SearchPage
        apiFn={getPokemonList}
        id="pokemon-select"
        label="Search for a Pokémon... (e.g. Pikachu)"
        optionFormatter={(pokemon: pokemon) => formatPokemonName(pokemon)}
        placeholder="Pikachu or 025 or German ..."
        renderResult={(selectedPokemon: pokemon) => (
          <PokemonExpansions name={selectedPokemon.name} />
        )}
        urlFriendlyName={urlFriendlyPokemonName}
      />
    </>
  );
}

export default withRouter(PokemonList);