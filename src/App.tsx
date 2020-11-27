import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import Loading from './components/Loading';
import Expansions from './pages/Expansions';
import Pokemon from './pages/Pokemon';
import {
  keys,
} from './utils/api';

function App() {
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    /**
     * When the application first loads we need to pull the /keys.json file from the API to perform
     * key mapping in order to unminify other API responses. This is because the API itself uses
     * minified keys for the sake of saving bandwidth.
     */
    (async() => {
      await keys();
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <Route exact path="/">
        Home!
      </Route>
      <Route path="/expansions">
        <Expansions />
      </Route>
      <Route path="/pokemon">
        <Pokemon />
      </Route>
    </Router>
  );
}

export default App;
