import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import GradeTable, {
  historicBackground,
  totalBackground,
} from '../components/GradeTable';
import PSALogo from '../assets/psa-logo.png';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
};

const Greenie = styled.span({
  background: `rgba(${totalBackground}, 0.34)`,
  display: 'inline-block',
  padding: '0 4px',
});

const Yellowie = styled(Greenie)({
  background: `rgba(${historicBackground}, 0.34)`,
});

type VariantProps = {
  children: React.ReactNode,
}

const Variant: React.FC<VariantProps> = ({ children }) => (
  <Typography
    color="secondary"
    display="inline"
    variant="body1"
    variantMapping={{ body1: 'span', }}
  >
    {children}
  </Typography>
)

const fakeGradeTotal = {
  total: {
    grade: 60,
    half: 10,
    qualifier: 30,
  },
  '10': {
    grade: 40,
  },
  '9': {
    grade: 20,
    qualifier: 3,
  },
  '8': {
    half: 17
  }
};

const fakeGradeHistory = new Array(52).fill({
  date: 0,
  grades: {
    total: {},
  },
});

// 1 week
fakeGradeHistory[0] = {
  date: Number(new Date()),
  grades: {
    total: {
      grade: -6,
    },
    '10': {
      grade: -1,
    },
    '9': {
      grade: -5,
    }
  }
}

// 5 weeks
fakeGradeHistory[4] = {
  date: Number(new Date()),
  grades: {
    total: {
      grade: -17,
    },
    '10': {
      grade: -2,
    },
    '9': {
      grade: -5,
    },
    '8': {
      half: -10,
    }
  }
}

// 52 weeks
fakeGradeHistory[51] = {
  date: Number(new Date()),
  grades: {
    total: {
      grade: -23,
    },
    '10': {
      grade: -3,
    },
    '9': {
      grade: -10,
    },
    '8': {
      half: -15,
    }
  }
}

const Home = () => {
  return (
    <>
      <Typography
        gutterBottom
        variant="h4"
        variantMapping={{ h4: 'h1' }}
      >
        <LocalFloristIcon fontSize="large" />
        {' '}
        Welcome!
      </Typography>
      <Typography variant="body1" paragraph>
        Professional Sports Authenticator (<img src={PSALogo} height="16px" style={{verticalAlign: '-6%'}} alt="PSA Logo" />; <Link href="https://psacard.com" rel="noopener">https://psacard.com</Link>)
        {' '}
        is the largest and most trusted third-party trading card authentication and grading company in the world - or at least that's what it says on their website.
        {' '}
        They've been grading Pokémon cards for over 20 years and have graded well over 1 million of them.
      </Typography>
      <Typography variant="body1" paragraph>
        This web app - which isn't associated with PSA in any way - aims to add quality of life improvements to the <Link href="https://www.psacard.com/pop" rel="noopener">PSA Population Report</Link>, focussing specifically on Pokémon cards.
      </Typography>
      <Typography variant="body1" paragraph>
        Use the tabs above to navigate between the different sections.
      </Typography>
      <Typography variant="body1" paragraph>
        This app is in its infancy - more content and features will be added over time.
      </Typography>
      <Box my={2}>
        <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping}>
          I need to get in touch!!!
        </Typography>
        <Typography variant="body1">
          Have a suggestion? Run into a problem? Message <Link href="https://instagram.com/pichucollector" rel="noreferrer noopener">@pichucollector</Link> on Instagram.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping}>
          How does this app work?
        </Typography>
        <Typography variant="body1" paragraph>
          Each Pokémon card and Pokémon set features a grade population table which shows the population for each grade that entry has received. This is no different to PSA's own population report, it just adds a layer of separation and displays the data vertically instead of horizontally.
        </Typography>
        <Box my={2}>
          <Typography variant="h6" gutterBottom variantMapping={headingVariantMapping}>
            Example Grade Population Table
          </Typography>
          <Typography variant="body1" paragraph>
            A grade population table within this app will look something like the example below:
          </Typography>
          <GradeTable
            history={fakeGradeHistory}
            total={fakeGradeTotal}
          />
          <Typography variant="body1" paragraph>
            The Total Graded column reveals that the total example population is <Variant>100</Variant> and is made up of <Variant>40</Variant> PSA 10 grades, <Variant>3</Variant> PSA 9 qualifier grades, <Variant>20</Variant> PSA 9 grades, and <Variant>17</Variant> PSA 8.5 grades.
          </Typography>
          <Typography variant="body1" paragraph>
            The
            {' '}
            <Greenie>green background</Greenie>
            {' '}
            between the grade name and the population represents the overall percentage that grade makes up in relation to the total population, allowing for quickly seeing which grades have the largest (or smallest) shares - the PSA 10 grade, with a population of <Variant>40</Variant>, makes up <Variant>40%</Variant> of the total population meaning this green background makes up 40% of the total area.
          </Typography>
          <Typography variant="body1" paragraph>
            In the past week, <Variant>6</Variant> new entries were graded, made up of <Variant>1</Variant> new PSA 10 (accounting for <Variant>2.5%</Variant> of the total PSA 10 population) and <Variant>5</Variant> new PSA 9s (accounting for <Variant>25%</Variant> of the total PSA 9 population). No new PSA 9 qualifier or PSA 8.5 grades were added at all.
          </Typography>
          <Hidden smUp>
            <Typography variant="caption" paragraph>
              Note: If you're viewing this on a mobile device you may not be able to see the grade history - try rotating your device to view it in landscape mode.
            </Typography>
          </Hidden>
          <Typography variant="body1" paragraph>
            The
            {' '}
            <Yellowie>yellow background</Yellowie>
            {' '}
            on each historic grade change represents the overall percentage that grade makes up in relation to all of the other grades achieved in that time period. In the past week the background of the PSA 9 grade is more prominent than that of the PSA 10 grade because it accounted for more of the overall number graded in that period (<Variant>5</Variant>/<Variant>6</Variant> compared with <Variant>1</Variant>/<Variant>6</Variant>).
          </Typography>
          <Typography variant="body1" paragraph>
            In the past 5 weeks, <Variant>2</Variant> PSA 10 grades and <Variant>5</Variant> PSA 9 grades have been added along with <Variant>10</Variant> PSA 8.5 grades. These numbers include the numbers from the &lsquo;1 week&rsquo; column, allowing us to say that 1 of the <Variant>2</Variant> PSA 10 grades which appeared in the past 5 weeks was from the past week and the other happened at some point between 5 weeks ago and the end of the week before last. Here the yellow background on the PSA 9 grade is less prominent as the PSA 8.5 grade accounts for a larger share of the total graded in this period. 
          </Typography>
          <Typography>
            None of the <Variant>3</Variant> PSA 9 qualifier grades were graded in the past 52 weeks, so nothing is displayed in the historic section.
          </Typography>
        </Box>
      </Box>
      <Box my={2}>
        <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping} id="normalization">
          Data Normalization
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
      </Box>
      <Box my={2}>
        <Typography variant="overline" display="block" color="textSecondary">
          &copy; Graded Metrics
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Operated by <Link href="https://instagram.com/pichucollector" rel="noreferrer noopener">@pichucollector</Link>.
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Want to hack this to bits? The UI is <Link href="https://github.com/gradedmetrics/explorer" rel="noreferrer noopener">open source</Link>.
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          Want to read a blog all about Pichu? Of course you do! <Link href="https://pichu.blog" rel="noreferrer noopener">pichu.blog</Link>.
        </Typography>
      </Box>
    </>
  );
}

export default Home;