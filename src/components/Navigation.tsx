import React from 'react';
import {
  useHistory,
  withRouter,
} from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import BubbleChartIcon from '@material-ui/icons/BubbleChart';
import FaceIcon from '@material-ui/icons/Face';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';
import StyleIcon from '@material-ui/icons/Style';
import Loading from './Loading';

const pages = [{
  icon: <LocalFloristIcon />,
  path: '/',
  text: 'Home',
}, {
  icon: <StyleIcon />,
  path: '/expansions',
  text: 'Sets',
}, {
  icon: <FaceIcon />,
  path: '/pokemon',
  text: 'Pokémon',
}, {
  icon: <NaturePeopleIcon />,
  path: '/misc',
  text: 'Misc',
}, {
  icon: <BubbleChartIcon />,
  path: '/stats',
  text: 'Stats'
}, {
  icon: <FormatListNumberedIcon />,
  path: '/rankings',
  text: 'Top 10'
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

  React.useEffect(() => {
    const {
      pathname,
    } = history.location;

    const pageIndexFromPathname = pages.findIndex(({ path }) => path === pathname);

    if (value === pageIndexFromPathname) {
      return;
    }

    setValue(pageIndexFromPathname);
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <Tabs
      value={value}
      indicatorColor="primary"
      textColor="primary"
      onChange={(event, newValue) => setValue(newValue)}
      aria-label="Explorer navigation links"
      variant="fullWidth"
    >
      {pages.map(({ icon, text }, index) => (
        <Tab
          key={`tab-${index}`}
          icon={icon}
          label={text}
          value={index}
        />
      ))}
    </Tabs>
  );
}

export default withRouter(Navigation);