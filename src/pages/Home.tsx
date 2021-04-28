import React from 'react';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import ContactSupportIcon from '@material-ui/icons/ContactSupport';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import DiscordLogo from '../assets/discord-logo.png';
import PSALogo from '../assets/psa-logo.png';

const headingVariantMapping = {
  h4: 'h1',
  h5: 'h2',
  h6: 'h3',
};

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
        Professional Sports Authenticator (
        <Link href="https://psacard.com" rel="noopener" target="blank">
          <img src={PSALogo} height="16px" style={{verticalAlign: '-6%'}} alt="PSA Logo" />
          {' '}
          https://psacard.com
        </Link>
        )
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
      <Typography variant="body1">
        This app is in its infancy - more content and features will be added over time.
      </Typography>
      <Box my={2}>
        <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping}>
          I don't understand how this works
        </Typography>
        <Typography variant="body1" gutterBottom>
          Head over to the
          {' '}
          <Link component={ReactRouterLink} to="/help">
            <ContactSupportIcon />
            Help
          </Link>
          {' '}
          section which details how various parts of the app work.
        </Typography>
        <Typography variant="body1">
          If that doesn't answer your question, see the section below...
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5" gutterBottom variantMapping={headingVariantMapping}>
          I need to get in touch!!!
        </Typography>
        <Typography variant="body1">
          Have a suggestion? Run into a problem? Hop into the
          {' '}
          <Link href="https://discord.gg/vvEGvJ6bSF" rel="noopener">
            <img src={DiscordLogo} height="40px" style={{marginBottom: '-17px'}} alt="Discord Logo" />
          </Link>
          {' '}
          server (
          <Link href="https://discord.gg/vvEGvJ6bSF" rel="noopener">https://discord.gg/vvEGvJ6bSF</Link>
          ) or message
          {' '}
          <Link href="https://instagram.com/pichucollector" rel="noopener">@pichucollector</Link>
          {' '}
          on Instagram.
        </Typography>
      </Box>
    </>
  );
}

export default Home;