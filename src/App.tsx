import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Loading from './components/Loading';
import ExpansionList from './pages/ExpansionList';
import PokemonList from './pages/PokemonList';
import TrainerList from './pages/TrainerList';
import {
  keys,
  version,
} from './utils/api';

const GlobalStyle = createGlobalStyle({
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
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    /**
     * When the application first loads we need to pull the /keys.json file from the API to perform
     * key mapping in order to unminify other API responses. This is because the API itself uses
     * minified keys for the sake of saving bandwidth.
     */
    (async() => {
      const {
        v: versionNumber,
        '@': versionDate,
      } = await version();
      console.log(`Version ${versionNumber} (${new Date(versionDate).toISOString()})`)
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
      <Router>
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
      </Router>
    </>
  );
}

export default App;
