import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Loading from './components/Loading';
import Navigation from './components/Navigation';
import PageHeader from './components/PageHeader';
import ExpansionList from './pages/ExpansionList';
import PokemonList from './pages/PokemonList';
import TrainerList from './pages/TrainerList';
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
      const {
        v: versionNumber,
        '@': versionDate,
      } = versionData;
  
      await keys();
      setAPIVersion(versionData);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container maxWidth="md">
      <GlobalStyle />
      <PageHeader version={apiVersion} />
      <Router>
        <Navigation />
        <Box p={1}>
          <Route exact path="/">
            Home!
          </Route>
          <Route path="/expansions">
            <ExpansionList />
          </Route>
          <Route path="/pokemon">
            <PokemonList />
          </Route>
          <Route path="/trainers">
            <TrainerList />
          </Route>
        </Box>
      </Router>
    </Container>
  );
}

export default App;
