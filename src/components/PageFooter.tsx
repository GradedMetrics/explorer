import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CSSProperties } from "@material-ui/core/styles/withStyles";
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import DiscordIcon from '../assets/discord-icon.png';
import PatreonIcon from '../assets/patreon-icon.png';

const socialButtonProps: CSSProperties = {
  backgroundPosition: '10px 50%',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 16,
  borderRadius: 8,
  boxSizing: 'border-box',
  color: '#fff',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: '26px',
  height: 32,
  padding: '4px 12px 4px 32px',
  width: 162,

  '&:hover, &:focus': {
    textDecoration: 'none',
  }
};

const useStyles = makeStyles({
  discord: {
    backgroundColor: '#7289DA',
    backgroundImage: `url(${DiscordIcon})`,
    ...socialButtonProps
  },
  patreon: {
    backgroundColor: '#FF424D',
    backgroundImage: `url(${PatreonIcon})`,
    ...socialButtonProps
  }
});

const PageFooter = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Divider />
      <Box my={2}>
        <Typography variant="overline" display="block" color="textSecondary">
          PokéMetrics &copy; {new Date().getFullYear()}
        </Typography>
        <Typography variant="subtitle2" display="block" color="textSecondary">
          Operated by <Link href="https://instagram.com/pichucollector" rel="noreferrer noopener">@pichucollector</Link>.
        </Typography>
        <Typography variant="subtitle2" display="block" color="textSecondary">
          Want to hack this to bits? The UI is <Link href="https://github.com/gradedmetrics/explorer" rel="noreferrer noopener">open source</Link>.
        </Typography>
        <Typography variant="subtitle2" display="block" color="textSecondary" paragraph>
          Want to read a blog all about Pichu? Of course you do! <Link href="https://pichu.blog" rel="noreferrer noopener">pichu.blog</Link>.
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary" paragraph>
          <Link
            className={classes.discord}
            href="https://www.patreon.com/bePatron?u=47497967"
          >
            Join the Discord!
          </Link>
        </Typography>
        <Typography variant="subtitle2" display="block" color="textSecondary" gutterBottom>
          Want to support the app?
        </Typography>
        <Typography variant="caption" display="block" color="textSecondary">
          <Link
            className={classes.patreon}
            href="https://www.patreon.com/bePatron?u=47497967"
          >
            Become a Patron!
          </Link>
        </Typography>
      </Box>
    </Container>
  )
}

export default PageFooter;