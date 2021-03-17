import React from 'react';
import styled from 'styled-components';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import {
  cardRanking,
  expansionRanking,
} from '../types';
import {
  formatCardName,
  formatExpansionName,
} from '../utils/strings';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
}

type RankSegmentProps = {
  monthly?: cardRanking[] | expansionRanking[],
  weekly?: cardRanking[] | expansionRanking[],
  yearly?: cardRanking[] | expansionRanking[],
  title: string
}

const CustomBox = styled.div({
  background: 'linear-gradient(135deg, rgba(205,238,143,0.1) 0%,rgba(255,246,143,0.1) 100%)',
});

const CustomH3 = styled.h3({
  fontWeight: 300,
})

const RankListElement = styled.ol({
  listStyle: 'none',
  margin: '16px 0 0',
  padding: 0,

  'li': {
    display: 'flex',
    fontSize: 16,

    '> *': {
      lineHeight: '22px',

      '&:first-child': {
        flexShrink: 0,
        fontSize: 16,
        lineHeight: '24px',
        marginRight: 16,
      },
    },
  }
});

type RankListProps = {
  data?: cardRanking[] | expansionRanking[]
};

const RankList: React.FC<RankListProps> = ({
  data,
}) => {
  if (!Array.isArray(data) || !data.length) {
    return <></>;
  }

  console.log(data);

  if ((data[0] as cardRanking).set) {
    return (
      <RankListElement>
        {(data as cardRanking[]).map((card, index) => {
          return (
            <Typography
              component="li"
              paragraph={index !== data.length - 1}
              variant="button"
            >
              <Typography display="block" variant="body2">
                <AddIcon fontSize="small" />
                {' '}
                {card.popIncrease.toLocaleString()}
              </Typography>
              <Link component={ReactRouterLink} to={`/expansions#${card.set.id}|${Number(card.id).toString(36)}`}>
                {formatCardName(card)} {formatExpansionName(card.set)}
              </Link>
            </Typography>
          )
        })}
      </RankListElement>
    )
  }

  return (
    <RankListElement>
      {(data as expansionRanking[]).map((expansion, index) => {
        return (
          <Typography
            component="li"
            paragraph={index !== data.length - 1}
            variant="button"
          >
            <Typography display="block" variant="body2">
              <AddIcon fontSize="small" />
              {' '}
              {expansion.popIncrease.toLocaleString()}
            </Typography>
            <Link component={ReactRouterLink} to={`/expansions#${expansion.id}`}>
              {formatExpansionName(expansion)}
            </Link>
          </Typography>
        )
      })}
    </RankListElement>
  )
}

const RankSegment: React.FC<RankSegmentProps> = ({
  monthly,
  weekly,
  yearly,
  title,
}) => {
  return (
    <Box mt={4} mb={6}>
      <Typography
        gutterBottom
        variant="h5"
        variantMapping={headingVariantMapping}
      >
        {title}
      </Typography>
      <Paper>
        <Box component={CustomBox} my={2} p={4}>
          <Typography
            component={CustomH3}
            gutterBottom
            variant="h6"
            variantMapping={headingVariantMapping}
          >
            In the past week...
          </Typography>
          <RankList data={weekly} />
        </Box>
      </Paper>
      <Paper>
        <Box component={CustomBox} my={2} p={4}>
          <Typography
            component={CustomH3}
            gutterBottom
            variant="h6"
            variantMapping={headingVariantMapping}
          >
            In the past month...
          </Typography>
          <RankList data={monthly} />
        </Box>
      </Paper>
      <Paper>
        <Box component={CustomBox} my={2} p={4}>
          <Typography
            component={CustomH3}
            gutterBottom
            variant="h6"
            variantMapping={headingVariantMapping}
          >
            In the past year...
          </Typography>
          <RankList data={yearly} />
        </Box>
      </Paper>
    </Box>
  )
}

export default RankSegment;