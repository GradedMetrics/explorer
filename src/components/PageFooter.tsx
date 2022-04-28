import React from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
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
  boxSizing: 'border-box',
  color: '#fff',
  display: 'inline-block',
  fontSize: 14,
  lineHeight: '26px',
  height: 32,
  padding: '4px 12px 4px 32px',
  width: 164,

  '&:hover, &:focus': {
    textDecoration: 'none',
  }
};

const useStyles = makeStyles(theme => ({
  discord: {
    backgroundColor: '#7289DA',
    backgroundImage: `url(${DiscordIcon})`,
    marginRight: theme.spacing(1.5),
    ...socialButtonProps
  },
  patreon: {
    backgroundColor: '#FF424D',
    backgroundImage: `url(${PatreonIcon})`,
    ...socialButtonProps
  }
}));

const PageFooter = () => {
  const theme = useTheme();
  const isSmallScreenDisplay = useMediaQuery(theme.breakpoints.down('md'));
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
            href="https://discord.gg/vvEGvJ6bSF"
            target="blank"
          >
            Join the Discord!
          </Link>
          <Link
            className={classes.patreon}
            href="https://www.patreon.com/bePatron?u=47497967"
            target="blank"
          >
            Become a Patron!
          </Link>
        </Typography>
      </Box>
      <Box my={4} style={{
        background: '#fafafa',
        border: '1px solid #ccc',
        padding: 24,
      }}>
        <Typography variant="h4" style={{
          fontSize: isSmallScreenDisplay ? 32 : undefined,
          fontWeight: '100',
          marginBottom: isSmallScreenDisplay ? 8 : undefined,
          textAlign: 'center',
        }}>
          PokéMetrics EX early access has arrived!
        </Typography>
        <Typography style={{
          fontSize: 24,
          marginBottom: 16,
          textAlign: 'center',
        }}>
          <Link href="https://ex.pokemetrics.org">https://ex.pokemetrics.org</Link>
        </Typography>
        <Divider />
        <Typography variant="h6" style={{ marginTop: 16 }}>
          What is PokéMetrics EX?
        </Typography>
        <Typography gutterBottom>
          PokéMetrics EX is a complete rework of PokéMetrics from the ground up.
        </Typography>
        <Typography gutterBottom>
          Everything from how the data is stored to how the UI behaves has been completely rewritten with the goal being to greatly improve flexibility, scalability and performance.
        </Typography>
        <Typography gutterBottom>
          It&#39;s still a work in progress, but it already includes a lot of features the standard PokéMetrics website is missing, including fully paginated ranking leaderboards with new meaningful rankings added, and the ability to view 2 years back and travel back in time to view previous weekly updates as if they were the current week.
        </Typography>
        <Typography gutterBottom>
          Screenshots (click to open in a new tab)
        </Typography>
        <Box style={{
          marginBottom: 24,
          textAlign: 'center',
        }}>
          <Link
            href={`https://ex.pokemetrics.org/preview/variant-filter.png`}
            target="_blank"
            style={{
              borderBottomColor: '#ccc',
              borderBottomStyle: 'solid',
              borderBottomWidth: isSmallScreenDisplay ? 1 : 0,
              display: 'inline-block',
              paddingBottom: isSmallScreenDisplay ? 28 : undefined,
              margin: 8,
              marginBottom: isSmallScreenDisplay ? 0 : 24,
              textAlign: 'center',
              verticalAlign: 'top',
              width: isSmallScreenDisplay ? '60vmin' : '20vmin',
            }}
          >
            <Box role="presentation" style={{
              background: `url(https://ex.pokemetrics.org/preview/variant-filter.png)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: isSmallScreenDisplay ? '60vmin' : '20vmin',
            }} />
            <Typography>
              Set variant filter: Base Set (Shadowless) - Holofoil
            </Typography>
          </Link>
          <Link
            component={Link}
            href={`https://ex.pokemetrics.org/preview/stats-preview.png`}
            target="_blank"
            style={{
              borderBottomColor: '#ccc',
              borderBottomStyle: 'solid',
              borderBottomWidth: isSmallScreenDisplay ? 1 : 0,
              display: 'inline-block',
              paddingBottom: isSmallScreenDisplay ? 28 : undefined,
              margin: 8,
              marginBottom: isSmallScreenDisplay ? 0 : 24,
              textAlign: 'center',
              verticalAlign: 'top',
              width: isSmallScreenDisplay ? '60vmin' : '20vmin',
            }}
          >
            <Box role="presentation" style={{
              background: `url(https://ex.pokemetrics.org/preview/stats-preview.png)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: isSmallScreenDisplay ? '60vmin' : '20vmin',
            }} />
            <Typography>
              PSA grade Statistics with grade histogram
            </Typography>
          </Link>
          <Link
            component={Link}
            href={`https://ex.pokemetrics.org/preview/snapshot-set-ranking.png`}
            target="_blank"
            style={{
              display: 'inline-block',
              margin: 8,
              marginBottom: 24,
              textAlign: 'center',
              verticalAlign: 'top',
              width: isSmallScreenDisplay ? '60vmin' : '20vmin',
            }}
          >
            <Box role="presentation" style={{
              background: `url(https://ex.pokemetrics.org/preview/snapshot-set-ranking.png)`,
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'contain',
              height: isSmallScreenDisplay ? '60vmin' : '20vmin',
            }} />
            <Typography>
              Set-specific weekly cards ranking: Hidden Fates - 16th March 2022
            </Typography>
          </Link>
        </Box>
        <Typography style={{
          fontSize: isSmallScreenDisplay ? 14 : 18,
          textAlign: 'center'
        }}>
          Learn more and view a feature comparison list at
          {' '}
          <Link href="https://ex.pokemetrics.org/early-access" style={{
            fontWeight: isSmallScreenDisplay ? 600 : undefined,
          }}>
            https://ex.pokemetrics.org/early-access
          </Link>.
        </Typography>
      </Box>
    </Container>
  )
}

export default PageFooter;