import React from 'react';
import {
  useHistory,
} from 'react-router-dom';
import {
  expansion,
} from '../types';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import {
  getExpansions,
} from '../utils/api';
import Expansions from '../trees/Expansions';
import {
  formatExpansionName,
  formatYear,
} from '../utils/strings';
import {
  urlFriendlyExpansionName,
} from '../utils/urls';
import Box from '@material-ui/core/Box';
import AutoComplete from '../components/AutoComplete';
import Loading from '../components/Loading';

type ExpansionListProps = {
  content: expansion[],
}

const ExpansionList: React.FC<ExpansionListProps> = ({
  content,
}) => {
  const history = useHistory();
  const [selectedExpansion, setSelectedExpansion] = React.useState<expansion>();
  const [isLoading, setLoading] = React.useState<boolean>(false);
  const [isPageLoading, setPageLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    const {
      hash,
    } = history.location;

    if (!hash) {
      setPageLoading(false);
      return;
    }

    const urlSelectedExpansion = content.find(({ id }) => id === hash.substr(1, 16));

    if (!urlSelectedExpansion) {
      history.replace({
        hash: '',
      });

      setPageLoading(false);
      return;
    }

    setSelectedExpansion(urlSelectedExpansion);
    setPageLoading(false);
  }, []);

  React.useEffect(() => {
    if (isPageLoading) {
      return;
    }

    setLoading(false);

    const {
      hash,
    } = history.location;

    const newHash = urlFriendlyExpansionName(selectedExpansion);

    if (hash === newHash) {
      return;
    }

    history.replace({
      hash: newHash,
    });
  }, [selectedExpansion]);

  const handleSelect = (expansion: expansion) => {
    setLoading(true);
    setSelectedExpansion(expansion);
  }

  if (isPageLoading) {
    return <Loading />;
  }

  return (
    <>
      <AutoComplete
        defaultSelectedOption={selectedExpansion}
        id="expansion-select"
        helperText="The expansion names are what PSA has chosen to display on their card labels and may not accurately represent a Pokémon expansion. Some work has been put in to try and correct this (i.e. the expansion PSA refers to as &ldquo;Pokemon Game&rdquo; will be found here by searching for &ldquo;Base Set&rdquo; instead)."
        label="Search for an expansion... (e.g. Base Set)"
        options={content}
        optionFormatter={(expansion) => formatExpansionName(expansion, { showYear: false })}
        optionGroupFormatter={({ year }) => formatYear(year)}
        onChange={handleSelect}
      />
      {!isLoading && selectedExpansion ? (
        <Box mt={2}>
          <Expansions expansion={selectedExpansion} />
          {/* <Tree
            id="expansion-tree"
            children={<Expansions expansion={selectedExpansion} />}
            name={formatExpansionName(selectedExpansion)}
          /> */}
        </Box>
      ) : undefined}
    </>
  );
}

export default withSingleContentLoad(
  ExpansionList,
  () => getExpansions,
);