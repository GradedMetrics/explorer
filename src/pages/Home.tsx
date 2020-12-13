import React from 'react';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const headingVariantMapping = {
  h4: 'h1',
  h6: 'h2',
};

const Home = () => {
  return (
    <>
      <Paper variant="outlined">
        <Box p={2}>
          <Typography variant="h4" gutterBottom variantMapping={headingVariantMapping}>
            What is this?
          </Typography>
          <Typography variant="body1" paragraph>
            This app aims to add quality of life improvements to <Link href="https://psacard.com" rel="noreferrer noopener">PSA</Link>'s population report.
            It is not associated with PSA in any way.
          </Typography>
          <Typography variant="body1" paragraph>
            This app is in its infancy - more content and features will be added over time.
          </Typography>
          <Typography variant="body1" paragraph>
            Use the tabs above to navigate between the different sections.
          </Typography>
          <Typography variant="h6" gutterBottom variantMapping={headingVariantMapping}>
            I need to get in touch!
          </Typography>
          <Typography variant="body1">
            Have a suggestion? Run into a problem? Message <Link href="https://instagram.com/pichucollector" rel="noreferrer noopener">@pichucollector</Link> on Instagram.
          </Typography>
        </Box>
      </Paper>
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