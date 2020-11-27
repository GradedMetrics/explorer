import React from 'react';
import Loading from '../components/Loading';
import {
  pokemon,
} from '../types';
import withSingleContentLoad from '../hocs/withSingleContentLoad';
import {
  getPokemonList,
} from '../utils/api';
import Pokemon from '../trees/Pokemon';

import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';

type PokemonListProps = {
  content: pokemon[],
}

const PokemonList: React.FC<PokemonListProps> = ({
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
      defaultExpanded={['root', 'Bulbasaur']}
      defaultExpandIcon={<ChevronRightIcon />}
    >
      {renderTree({
        children: content.map(({ name, number }) => ({
          children: <Pokemon name={name} />,
          id: name,
          name: `${number} - ${name}`,
        })),
        id: 'root',
        name: 'Pokémon',
      })}
    </TreeView>
  )
}

export default withSingleContentLoad(
  PokemonList,
  () => getPokemonList,
);