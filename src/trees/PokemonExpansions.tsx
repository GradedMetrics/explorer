import React from 'react';
import {
  Link as ReactRouterLink,
  useHistory,
} from 'react-router-dom';
import {
  card,
  pokemonData,
} from '../types';
import {
  getPokemon,
} from '../utils/api';
import {
  formatCardName,
  formatExpansionName,
  formatPokemonName,
  formatYear,
  getDynamicCardSearchPlaceholder,
  urlFriendlyName,
} from '../utils/strings';
import {
  urlFriendlyCardName,
  urlFriendlyPokemonName,
} from '../utils/urls';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import StyleIcon from '@material-ui/icons/Style';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import AutoComplete from '../components/AutoComplete';
import CardName from '../components/CardName';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';
import Loading from '../components/Loading';
import Tooltip from '../components/Tooltip';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
}

type PokemonExpansionsProps = {
  base?: "misc" | "pokemon",
  content: pokemonData,
  name: string,
}

const PokemonExpansions: React.FC<PokemonExpansionsProps> = ({
  content,
  name: pokemon
}) => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState<card>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  console.log(content);

  const {
    data,
    grades,
    history: gradeHistory,
    total,
  } = content;

  React.useEffect(() => {
    if (!Array.isArray(data)) {
      return;
    }

    if (data.length === 1) {
      setSelectedCard(data[0]);
    }
  }, [data]);

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
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const [hashPokemon] = history.location.hash.substr(1, 64).split('|');
    
    if (hashPokemon === urlFriendlyPokemonName({ name: pokemon })) {
      return;
    }

    if (!selectedCard) {
      return;
    }

    if (!isPageLoading) {
      setPageLoading(true);
      return;
    }

    setSelectedCard(undefined);
    setPageLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPageLoading, pokemon]);

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

    if (!newCardHash) {
      history.replace({
        hash: hashPokemon,
      });
      return;
    }

    history.replace({
      hash: `${hashPokemon}|${newCardHash}`,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCard]);

  const handleSelect = (card: card) => {
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
        variant="h4"
        variantMapping={headingVariantMapping}
      >
        {formatPokemonName(content)}
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        PSA has graded {total}
        {' '}
        <Tooltip
          placement="right"
          text="Cards which are not identical (i.e. from different sets or different variants)."
        >
          distinct
        </Tooltip>
        {' '}
        {pokemon} card{total === 1 ? '' : 's'}...
      </Typography>
      <AutoComplete
        defaultSelectedOption={selectedCard}
        disabled={data.length === 1}
        id={`${pokemon}-expansions`}
        label={`Select a ${pokemon} card...`}
        options={data}
        optionFormatter={({ expansion, ...rest }) => {
          return `${formatCardName(rest, { defaultName: pokemon, numberParens: false, })} · ${formatExpansionName(expansion)}`;
        }}
        optionGroupFormatter={({ expansion }) => {
          return formatYear(expansion.year);
        }}
        onChange={handleSelect}
        placeholder={getDynamicCardSearchPlaceholder(data)}
      />
      {!isLoading ? (
        <Box mt={2}>
          {selectedCard ? (
            <>
              <CardName
                card={selectedCard}
                defaultName={pokemon}
                showExpansion
                variant="h5"
                variantMapping={headingVariantMapping}
              />
              <ExpansionCard
                cardId={selectedCard.id}
                expansionId={selectedCard.expansion!.id} 
              />
              <Typography
                paragraph
                variant="body1"
                align="right"
              >
                <Link component={ReactRouterLink} to={`/expansions#${selectedCard.expansion!.id}`}>
                  <ArrowRightAltIcon />
                  {' '}
                  <StyleIcon />
                  {' '}
                  {formatExpansionName(selectedCard.expansion!)}
                </Link>
              </Typography>
            </>
          ) : (
            <>
              <Typography
                paragraph
                variant="h5"
                variantMapping={headingVariantMapping}
              >
                All Grades
              </Typography>
              <GradeTable history={gradeHistory} total={grades} />
            </>
          )}
        </Box>
      ) : undefined}
    </Box>
  );
}

export default withSingleContentLoad(
  PokemonExpansions,
  ({ base = 'pokemon', name }: PokemonExpansionsProps) => getPokemon.bind(null, base, urlFriendlyName(name))
);