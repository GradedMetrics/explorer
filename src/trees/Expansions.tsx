import React from 'react';
import {
  Link as ReactRouterLink,
  useHistory,
} from 'react-router-dom';
import {
  card,
  expansion,
  expansionDetailed,
  pokemon,
} from '../types';
import {
  getExpansion,
} from '../utils/api';
import {
  formatCardName,
  formatExpansionName,
  getDynamicCardSearchPlaceholder,
} from '../utils/strings';
import {
  urlFriendlyCardName,
  urlFriendlyPokemonName,
} from '../utils/urls';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import Box from '@material-ui/core/Box';
import CardName from '../components/CardName';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import FaceIcon from '@material-ui/icons/Face';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import AutoComplete from '../components/AutoComplete';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';
import Loading from '../components/Loading';
import PSASetLink from '../components/PSASetLink';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
}

type ExpansionsProps = {
  content: expansionDetailed,
  expansion: expansion,
}

const Expansions: React.FC<ExpansionsProps> = ({
  content,
  expansion,
}) => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState<card>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  const {
    cards: totalCards,
    id: expansionId,
  } = expansion;

  const {
    cards,
    history: gradeHistory,
    total,
  } = content;

  React.useEffect(() => {
    if (!Array.isArray(cards)) {
      return;
    }

    if (cards.length === 1) {
      setSelectedCard(cards[0]);
    }
  }, [cards]);

  React.useEffect(() => {
    const {
      hash,
    } = history.location;

    if (!hash) {
      setPageLoading(false);
      return;
    }

    const [hashExpansion, hashCard] = hash.substr(1, 64).split('|');

    if (!hashCard) {
      setPageLoading(false);
      return;
    }

    const urlSelectedCard = cards.find(({ id }) => id === hashCard.substr(0, 16));

    if (!urlSelectedCard) {
      history.replace({
        hash: hashExpansion,
      });

      setPageLoading(false);
      return;
    }

    setSelectedCard(urlSelectedCard);
    setPageLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setLoading(false);

    const {
      hash,
    } = history.location;
    
    const [hashExpansion, hashCard] = hash.substr(1, 64).split('|');

    const newCardHash = urlFriendlyCardName(selectedCard);

    if (hashCard === newCardHash) {
      return;
    }

    if (!newCardHash) {
      history.replace({
        hash: hashExpansion,
      });
      return;
    }

    history.replace({
      hash: `${hashExpansion}|${newCardHash}`,
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
        {formatExpansionName(expansion)}
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        There {totalCards === 1 ? 'is only 1 card in this set' : `are ${totalCards} different cards in this set`}...
      </Typography>
      <AutoComplete
        defaultSelectedOption={selectedCard}
        disabled={cards.length === 1}
        id={`expansion-${expansionId}`}
        label={`Select a card...`}
        options={cards}
        optionFormatter={(card) => formatCardName(card, { numberPrefix: true })}
        onChange={handleSelect}
        placeholder={getDynamicCardSearchPlaceholder(cards)}
      />
      {!isLoading ? (
        <Box mt={2}>
          {selectedCard ? (
            <>
              <CardName
                card={selectedCard}
                showNumberAsPrefix={true}
                variant="h5"
                variantMapping={headingVariantMapping}
              />
              <ExpansionCard
                cardId={selectedCard.id}
                expansionId={expansionId} 
              />
              {totalCards === 1 ? (
                <PSASetLink id={expansionId} />
              ) : undefined}
              {selectedCard.pokemon ? (
                <Typography
                  paragraph
                  variant="body1"
                  align="right"
                >
                  <Link component={ReactRouterLink} to={`pokemon#${urlFriendlyPokemonName(selectedCard as pokemon)}`}>
                    <ArrowRightAltIcon />
                    {' '}
                    Find other
                    {' '}
                    <FaceIcon />
                    {' '}
                    {selectedCard.pokemon}
                    {' '}
                    cards...
                  </Link>
                </Typography>
              ) : (
                <Typography
                  paragraph
                  variant="body1"
                  align="right"
                >
                  <Link component={ReactRouterLink} to={`misc#${urlFriendlyPokemonName(selectedCard as pokemon)}`}>
                    <ArrowRightAltIcon />
                    {' '}
                    Find other
                    {' '}
                    <NaturePeopleIcon />
                    {' '}
                    {selectedCard.name}
                    {' '}
                    cards...
                  </Link>
                </Typography>
              )}
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
              <GradeTable history={gradeHistory} total={total} />
              <PSASetLink id={expansionId} />
            </>
          )}
        </Box>
      ) : undefined}
    </Box>
  );
}

export default withSingleContentLoad(
  Expansions,
  ({ expansion }: ExpansionsProps) => getExpansion.bind(null, expansion.id)
);