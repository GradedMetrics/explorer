/**
 * This extends Material UI's TreeView component available at
 * https://material-ui.com/components/tree-view.
 */

import React from 'react';
import MUITreeItem from '@material-ui/lab/TreeItem';
import MUITreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

type TreeProps = {
  children: React.ReactNode
  id: string
  name: string
}

type TreeItemProps = {
  children: any
  id: any
  name: any
}

export const TreeItem: React.FC<TreeItemProps> = ({
  children,
  id: nodeId,
  name,
}) => (
  <MUITreeItem key={nodeId} nodeId={nodeId} label={name}>
    {Array.isArray(children) ? children.map((node: any) => <TreeItem {...node} />) : children}
  </MUITreeItem>
);

const Tree: React.FC<TreeProps> = ({
  children,
  id,
  name,
}) => {
  return (
    <MUITreeView
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpanded={[id]}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      <TreeItem
        children={children}
        id={id}
        name={name}
      />
    </MUITreeView>
  )
}

export default Tree;