import React from 'react';
import {
  gradeHistory,
} from '../types';
import Typography from '@material-ui/core/Typography';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import GradeTable from '../components/GradeTable';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import {
  getHistory,
} from '../utils/api';

type TrainerListProps = {
  content: gradeHistory[],
}

const TrainerList: React.FC<TrainerListProps> = ({
  content,
}) => {
  const [total, ...history] = content;

  const {
    cards: totalCards,
    total: totalSets,
  } = total;

  return (
    <>
      <Typography
        paragraph
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <BubbleChartIcon />
        {' '}
        Statistics
      </Typography>
      <Typography
        variant="body1"
      >
        This page reveals the total number of Pokémon-related items PSA has graded.
      </Typography>
      <Typography
        paragraph
        variant="body2"
      >
        As with the other data displayed throughout the app, this does not include graded autographs.
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        PSA has graded <strong>{totalCards?.toLocaleString()}</strong> unique Pokémon cards spanning <strong>{totalSets?.toLocaleString()}</strong> sets.
      </Typography>
      <GradeTable
        history={history}
        historyDeductsFromTotal={false}
        total={total.grades}
      />
    </>
  );
}

export default withSingleContentLoad(
  TrainerList,
  () => getHistory,
);