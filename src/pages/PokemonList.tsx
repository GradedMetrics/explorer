import React from 'react';
import {
  Link as ReactRouterLink,
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
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import SearchPage from '../components/SearchPage';

const PokemonList = () => {
  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <FaceIcon fontSize="large" />
        {' '}
        Pokémon
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        This page allows you to search for entries belonging to specific Pokémon, like
        {' '}
        <Link component={ReactRouterLink} to="/pokemon/Pichu">
          Pichu
        </Link>.
        {' '}
        This allows you to search for cards like 
        {' '}
        <Link component={ReactRouterLink} to="/pokemon/Charizard/bnrw">
          Charizard 4 {'{'}Holofoil{'}'} · 1999 Base Set (1st Edition)
        </Link>
        {' '}
        and also includes trainer cards like
        {' '}
        <Link component={ReactRouterLink} to="/pokemon/Venusaur/1g1w7">
          Venusaur Spirit Link 89 · 2016 XY Evolutions
        </Link>
        .
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        Entries which do not feature a Pokémon in their name can be found in the
        {' '}
        <Link component={ReactRouterLink} to="/misc"><NaturePeopleIcon fontSize="small" /> Miscellaneous</Link>
        {' '}
        section.
      </Typography>
      <SearchPage
        apiFn={getPokemonList}
        basePath="/pokemon"
        id="pokemon-select"
        label="Search for a Pokémon... (e.g. Pikachu)"
        optionFormatter={(pokemon: pokemon) => formatPokemonName(pokemon)}
        placeholder="Pikachu or 025 or German ..."
        renderResult={(selectedPokemon: pokemon) => (
          <PokemonExpansions base="pokemon" name={selectedPokemon.name} />
        )}
        urlFriendlyName={urlFriendlyPokemonName}
      />
    </>
  );
}

export default withRouter(PokemonList);