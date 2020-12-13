import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  cardExpanded,
  mappedPokemonData,
} from '../types';
import {
  getPokemon,
} from '../utils/api';
import {
  formatCardSimpleName,
  formatExpansionName,
  formatYear,
} from '../utils/strings';
import {
  urlFriendlyCardName,
} from '../utils/urls';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import AutoComplete from '../components/AutoComplete';
import ExpansionCard from '../components/ExpansionCard';
import Loading from '../components/Loading';
import Tooltip from '../components/Tooltip';

type PokemonExpansionsProps = {
  base?: "pokemon" | "trainers",
  content: mappedPokemonData,
  name: string,
}

const PokemonExpansions: React.FC<PokemonExpansionsProps> = ({
  content,
  name: pokemon
}) => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState<cardExpanded>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  const {
    data,
    total,
  } = content;

  React.useEffect(() => {
    const {
      hash,
    } = history.location;

    if (!hash) {
      setPageLoading(false);
      return;
    }

    const [hashPokemon, hashCard] = hash.substr(1, 64).split('|');

    if (!hashCard) {
      setPageLoading(false);
      return;
    }

    const urlSelectedCard = data.find(({ id }) => id === hashCard.substr(0, 16));

    if (!urlSelectedCard) {
      history.replace({
        hash: hashPokemon,
      });

      setPageLoading(false);
      return;
    }

    setSelectedCard(urlSelectedCard);
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
    
    const [hashPokemon, hashCard] = hash.substr(1, 64).split('|');

    const newCardHash = urlFriendlyCardName(selectedCard);

    if (hashCard === newCardHash) {
      return;
    }

    history.replace({
      hash: `${hashPokemon}|${newCardHash}`,
    });
  }, [selectedCard]);

  const handleSelect = (card: cardExpanded) => {
    setLoading(true);
    setSelectedCard(card);
  }

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <Box my={2}>
      <Typography
        paragraph
        variant="body1"
      >
        PSA has graded {total}
        {' '}
        <Tooltip
          text="Cards which are not identical (i.e. from different sets or different variants)."
        >
          distinct
        </Tooltip>
        {' '}
        {pokemon} cards...
      </Typography>
      <AutoComplete
        defaultSelectedOption={selectedCard}
        id={`${pokemon}-expansions`}
        label={`Select a ${pokemon} card...`}
        options={data}
        optionFormatter={({ expansion, ...rest }) => {
          return `${formatCardSimpleName(rest, { defaultName: pokemon, numberParens: false, })} · ${formatExpansionName(expansion)}`;
        }}
        optionGroupFormatter={({ expansion }) => {
          return formatYear(expansion.year);
        }}
        onChange={handleSelect}
        placeholder="123 or Holofoil or Japanese or Gold Star ..."
      />
      {!isLoading && selectedCard ? (
        <Box mt={2}>
          <ExpansionCard
            cardId={selectedCard.id}
            expansionId={selectedCard.expansion.id} 
          />
        </Box>
      ) : undefined}
    </Box>
  );

  // return (
  //   <>
  //     <Tree
  //       children={(
  //         <>
  //           {content.map(({
  //             expansion,
  //             cards,
  //           }) => {
  //             const {
  //               id: expansionId,
  //               name: expansionName,
  //               variant,
  //             } = expansion;

  //             const nodeId = `${pokemon}-${expansionName}-${expansionId}`;

  //             return (
  //               <TreeItem
  //                 key={nodeId}
  //                 id={nodeId}
  //                 name={formatExpansionName(expansion)}
  //               >
  //                 {cards.map(card => {
  //                   const {
  //                     id: cardId,
  //                     name: cardName,
  //                   } = card;

  //                   const cardNodeId = `${nodeId}-${cardId}`;

  //                   return (
  //                     <TreeItem
  //                       key={cardNodeId}
  //                       id={cardNodeId}
  //                       name={formatCardSimpleName({
  //                         ...card,
  //                         name: cardName || pokemon,
  //                       })}
  //                     >
  //                       <ExpansionCard
  //                         cardId={cardId}
  //                         expansionId={expansionId} 
  //                       />
  //                     </TreeItem>
  //                   )
  //                 })}
  //               </TreeItem>
  //             )
  //           })}
  //         </>
  //       )}
  //       id={`${pokemon}-expansions`}
  //       name={`${content.length} different expansions (click to view)`}
  //     />
  //   </>
  // );
}

export default withSingleContentLoad(
  PokemonExpansions,
  ({ base = 'pokemon', name }: PokemonExpansionsProps) => getPokemon.bind(null, base, name)
);