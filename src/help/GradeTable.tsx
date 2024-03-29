import React from 'react';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import GradeTable, {
  historicBackground,
  totalBackground,
} from '../components/GradeTable';
import Variant from '../components/Variant';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import {
  getHistory,
} from '../utils/api';
import {
  gradeHistory,
} from '../types';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
};

const Greenie = styled.span({
  background: `rgba(${totalBackground}, 0.34)`,
  display: 'inline-block',
  padding: '0 4px',
});

const Yellowie = styled(Greenie)({
  background: `rgba(${historicBackground}, 0.34)`,
});

type GradeTableHelpProps = {
  content: gradeHistory[]
}

const GradeTableHelp: React.FC<GradeTableHelpProps> = ({
  content: allHistory,
}) => {
  const fakeGradeHistory = [{
    // 1 week - the indices are offset by 1 as allHistory[0] is the current total.
    date: allHistory[1].date,
    grades: {
      total: {
        grade: -6,
      },
      '10': {
        grade: -1,
      },
      '9': {
        grade: -5,
      }
    },
  }, {
    // 5 weeks.
    date: allHistory[4].date,
    grades: {
      total: {
        grade: -17,
      },
      '10': {
        grade: -2,
      },
      '9': {
        grade: -5,
      },
      '8': {
        half: -10,
      }
    }
  }, {
    // 52 weeks.
    date: allHistory[51].date,
    grades: {
      total: {
        grade: -23,
      },
      '10': {
        grade: -3,
      },
      '9': {
        grade: -10,
      },
      '8': {
        half: -17,
      }
    }
  }]

  return (
    <>
      <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping}>
        How does the Grade Population Table work?
      </Typography>
      <Typography variant="body1" paragraph>
        A grade population table within this app will look something like the example below:
      </Typography>
      <GradeTable
        hideHelpButton
        history={fakeGradeHistory}
        total={{
          total: {
            grade: 60,
            half: 10,
            qualifier: 30,
          },
          '10': {
            grade: 40,
          },
          '9': {
            grade: 20,
            qualifier: 3,
          },
          '8': {
            half: 17
          }
        }}
      />
      <Typography variant="body1" paragraph>
        The Total Graded column reveals that the total example population is <Variant>100</Variant> and is made up of <Variant>40</Variant> PSA 10 grades, <Variant>3</Variant> PSA 9 qualifier grades, <Variant>20</Variant> PSA 9 grades, and <Variant>17</Variant> PSA 8.5 grades.
      </Typography>
      <Typography variant="body1" paragraph>
        The
        {' '}
        <Greenie>green background</Greenie>
        {' '}
        between the grade name and the population represents the overall percentage that grade makes up in relation to the total population, allowing for quickly seeing which grades have the largest (or smallest) shares - the PSA 10 grade, with a population of <Variant>40</Variant>, makes up <Variant>40%</Variant> of the total population meaning this green background makes up 40% of the total area.
      </Typography>
      <Typography variant="body1" paragraph>
        In the past week, <Variant>6</Variant> new entries were graded, made up of <Variant>1</Variant> new PSA 10 (an increase of <Variant>2.56%</Variant>) and <Variant>5</Variant> new PSA 9s (an increase of <Variant>33.33%</Variant>). No new PSA 9 qualifier or PSA 8.5 grades were added at all.
      </Typography>
      <Hidden smUp>
        <Typography variant="caption" paragraph>
          Note: If you're viewing this on a mobile device you may not be able to see the grade history - try rotating your device to view it in landscape mode.
        </Typography>
      </Hidden>
      <Typography variant="body1" paragraph>
        The
        {' '}
        <Yellowie>yellow background</Yellowie>
        {' '}
        on each historic grade change represents the overall percentage that grade makes up in relation to all of the other grades achieved in that time period. In the past week the background of the PSA 9 grade is more prominent than that of the PSA 10 grade because it accounted for more of the overall number graded in that period (<Variant>5</Variant>/<Variant>6</Variant> compared with <Variant>1</Variant>/<Variant>6</Variant>).
      </Typography>
      <Typography variant="body1" paragraph>
        In the past 5 weeks, <Variant>2</Variant> PSA 10 grades and <Variant>5</Variant> PSA 9 grades have been added along with <Variant>10</Variant> PSA 8.5 grades. These numbers include the numbers from the &lsquo;1 week&rsquo; column, allowing us to say that 1 of the <Variant>2</Variant> PSA 10 grades which appeared in the past 5 weeks was from the past week and the other happened at some point between 5 weeks ago and the end of the week before last. Here the yellow background on the PSA 9 grade is less prominent as the PSA 8.5 grade accounts for a larger share of the total graded in this period. 
      </Typography>
      <Typography variant="body1" paragraph>
        In the 52 weeks column <Variant>17</Variant> PSA 8.5 grades have been added. The word <Variant><em>new</em></Variant> is used to denote that this grade was not present before this point and was newly added during this time.
      </Typography>
      <Typography>
        None of the <Variant>3</Variant> PSA 9 qualifier grades were graded in the past 52 weeks, so nothing is displayed in the historic section.
      </Typography>
    </>
  );
}

export default withSingleContentLoad(
  GradeTableHelp,
  () => getHistory,
);