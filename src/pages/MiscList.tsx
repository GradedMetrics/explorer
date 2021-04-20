import React from 'react';
import {
  Link as ReactRouterLink,
  withRouter,
} from 'react-router-dom';
import {
  pokemon,
} from '../types';
import {
  getMiscList,
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

const MiscList = () => {
  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <NaturePeopleIcon fontSize="large" />
        {' '}
        Miscellaneous
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        This page allows you to search for cards which do not feature a Pokémon in their name. This includes cards like
        {' '}
        <Link component={ReactRouterLink} to="/misc/MiracleDiamond/10z1m">
          Miracle Diamond
        </Link>
        {' '}
        but doesn't include cards like
        {' '}
        <Link component={ReactRouterLink} to="/pokemon/Pikachu/e9y8">
          Pikachu {'{'}Illustrator, Holofoil{'}'}
        </Link>
        {' '} - for that you'll need to use the
        {' '}
        <Link component={ReactRouterLink} to="/pokemon"><FaceIcon fontSize="small" /> Pokémon</Link>
        {' '}
        section.
      </Typography>
      <SearchPage
        apiFn={getMiscList}
        basePath="/misc"
        id="misc-list"
        label="Search for a card... (e.g. Lass)"
        optionFormatter={(pokemon: pokemon) => formatPokemonName(pokemon, { hideNumber: true })}
        placeholder="Pokemon Collector or German ..."
        renderResult={(selectedPokemon: pokemon) => (
          <PokemonExpansions base="misc" name={selectedPokemon.name} />
        )}
        urlFriendlyName={urlFriendlyPokemonName}
      />
    </>
  );
}

export default withRouter(MiscList);