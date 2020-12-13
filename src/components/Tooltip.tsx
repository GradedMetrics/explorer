/**
 * This extends Material UI's Autocomplete component available at
 * https://material-ui.com/components/autocomplete.
 */

import React from 'react';
import styled from 'styled-components';
import MUITooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

const Abbr = styled.abbr({
  borderBottom: '1px dotted #ccc',
  cursor: 'help',
  display: 'inline-block',
  textDecoration: 'none',
});

type AutoCompleteProps = {
  children: React.ReactNode
  placement?: "top" | "bottom-end" | "bottom-start" | "bottom" | "left-end" | "left-start" | "left" | "right-end" | "right-start" | "right" | "top-end" | "top-start" | undefined
  text: any,
  variant?: "button" | "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "inherit" | "overline" | "body2" | "subtitle1" | "subtitle2" | "body1" | "srOnly" | undefined
}

const Tooltip: React.FC<AutoCompleteProps> = ({
  children,
  placement = 'top',
  text,
  variant = 'inherit',
}) => {
  return (
    <MUITooltip
      placement={placement}
      title={text}
      >
      <Typography
        color="textPrimary"
        display="inline"
        variant={variant}
      >
        <Abbr>
          {children}
        </Abbr>
      </Typography>
    </MUITooltip>
  );
}

export default Tooltip;