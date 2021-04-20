import React from 'react';
import styled from 'styled-components';
import { withTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import {
  formatExpansionName,
} from '../utils/strings';
import {
  card,
} from '../types';

const Asterisk = withTheme(styled.span`
  color: ${props => props.theme.palette.secondary.main}
`);

type CardNameProps = {
  card: card
  defaultName?: string
  showExpansion?: boolean
  showNumberAsPrefix?: boolean
} & TypographyProps;

const CardName: React.FC<CardNameProps> = ({
  card,
  defaultName = '',
  showExpansion = false,
  showNumberAsPrefix = false,
  ...typographyProps
}) => {
  const {
    expansion,
    name,
    number,
    psaName,
    variants,
  } = card;

  return (
    <Box mb={2}>
      <Typography {...typographyProps} gutterBottom={!showExpansion && !!psaName}>
        {number && showNumberAsPrefix ? `#${number} : ` : undefined}
        {name || defaultName}
        {psaName ? <Asterisk>*</Asterisk> : undefined}
        {number && !showNumberAsPrefix ? ` ${number}` : undefined}
        {Array.isArray(variants) ? ` {${variants.join(', ')}}` : undefined}
      </Typography>
      {showExpansion && expansion ? (
        <Typography variant="subtitle1" gutterBottom={!!psaName}>
          {formatExpansionName(expansion)}
        </Typography>
      ) : undefined}
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