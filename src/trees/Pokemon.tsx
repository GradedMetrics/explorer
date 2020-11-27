import React from 'react';
import {
  pokemonExpansion,
} from '../types';
import {
  getPokemon,
} from '../utils/api';
import {
  formatExpansionName,
} from '../utils/strings';
import TreeItem from '@material-ui/lab/TreeItem';
import withSingleContentLoad from '../hocs/withSingleContentLoad';

type PokemonProps = {
  content: pokemonExpansion[],
  name: string,
}

const Pokemon: React.FC<PokemonProps> = ({
  content,
  name
}) => {
  return (
    <>
      {content.map(({
        expansion,
        cards,
      }) => {
        const {
          id,
          name,
          variant,
        } = expansion;

        return (
          <TreeItem nodeId={`${name}-${id}`} label={formatExpansionName(expansion)}>
            {cards.length}
          </TreeItem>
        )
      })}
    </>
  )
}

export default withSingleContentLoad(
  Pokemon,
  ({ name }: PokemonProps) => getPokemon.bind(null, name)
);