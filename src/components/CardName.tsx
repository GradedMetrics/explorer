import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import {
  formatExpansionName,
} from '../utils/strings';
import {
  cardExpanded,
} from '../types';

const Asterisk = withTheme(styled.span`
  color: ${props => props.theme.palette.secondary.main}
`);

type CardNameProps = {
  card: cardExpanded
  defaultName?: string
  showExpansion?: boolean
} & TypographyProps;

const CardName: React.FC<CardNameProps> = ({
  card,
  defaultName = '',
  showExpansion = false,
  ...typographyProps
}) => {
  const {
    name,
    number,
    psaName,
    variant,
  } = card;

  const parts = [];

  parts.push(name || defaultName);

  if (psaName) {
    parts.push(<Asterisk>*</Asterisk>);
  }

  if (number) {
    parts.push(` ${number}`);
  }

  if (Array.isArray(variant)) {
    parts.push(` {${variant.join(', ')}}`);
  }

  if (showExpansion) {
    parts.push(` · ${formatExpansionName(card.expansion)}`)
  }

  return (
    <Box mb={2}>
      <Typography {...typographyProps} gutterBottom={!!psaName}>
        {parts}
      </Typography>
      {psaName ? (
        <Typography variant="body2">
          <Asterisk>*</Asterisk>
          {' '}
          PSA label this card as &ldquo;{psaName}&rdquo;. This has been renamed here either as a correction or to match similar cards.
        </Typography>
      ) : undefined}
    </Box>
  )
}

export default CardName;