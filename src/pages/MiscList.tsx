import React from 'react';
import {
  Link as ReactRouterLink,
  useHistory,
  withRouter,
} from 'react-router-dom';
import {
  pokemon,
} from '../types';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
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
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import AutoComplete from '../components/AutoComplete';
import Loading from '../components/Loading';

type PokemonListProps = {
  content: pokemon[],
}

const PokemonList: React.FC<PokemonListProps> = ({
  content,
}) => {
  const history = useHistory();
  const {
    hash,
  } = history.location;
  const [selectedPokemon, setSelectedPokemon] = React.useState<pokemon>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    if (!hash) {
      setPageLoading(false);
      return;
    }

    const urlSelectedPokemon = content.find(pokemon => urlFriendlyPokemonName(pokemon) === hash.split('|')[0].substr(1, 64));

    if (!urlSelectedPokemon) {
      history.replace({
        hash: '',
      });

      setPageLoading(false);
      return;
    }

    setSelectedPokemon(urlSelectedPokemon);
    setPageLoading(false);
  }, [hash]);

  React.useEffect(() => {
    if (isPageLoading) {
      return;
    }

    setLoading(false);

    const newHash = urlFriendlyPokemonName(selectedPokemon);

    if (hash.split('|')[0].substr(1, 64) === newHash) {
      return;
    }

    history.replace({
      hash: newHash,
    });
  }, [selectedPokemon]);

  const handleSelect = (pokemon: pokemon) => {
    setLoading(true);
    setSelectedPokemon(pokemon);
  }

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <>
      <Typography
        paragraph
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <NaturePeopleIcon />
        {' '}
        Miscellaneous Cards
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        This page allows you to search for cards which do not feature a Pokémon in their name. This includes cards like
        {' '}
        <Link component={ReactRouterLink} to="#MiracleDiamond">
          Miracle Diamond
        </Link>
        {' '}
        but doesn't include cards like
        {' '}
        <Link component={ReactRouterLink} to="/pokemon#Pikachu|e9y8">
          Pikachu {'{'}Illustrator, Holofoil{'}'}
        </Link>
        {' '} - for that you'll need to use the
        {' '}
        <Link component={ReactRouterLink} to="/pokemon"><FaceIcon fontSize="small" /> Pokémon</Link>
        {' '}
        section.
      </Typography>
      <AutoComplete
        defaultSelectedOption={selectedPokemon}
        id="pokemon-select"
        label="Search for a card... (e.g. Lass)"
        options={content}
        optionFormatter={(pokemon) => formatPokemonName(pokemon)}
        onChange={handleSelect}
        placeholder="Pokemon Collector or German ..."
      />
      {!isLoading && selectedPokemon ? (
        <Box mt={2}>
          <PokemonExpansions base="misc" name={selectedPokemon.name} />
        </Box>
      ) : undefined}
    </>
  );
}

export default withRouter(withSingleContentLoad(
  PokemonList,
  () => getMiscList,
));