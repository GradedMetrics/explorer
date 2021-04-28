import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import PowerOffIcon from '@material-ui/icons/PowerOff';
import Banner from './components/Banner';
import Loading from './components/Loading';
import PageFooter from './components/PageFooter';
import PageHeader from './components/PageHeader';
import Error404 from './pages/Error404';
import ExpansionList from './pages/ExpansionList';
import Help from './pages/Help';
import Home from './pages/Home';
import MiscList from './pages/MiscList';
import PokemonList from './pages/PokemonList';
import Ranks from './pages/Ranks';
import Stats from './pages/Stats';
import VariantsList from './pages/VariantsList';
import {
  keys,
  version,
} from './utils/api';
import {
  version as versionType,
} from './types';

const GlobalStyle = createGlobalStyle({
  'html, body': {
    margin: 0,
  },

  '.MuiSvgIcon-fontSizeSmall, .MuiSvgIcon-root': {
    verticalAlign: 'top',
  },

  '.MuiTypography-h4 .MuiSvgIcon-fontSizeLarge': {
    lineHeight: 1.235,
  },

  '.MuiTab-root': {
    minWidth: 68,
  },

  '.Mui-expanded': {
    '& > div > .MuiTreeItem-label': {
      fontWeight: 'bold',
    }
  },

  '.MuiTreeItem-root.Mui-selected': {
    '& > .MuiTreeItem-content': {
      '.MuiTreeItem-label': {
        background: 'inherit',

        '&:hover': {
          background: 'inherit',
          borderBottom: '1px solid #e0e0e0',
        },
      },
    },

    '&:focus': {
      '& > .MuiTreeItem-content .MuiTreeItem-label': {
        background: 'inherit',
        borderBottom: '1px solid #e0e0e0',
      }
    }
  },
});

function App() {
  const [apiVersion, setAPIVersion] = React.useState<versionType>();
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    /**
     * When the application first loads we need to pull the /keys.json file from the API to perform
     * key mapping in order to unminify other API responses. This is because the API itself uses
     * minified keys for the sake of saving bandwidth.
     */
    (async() => {
      const versionData = await version();
      setAPIVersion(versionData);
      await keys();
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <GlobalStyle />
      <Link href="https://discord.gg/vvEGvJ6bSF" style={{ textDecoration: 'none' }} rel="noopener">
        <Banner
          icon={<PowerOffIcon />}
          text="Beta test active. #beta on Discord."
        />
      </Link>
      <Container maxWidth="md">
        <Router>
          <PageHeader version={apiVersion} />
          <Box my={3}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/help">
                <Help />
              </Route>
              <Route path="/sets">
                <ExpansionList />
              </Route>
              <Route path="/misc">
                <MiscList />
              </Route>
              <Route path="/pokemon">
                <PokemonList />
              </Route>
              <Route exact path="/rankings">
                <Ranks />
              </Route>
              <Route exact path="/stats">
                <Stats />
              </Route>
              <Route path="/variants">
                <VariantsList />
              </Route>
              <Route path="*">
                <Error404 />
              </Route>
            </Switch>
          </Box>
        </Router>
      </Container>
      <PageFooter />
    </>
  );
}

export default App;
