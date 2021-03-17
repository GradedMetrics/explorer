import React from 'react';
import {
  Link as ReactRouterLink,
  useHistory,
} from 'react-router-dom';
import {
  card,
  expansion,
  expansionDetailed,
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
} from '../utils/urls';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import FaceIcon from '@material-ui/icons/Face';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import AutoComplete from '../components/AutoComplete';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';
import Loading from '../components/Loading';

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
        There are {totalCards} different cards in this set...
      </Typography>
      <AutoComplete
        defaultSelectedOption={selectedCard}
        id={`expansion-${expansionId}`}
        label={`Select a card...`}
        options={cards}
        optionFormatter={formatCardName}
        onChange={handleSelect}
        placeholder={getDynamicCardSearchPlaceholder(cards)}
      />
      {!isLoading ? (
        <Box mt={2}>
          {selectedCard ? (
            <>
              <Typography
                paragraph
                variant="h5"
                variantMapping={headingVariantMapping}
              >
                <Link component={ReactRouterLink} to={`/${selectedCard.isPokemon ? 'pokemon' : 'misc'}#${selectedCard.name}|${selectedCard.id}`}>
                  {selectedCard.isPokemon ? <FaceIcon /> : <NaturePeopleIcon />}
                  {' '}
                  {formatCardName(selectedCard)}
                </Link>
              </Typography>
              <ExpansionCard
                cardId={selectedCard.id}
                expansionId={expansionId} 
              />
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