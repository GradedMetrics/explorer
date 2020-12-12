import React from 'react';
import {
  pokemonExpansion,
} from '../types';
import {
  getPokemon,
} from '../utils/api';
import {
  formatCardSimpleName,
  formatExpansionName,
} from '../utils/strings';
import TreeItem from '@material-ui/lab/TreeItem';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import ExpansionCard from '../components/ExpansionCard';

type PokemonExpansionsProps = {
  base?: string,
  content: pokemonExpansion[],
  name: string,
}

const PokemonExpansions: React.FC<PokemonExpansionsProps> = ({
  content,
  name: pokemon
}) => (
  <>
    {content.map(({
      expansion,
      cards,
    }) => {
      const {
        id: expansionId,
        name: expansionName,
        variant,
      } = expansion;

      const nodeId = `${pokemon}-${expansionName}-${expansionId}`;

      return (
        <TreeItem
          key={nodeId}
          nodeId={nodeId}
          label={formatExpansionName(expansion)}
        >
          {cards.map(card => {
            const {
              id: cardId,
              name: cardName,
            } = card;

            const cardNodeId = `${nodeId}-${cardId}`;

            return (
              <TreeItem
                key={cardNodeId}
                nodeId={cardNodeId}
                label={formatCardSimpleName({
                  ...card,
                  name: cardName || pokemon,
                })}
              >
                <ExpansionCard
                  cardId={cardId}
                  expansionId={expansionId} 
                />
              </TreeItem>
            )
          })}
        </TreeItem>
      )
    })}
  </>
);

export default withSingleContentLoad(
  PokemonExpansions,
  ({ base = 'pokemon', name }: PokemonExpansionsProps) => getPokemon.bind(null, base, name)
);