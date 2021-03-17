import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  card,
  cardExpanded,
  expansion,
  expansionDetailed,
} from '../types';
import {
  getExpansion,
} from '../utils/api';
import {
  formatCardName,
  getDynamicCardSearchPlaceholder,
} from '../utils/strings';
import {
  urlFriendlyCardName,
} from '../utils/urls';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import AutoComplete from '../components/AutoComplete';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';
import Loading from '../components/Loading';

type ExpansionsProps = {
  content: expansionDetailed,
  expansion: expansion,
}

const Expansions: React.FC<ExpansionsProps> = ({
  content,
  expansion,
}) => {
  const history = useHistory();
  const [selectedCard, setSelectedCard] = React.useState<card | cardExpanded>();
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

  const {
    cards: totalCards,
    id: expansionId,
  } = expansion;

  const {
    cards,
    history: gradeHistory,
    total,
  } = content;

  console.log(content, expansion);

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
            <ExpansionCard
              cardId={selectedCard.id}
              expansionId={expansionId} 
            />
          ) : (
            <GradeTable history={gradeHistory} total={total} />
          )}
        </Box>
      ) : undefined}
    </Box>
  )

  // return (
  //   <>
  //     <GradeTable history={history} total={total} />
  //     <Tree
  //       children={(
  //         <>
  //           {cards.map(card => {
  //             const {
  //               id: cardId,
  //               name: cardName,
  //             } = card;

  //             const id = `${expansionId}-${cardId}`;

  //             return (
  //               <TreeItem
  //                 key={id}
  //                 id={id}
  //                 name={formatCardName({
  //                   ...card,
  //                   name: cardName,
  //                 })}
  //               >
  //                 <ExpansionCard
  //                   cardId={cardId}
  //                   expansionId={expansionId}
  //                 />
  //               </TreeItem>
  //             )
  //           })}
  //         </>
  //       )}
  //       id={`${expansionId}-cards`}
  //       name={`${cards.length} different cards (click to view)`}
  //     />
  //   </>
  // );
}

export default withSingleContentLoad(
  Expansions,
  ({ expansion }: ExpansionsProps) => getExpansion.bind(null, expansion.id)
);