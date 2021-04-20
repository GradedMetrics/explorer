import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Variant from '../components/Variant';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
};

const DataNormalization = () => {
  return (
    <>
      <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping} id="normalization">
        What is Data Normalization?
      </Typography>
      <Typography variant="body1" paragraph>
        One of the major quality of life improvements this app deals with is PSA label inconsistencies. There are several different approaches this app takes to dealing with this:
      </Typography>
      <Box my={2}>
        <Typography variant="h6" gutterBottom variantMapping={headingVariantMapping}>
          Set Variants
        </Typography>
        <Typography variant="body1" paragraph>
          PSA sometimes defines sets as having a particular variant, like 1st Edition, but often they bundle multiple variants together to form one mammoth multi-variant set that nobody will ever care to collect every single card from.
        </Typography>
        <Typography variant="body1" paragraph>
          To deal with that, this app explicitly forces all cards into sets with the following variants:
        </Typography>
        <Typography variant="body1" paragraph>
          <Variant>Unlimited</Variant>,{' '}
          <Variant>1st Edition</Variant>,{' '}
          <Variant>Shadowless</Variant>,{' '}
          <Variant>Trainer Deck A</Variant>,{' '}
          <Variant>Trainer Deck B</Variant>,{' '}
          <Variant>&copy; 1999-2000</Variant>,{' '}
          <Variant>No Rarity Symbol</Variant>,{' '}
          <Variant>Blue Back</Variant>,{' '}
          <Variant>Green Back</Variant>,{' '}
          <Variant>Blue Back (Unnumbered)</Variant>,{' '}
          <Variant>No Symbol</Variant>,{' '}
          <Variant>Gold Foil</Variant>,{' '}
          <Variant>Silver Foil</Variant>,{' '}
          <Variant>Blue Foil</Variant>,{' '}
          <Variant>Rainbow Foil</Variant>,{' '}
          <Variant>Sparkle</Variant>,{' '}
          <Variant>Spectra</Variant>,{' '}
          <Variant>Tekno</Variant>,{' '}
          <Variant>Die-Cut</Variant>,{' '}
          <Variant>Black Collection</Variant>,{' '}
          <Variant>White Collection</Variant>,{' '}
          <Variant>Series I</Variant>,{' '}
          <Variant>Series II</Variant>{' '}
          and{' '}
          <Variant>Series III</Variant>.
        </Typography>
        <Typography variant="body1" paragraph>
          The variants above are unique to each set and will only contain cards which include that variant. A 1st Edition card will never appear in an Unlimited set, for example.
        </Typography>
        <Typography variant="body1" paragraph>
          Set variants will appear after a set's name in regular brackets (e.g.
          {' '}&ldquo;
          <Variant>Jungle (1st Edition)</Variant>
          &rdquo;). To avoid a lot of repetition, when the variant is Unlimited nothing will be displayed (e.g.
          {' '}&ldquo;
          <Variant>Jungle</Variant>
          &rdquo;).
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" gutterBottom variantMapping={headingVariantMapping}>
          Languages
        </Typography>
        <Typography variant="body1" paragraph>
          Along with the common set variants mentioned above, PSA also have a habit of either featuring sets which are tied to one specific language or creating mammoth multi-lingual sets which again nobody is ever going to be interested in collecting all of.
        </Typography>
        <Typography variant="body1" paragraph>
          To deal with that, this app defines a language for each set based on the languages of cards PSA have graded:
        </Typography>
        <Typography variant="body1" paragraph>
          <Variant>Chinese</Variant>,{' '}
          <Variant>Dutch</Variant>,{' '}
          <Variant>English</Variant>,{' '}
          <Variant>French</Variant>,{' '}
          <Variant>German</Variant>,{' '}
          <Variant>Italian</Variant>,{' '}
          <Variant>Japanese</Variant>,{' '}
          <Variant>Korean</Variant>,{' '}
          <Variant>Polish</Variant>,{' '}
          <Variant>Portuguese</Variant>,{' '}
          and {' '}
          <Variant>Spanish</Variant>.
        </Typography>
        <Typography variant="body1" paragraph>
          In this app an Italian card will never appear in the same set as a Korean card, for example - they'll all be contained within their own single-language set.
        </Typography>
        <Typography variant="body1" paragraph>
          Languages will appear after a set's name in square brackets (e.g.
          {' '}&ldquo;
          <Variant>Team Rocket [Japanese]</Variant>
          &rdquo;). To avoid a lot of repetition, when the language is English nothing will be displayed (e.g.
          {' '}&ldquo;
          <Variant>Team Rocket</Variant>
          &rdquo;).
        </Typography>
        <Typography variant="body1" paragraph>
          Sometimes a translation is available. When a translation is present it will appear as a prefix to the language inside the square brackets, separated by a colon (e.g.
          {' '}&ldquo;
          <Variant>Magicarpe [Magikarp: French]</Variant>
          &rdquo;).
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" gutterBottom variantMapping={headingVariantMapping}>
          Card Variants
        </Typography>
        <Typography variant="body1" paragraph>
          Pokémon cards will also show the set variant in the same way, however unlike with sets the cards have thousands of other possible variants.
        </Typography>
        <Typography variant="body1" paragraph>
          This is very messy, and again is something which PSA is inconsistent with. A good example with this is for Reverse Holofoil cards, which PSA will label as &ldquo;Reverse holofoil&rdquo;, or &ldquo;Reverse&rdquo;, or &ldquo;Rev&rdquo;, or &ldquo;RV&rdquo;, or &ldquo;Mirror&rdquo;, etc... (there are actually more than 10 different labels PSA apply to these particular cards!)
        </Typography>
        <Typography variant="body1" paragraph>
          Further normalisation is implemented to tackle this problem, with the intention of all cards of a similar variant showing the same variant label throughout the application. Card variants will be displayed in a similar way to set variants, but will be wrapped in curly brackets instead (e.g.
          {' '}&ldquo;
          <Typography variant="body1" color="secondary" variantMapping={{ body1: 'span', }}>Pikachu 025 {'{'}Reverse holofoil{'}'}</Typography>
          &rdquo;).
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h6" gutterBottom variantMapping={headingVariantMapping}>
          Typos, Corrections and Conformity
        </Typography>
        <Typography variant="body1" paragraph>
          This app tries its best to correct any typos present in PSA's data, along with making sure commonly-repeated names all conform with one another. A card which has had its name changed in this way will include an asterisk (<Typography variant="body1" color="secondary" variantMapping={{ body1: 'span', }}>*</Typography>) beside its name wherever it appears and will detail what the change was on the card's page.
        </Typography>
      </Box>
    </>
  );
}

export default DataNormalization;