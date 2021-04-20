import React from 'react';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import {
  gradeHistory,
} from '../types';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import GradeTable from '../components/GradeTable';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import {
  getHistory,
} from '../utils/api';

type StatsProps = {
  content: gradeHistory[],
}

const Stats: React.FC<StatsProps> = ({
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
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <BubbleChartIcon fontSize="large" />
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
        PSA has graded <strong>{totalCards?.toLocaleString()}</strong> unique Pokémon cards spanning <strong>{totalSets?.toLocaleString()}</strong>* sets.
      </Typography>
      <Typography
        paragraph
        variant="body2"
      >
        * This includes over 200 normalized sets (i.e. where PSA bundle 1st Edition, Shadowless and Unlimited Base Set cards into one mammoth &ldquo;Pokemon Game&rdquo; set, this app splits those into multiple smaller sets). For more information, please see the
        {' '}
        <Link component={ReactRouterLink} to="/help#data-normalization">
          <ContactSupportIcon fontSize="small" />
          {' '}
          Data Normalization
        </Link>
        {' '}
        help section.
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
  Stats,
  () => getHistory,
);