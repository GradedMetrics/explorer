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
        variant="body2"
      >
        A fair amount of work has been put in to make PSA's data more usable. As an example, PSA refer to Pokémon's Base Set as &lsquo;Pokemon Game&rsquo; and bundle all 1st Edition, shadowless and unlimited cards (to name a few) into one big set; this app renames the set and separates it into different subsets:
        {' '}
        <Link component={ReactRouterLink} to="/sets/18ll-1">
          Base Set (1st Edition)
        </Link>,
        {' '}
        <Link component={ReactRouterLink} to="/sets/18ll-3">
          Base Set (Shadowless)
        </Link>
        {' '}
        and
        {' '}
        <Link component={ReactRouterLink} to="/sets/18ll">
          Base Set
        </Link>.
      </Typography>
      <SearchPage
        apiFn={getExpansions}
        basePath="/sets"
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