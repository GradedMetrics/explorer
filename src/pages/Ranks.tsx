import React from 'react';
import {
  ranking,
} from '../types';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import RankSegment from '../components/RankSegment';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import {
  getRanks,
} from '../utils/api';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
};


type RanksProps = {
  content: ranking,
}

const Ranks: React.FC<RanksProps> = ({
  content,
}) => {
  const {
    highestPerformingMonthlyCards,
    highestPerformingWeeklyCards,
    highestPerformingYearlyCards,
    highestPerformingMonthlySets,
    highestPerformingWeeklySets,
    highestPerformingYearlySets,
  } = content;

  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={headingVariantMapping}
      >
        <FormatListNumberedIcon fontSize="large" />
        {' '}
        Rankings
      </Typography>
      <Typography
        variant="body1"
      >
        This page reveals the content with the most grades over the past week, month (5 weeks) and year (52 weeks).
      </Typography>
      <Typography
        variant="body2"
      >
        Be aware that data is only updated once per week, so the data below may be offset by up to 7 days.
      </Typography>
      <RankSegment
        monthly={highestPerformingMonthlyCards}
        weekly={highestPerformingWeeklyCards}
        yearly={highestPerformingYearlyCards}
        title="Top 3 most graded cards..."
      />
      <Divider />
      <RankSegment
        monthly={highestPerformingMonthlySets}
        weekly={highestPerformingWeeklySets}
        yearly={highestPerformingYearlySets}
        title="Top 3 most graded sets..."
      />
    </>
  );
}

export default withSingleContentLoad(
  Ranks,
  () => getRanks,
);