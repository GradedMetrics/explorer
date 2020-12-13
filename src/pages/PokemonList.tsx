import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  pokemon,
} from '../types';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
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
import Box from '@material-ui/core/Box';
import AutoComplete from '../components/AutoComplete';
import Loading from '../components/Loading';

type PokemonListProps = {
  content: pokemon[],
}

const PokemonList: React.FC<PokemonListProps> = ({
  content,
}) => {
  const history = useHistory();
  const [selectedPokemon, setSelectedPokemon] = React.useState<pokemon>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const {
      hash,
    } = history.location;

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
  }, []);

  React.useEffect(() => {
    if (isPageLoading) {
      return;
    }

    setLoading(false);

    const {
      hash,
    } = history.location;

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
      <AutoComplete
        defaultSelectedOption={selectedPokemon}
        id="pokemon-select"
        label="Search for a Pokémon... (e.g. Pikachu)"
        options={content}
        optionFormatter={(pokemon) => formatPokemonName(pokemon)}
        onChange={handleSelect}
        placeholder="Pikachu or 025 or German ..."
      />
      {!isLoading && selectedPokemon ? (
        <Box mt={2}>
          <PokemonExpansions name={selectedPokemon.name} />
        </Box>
      ) : undefined}
    </>
  );
}

export default withSingleContentLoad(
  PokemonList,
  () => getPokemonList,
);