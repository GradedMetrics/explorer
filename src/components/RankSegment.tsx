import React from 'react';
import styled from 'styled-components';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
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

const RankListElement = styled.ol({
  listStyle: 'decimal',
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
  hidden: boolean
};

const RankList: React.FC<RankListProps> = ({
  data,
  hidden,
}) => {
  if (hidden || !Array.isArray(data) || !data.length) {
    return <></>;
  }

  if ((data[0] as cardRanking).set) {
    return (
      <Box component={RankListElement} my={2} p={2}>
        {(data as cardRanking[]).map((card, index) => {
          return (
            <Typography
              component="li"
              paragraph={index !== data.length - 1}
              variant="button"
              key={card.id}
            >
              <Typography display="block" variant="body2">
                <AddIcon fontSize="small" />
                {' '}
                {card.popIncrease.toLocaleString()}
              </Typography>
              <Link component={ReactRouterLink} to={`/sets/${card.set.id}/${Number(card.id).toString(36)}`}>
                {formatCardName(card)} {formatExpansionName(card.set)}
              </Link>
            </Typography>
          )
        })}
      </Box>
    )
  }

  return (
    <Box component={RankListElement} my={2} p={2}>
      {(data as expansionRanking[]).map((expansion, index) => {
        return (
          <Typography
            component="li"
            paragraph={index !== data.length - 1}
            variant="button"
            key={expansion.id}
          >
            <Typography display="block" variant="body2">
              <AddIcon fontSize="small" />
              {' '}
              {expansion.popIncrease.toLocaleString()}
            </Typography>
            <Link component={ReactRouterLink} to={`/sets/${expansion.id}`}>
              {formatExpansionName(expansion)}
            </Link>
          </Typography>
        )
      })}
    </Box>
  )
}

const RankSegment: React.FC<RankSegmentProps> = ({
  monthly,
  weekly,
  yearly,
  title,
}) => {
  const [selected, setSelected] = React.useState<number>(0);

  return (
    <Box mt={4} mb={6}>
      <Typography
        gutterBottom
        variant="h5"
        variantMapping={headingVariantMapping}
      >
        {title}
      </Typography>
      <Tabs
        value={selected}
        indicatorColor="primary"
        textColor="primary"
        onChange={(_, newValue) => setSelected(newValue)}
        aria-label="ranking data"
      >
        <Tab label="Weekly" />
        <Tab label="Monthly" />
        <Tab label="Yearly" />
      </Tabs>
      <RankList data={weekly} hidden={selected !== 0} />
      <RankList data={monthly} hidden={selected !== 1} />
      <RankList data={yearly} hidden={selected !== 2} />
    </Box>
  )
}

export default RankSegment;