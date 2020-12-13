import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FaceIcon from '@material-ui/icons/Face';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import StyleIcon from '@material-ui/icons/Style';
import Loading from './Loading';

const pages = [{
  path: '/',
  text: <><LocalFloristIcon /> Home</>,
}, {
  path: '/expansions',
  text: <><StyleIcon /> Expansions</>,
}, {
  path: '/pokemon',
  text: <><FaceIcon /> Pokémon</>,
}];

const Navigation = () => {
  const history = useHistory();
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [value, setValue] = React.useState<number>(0);

  React.useEffect(() => {
    setValue(pages.findIndex(({ path }) => path === history.location.pathname));
    setLoading(false);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isLoading || value === undefined) {
      return;
    }

    const {
      pathname,
    } = history.location;

    const selectedPagePath = pages[value].path;

    if (pathname === selectedPagePath) {
      return;
    }

    history.replace({
      pathname: selectedPagePath,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <Tabs
      centered
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={(event, newValue) => setValue(newValue)}
      aria-label="disabled tabs example"
      variant="fullWidth"
    >
      {pages.map(({ text }, index) => (
        <Tab
          key={`tab-${index}`}
          label={text}
          value={index}
        />
      ))}
    </Tabs>
  );
}

export default Navigation;