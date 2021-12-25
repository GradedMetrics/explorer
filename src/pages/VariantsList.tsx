import React from 'react';
import {
  Link as ReactRouterLink,
  withRouter,
} from 'react-router-dom';
import {
  variant,
} from '../types';
import {
  getVariantsList,
} from '../utils/api';
import PokemonExpansions from '../trees/PokemonExpansions';
import {
  urlFriendlyPokemonName,
} from '../utils/urls';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import SearchPage from '../components/SearchPage';

const VariantsList = () => {
  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <CallSplitIcon fontSize="large" />
        {' '}
        Variants
      </Typography>
      <Typography
        paragraph
        variant="body1"
      >
        This page allows you to search directly for card variants like
        {' '}
        <Link component={ReactRouterLink} to="/variants/Gold%20Star">
          Gold Star
        </Link>
        {' '}
        and
        {' '}
        <Link component={ReactRouterLink} to="/variants/Top%20Sixteen%20stamp">
          Top Sixteen stamp
        </Link>.
      </Typography>
      <Typography
        paragraph
        variant="body2"
      >
        You can also search for some very common variants like Holofoil and Reverse holofoil, but where they both contain over 5,000 entries each you may experience a lot of lag selecting those - especially if you're on a mobile device.
      </Typography>
      <SearchPage
        apiFn={getVariantsList}
        basePath="/variants"
        id="variants-list"
        label="Search for a variant... (e.g. Holofoil)"
        optionFormatter={(variant: variant) => variant.name}
        placeholder="Nintendo World stamp or Chosen Entry Prize ..."
        renderResult={(selectedVariant: variant) => (
          <PokemonExpansions base="variants" name={selectedVariant.name} />
        )}
        urlFriendlyName={urlFriendlyPokemonName}
      />
    </>
  );
}

export default withRouter(VariantsList);