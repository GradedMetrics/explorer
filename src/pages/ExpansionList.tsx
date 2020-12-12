import React from 'react';
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
import Box from '@material-ui/core/Box';
import AutoComplete from '../components/AutoComplete';
import Tree from '../components/Tree';

type ExpansionListProps = {
  content: expansion[],
}

const ExpansionList: React.FC<ExpansionListProps> = ({
  content,
}) => {
  const [selectedExpansion, setSelectedExpansion] = React.useState<expansion>();

  const handleSelect = (expansion: expansion) => {
    setSelectedExpansion(expansion);
  }

  return (
    <Box p={1}>
      <AutoComplete
        id="expansion-select"
        helperText="The expansion names are what PSA has chosen to display on their card labels and may not accurately represent a Pokémon expansion. Some work has been put in to try and correct this (i.e. the expansion PSA refers to as &ldquo;Pokemon Game&rdquo; will be found here by searching for &ldquo;Base Set&rdquo; instead)."
        label="Search for an expansion... (e.g. Base Set)"
        options={content}
        optionFormatter={(expansion) => formatExpansionName(expansion, { showYear: false })}
        optionGroupFormatter={({ year }) => formatYear(year)}
        onChange={handleSelect}
      />
      {selectedExpansion ? (
        <Box mt={2}>
          <Tree
            id="expansion-tree"
            children={<Expansions expansion={selectedExpansion} />}
            name={formatExpansionName(selectedExpansion)}
          />
        </Box>
      ) : undefined}
    </Box>
  );
}

export default withSingleContentLoad(
  ExpansionList,
  () => getExpansions,
);