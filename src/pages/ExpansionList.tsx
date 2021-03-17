import React from 'react';
import {
  Link as ReactRouterLink,
  withRouter,
} from 'react-router-dom';
import {
  expansion,
} from '../types';
import {
  getExpansions,
} from '../utils/api';
import Expansions from '../trees/Expansions';
import {
  formatExpansionName,
  formatYear,
} from '../utils/strings';
import {
  urlFriendlyExpansionName,
} from '../utils/urls';
import SearchPage from '../components/SearchPage';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import StyleIcon from '@material-ui/icons/Style';

const ExpansionList = () => {
  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <StyleIcon fontSize="large" />
        {' '}
        Sets
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        This page allows you to search for Pokémon expansions.
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        A fair amount of work has been put in to make PSA's data more usable, for example where they bundle all 1st Edition and unlimited Neo Genesis cards into one big set, this app separates them as
        {' '}
        <Link component={ReactRouterLink} to="/expansions#1acv-1">
          Neo Genesis (1st Edition)
        </Link>
        {' '}
        and
        {' '}
        <Link component={ReactRouterLink} to="/expansions#1acv">
          Neo Genesis
        </Link>.
      </Typography>
      <SearchPage
        apiFn={getExpansions}
        helperText="The expansion names are what PSA has chosen to display on their card labels and may not accurately represent a Pokémon expansion. Some work has been put in to try and correct this (i.e. the expansion PSA refers to as &ldquo;Pokemon Game&rdquo; will be found here by searching for &ldquo;Base Set&rdquo; instead)."
        id="expansion-select"
        label="Search for an expansion... (e.g. Base Set)"
        optionFormatter={(expansion: expansion) => formatExpansionName(expansion)}
        optionGroupFormatter={({ year }: expansion) => formatYear(year)}
        renderResult={(selectedExpansion: expansion) => (
          <Expansions expansion={selectedExpansion} />
        )}
        placeholder="Fossil or 2009 or Shadowless or Dutch or Foil Pack or Sticker ..."
        urlFriendlyName={urlFriendlyExpansionName}
      />
    </>
  )
}

export default withRouter(ExpansionList);