import React from 'react';
import {
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

const ExpansionList = () => {
  return (
    <>
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