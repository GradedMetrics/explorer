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
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import ExpansionCard from '../components/ExpansionCard';
import GradeTable from '../components/GradeTable';
import Tree, { TreeItem } from '../components/Tree';

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
      <Tree
        children={(
          <>
            {cards.map(card => {
              const {
                id: cardId,
                name: cardName,
              } = card;

              const id = `${expansionId}-${cardId}`;

              return (
                <TreeItem
                  key={id}
                  id={id}
                  name={formatCardName({
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
        )}
        id={`${expansionId}-cards`}
        name={`${cards.length} different cards (click to view)`}
      />
    </>
  );
}

export default withSingleContentLoad(
  Expansions,
  ({ expansion }: ExpansionsProps) => getExpansion.bind(null, expansion.id)
);