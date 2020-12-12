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
} from '../utils/strings';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

type ExpansionListProps = {
  content: expansion[],
}

const ExpansionList: React.FC<ExpansionListProps> = ({
  content,
}) => {
  type TreeProps = {
    children: any,
    id: any,
    name: any,
  }

  const renderTree: React.FC<TreeProps> = ({
    children,
    id: nodeId,
    name,
  }) => (
    <TreeItem key={nodeId} nodeId={nodeId} label={name}>
      {Array.isArray(children) ? children.map((node: any) => renderTree(node)) : children}
    </TreeItem>
  );

  return (
    <TreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={['root']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree({
        children: content.map(expansion => {
          const {
            id,
          } = expansion;

          return {
            children: <Expansions expansion={expansion} />,
            id,
            name: formatExpansionName(expansion),
          }
        }),
        id: 'root',
        name: 'Expansion',
      })}
    </TreeView>
  )
}

export default withSingleContentLoad(
  ExpansionList,
  () => getExpansions,
);