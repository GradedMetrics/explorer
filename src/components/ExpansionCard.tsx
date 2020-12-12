import React from 'react';
import {
  expansionCard,
} from '../types';
import {
  getExpansionCard,
} from '../utils/api';
import GradeTable from './GradeTable';
import withSingleContentLoad from '../hocs/withSingleContentLoad';

type ExpansionCardProps = {
  cardId: string,
  content: expansionCard,
  expansionId: string,
}

const ExpansionCard: React.FC<ExpansionCardProps> = ({
  content,
}) => {
  const {
    history,
    total,
  } = content;

  return <GradeTable history={history} total={total} />;
}

export default withSingleContentLoad(
  ExpansionCard,
  ({
    cardId,
    expansionId,
  }: ExpansionCardProps) => getExpansionCard.bind(this, expansionId, cardId)
);