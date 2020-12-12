import React from 'react';
import {
  expansion,
  expansionDetailed,
} from '../types';
import {
  getExpansion,
} from '../utils/api';
import {
  formatCardName,
} from '../utils/strings';
import TreeItem from '@material-ui/lab/TreeItem';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';

type ExpansionsProps = {
  content: expansionDetailed,
  expansion: expansion,
}

const Expansions: React.FC<ExpansionsProps> = ({
  content,
  expansion,
}) => {
  const {
    id: expansionId,
  } = expansion;

  const {
    cards,
    history,
    total,
  } = content;

  return (
    <>
      <GradeTable history={history} total={total} />
      {cards.map(card => {
        const {
          id: cardId,
          name: cardName,
        } = card;

        const cardNodeId = `${expansionId}-${cardId}`;

        return (
          <TreeItem
            key={cardNodeId}
            nodeId={cardNodeId}
            label={formatCardName({
              ...card,
              name: cardName,
            })}
          >
            <ExpansionCard
              cardId={cardId}
              expansionId={expansionId}
            />
          </TreeItem>
        )
      })}
    </>
  );
}

export default withSingleContentLoad(
  Expansions,
  ({ expansion }: ExpansionsProps) => getExpansion.bind(null, expansion.id)
);