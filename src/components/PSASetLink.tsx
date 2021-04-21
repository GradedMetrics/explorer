import React from 'react';
import styled from 'styled-components';
import Link from '@material-ui/core/Link';
import { withTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import {
  getRawIdentifier,
} from '../utils/strings';
import PSALogo from '../assets/psa-logo.png';

const Muted = withTheme(styled.span`
  color: ${props => props.theme.palette.text.secondary}
`);

type PSASetLinkProps = {
  id: string
}

const PSASetLink: React.FC<PSASetLinkProps> = ({
  id,
}) => {
  return (
    <Typography
      paragraph
      variant="body1"
      align="right"
    >
      <Link
        href={`https://www.psacard.com/pop/tcg-cards/!/!/${getRawIdentifier(id)}`}
        target="blank"
        rel="noopener"
      >
        <ArrowRightAltIcon />
        {' '}
        <img src={PSALogo} height="14px" style={{verticalAlign: '-6%'}} alt="PSA Logo" /> 
        {' '}
        View the set on PSA's pop report
      </Link>
      {' '}
      <Muted>(opens in new tab)</Muted>
    </Typography>
  )
}

export default PSASetLink;