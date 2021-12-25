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
import WarningIcon from '@material-ui/icons/Warning';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import AutoComplete from '../components/AutoComplete';
import CardName from '../components/CardName';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';
import Loading from '../components/Loading';
import Note from '../components/Note';
import Tooltip from '../components/Tooltip';
import {
  sortPokemonExpansions,
} from '../utils/data';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
}

type PokemonExpansionsProps = {
  base: "misc" | "pokemon" | "variants",
  content: pokemonData,
  name: string,
}

const PokemonExpansions: React.FC<PokemonExpansionsProps> = ({
  base,
  content,
  name: pokemon
}) => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState<card>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  const basePathLength = `/${base}`.length;

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
      pathname,
    } = history.location;

    const [pathPokemon, pathCard] = pathname.substr(1 + basePathLength, 64).split('/');

    if (!pathCard) {
      setPageLoading(false);
      return;
    }

    const urlSelectedCard = data.find(({ id }) => id === pathCard.substr(0, 16));

    if (!urlSelectedCard) {
      history.replace({
        pathname: `/${base}/${pathPokemon}`,
      });

      setPageLoading(false);
      return;
    }

    setSelectedCard(urlSelectedCard);
    setPageLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const {
      pathname,
    } = history.location;
  
    const [pathPokemon] = pathname.substr(1 + basePathLength, 64).split('/');
    
    if (pathPokemon === urlFriendlyPokemonName({ name: pokemon })) {
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
      pathname,
    } = history.location;
    
    const [pathPokemon, pathCard] = pathname.substr(1 + basePathLength, 64).split('/');
    const newPathCard = urlFriendlyCardName(selectedCard);

    if (pathCard === newPathCard) {
      return;
    }

    if (!newPathCard) {
      history.replace({
        pathname: `/${base}/${pathPokemon}`,
      });
      return;
    }

    history.replace({
      pathname: `/${base}/${pathPokemon}/${newPathCard}`,
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
        {pokemon} {base === 'variants' ? 'variant' : 'card'}{total === 1 ? '' : 's'}...
      </Typography>
      <AutoComplete
        defaultSelectedOption={selectedCard}
        disabled={data.length === 1}
        id={`${pokemon}-expansions`}
        label={`Select a ${pokemon} card...`}
        options={sortPokemonExpansions(data)}
        optionFormatter={({ expansion, ...rest }) => {
          return `${formatCardName(rest, { defaultName: pokemon, numberParens: false, })} · ${formatExpansionName(expansion)}`;
        }}
        optionGroupFormatter={({ expansion }) => {
          return formatYear(expansion.year);
        }}
        onChange={handleSelect}
        placeholder={getDynamicCardSearchPlaceholder(data)}
        showNextPrev
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
              {selectedCard.expansion!.note ? (
                <Note text={selectedCard.expansion!.note} icon={<WarningIcon />} />
              ) : undefined}
              <ExpansionCard
                cardId={selectedCard.id}
                expansionId={selectedCard.expansion!.id} 
              />
              <Typography
                paragraph
                variant="body1"
                align="right"
              >
                <Link component={ReactRouterLink} to={`/sets/${selectedCard.expansion!.id}`}>
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