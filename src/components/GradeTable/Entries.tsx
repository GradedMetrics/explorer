import React from 'react';
import { Box, Divider, Link, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import {
  card,
  expansion,
  gradeIds,
} from '../../types';
import { formatCardName, formatExpansionName } from '../../utils/strings';
import { totalBackground } from './TableData';
import { historicBackground } from '../GradeTable';

type EntriesProps = {
  data: card[]
  expansion?: expansion
  grade: string
  historyDeductsFromTotal?: boolean
  ids: gradeIds
  name: string
  period?: string
  total: number
}

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(2),
  },
  dataset: {
    color: theme.palette.grey[700],
    fontWeight: theme.typography.fontWeightLight,
  },
  list: {
    marginTop: theme.spacing(2),
  },
  listItem: {
    marginBottom: theme.spacing(1),
    position: 'relative',
  },
  listItemText: {
    alignItems: 'center',
    display: 'flex',
    overflowX: 'hidden',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(1)}px`,
    position: 'relative',
    width: '100%',
    zIndex: 2,

    [theme.breakpoints.down('xs')]: {
      display: 'block',
    },
  },
  count: {
    flex: '0 0 50px',
    textAlign: 'right',

    [theme.breakpoints.down('xs')]: {
      display: 'block',
      textAlign: 'left',
    },
  },
  name: {
    flex: '1 1 auto',
    fontSize: 14,
    marginLeft: theme.spacing(2),
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',

    [theme.breakpoints.down('xs')]: {
      marginLeft: 0,
      display: 'block',
      width: '100%',
    },
  },
  progress: {
    display: 'block',
    height: '100%',
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: 1,
  },
  progressBar: {
    background: ({ period }: EntriesProps) => `rgba(${period ? historicBackground : totalBackground}, 0.34)`,
    boxShadow: '2px 2px 2px 0px rgba(0, 0, 0, 10%)',
    display: 'block',
    height: '100%',
    width: 0,
  }
}));

const Entries: React.FC<EntriesProps> = (props: EntriesProps) => {
  const {
    data,
    expansion,
    grade,
    historyDeductsFromTotal = true,
    ids,
    name,
    period,
    total,
  } = props;

  const classes = useStyles(props);
  const historyDeducts = expansion ? false : historyDeductsFromTotal;
  const entries = Object.entries(ids);

  return (
    <>
      <Box className={classes.header} component="header">
        <Typography variant="h5" className={classes.dataset}>
          {name}
        </Typography>
        <Typography component="h1" variant="h5" gutterBottom>
          {period ? `${grade} grades in the past ${period}` : `Total ${grade} grades`}
        </Typography>
        <Typography>
          There are {total.toLocaleString()} {grade} grades in this dataset from {entries.length === 1 ? 'only one entry' : `${entries.length} different entries`}.
        </Typography>
      </Box>
      <Divider />
      <List className={classes.list}>
        {entries.sort(([, a], [, b]) => (historyDeducts ? a > b : a < b) ? 1 : -1).map(([key, value]) => {
          const entry = data.find(({ id }) => id === key) as card;
          const evaluatedExpansion = entry.expansion || expansion as expansion;
          const quantity = historyDeducts ? -value : value;

          const progress = (100/total)*quantity;

          return (
            <ListItem
              className={classes.listItem}
              disableGutters
              key={entry.id}
              style={{
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              <ListItemText>
                <div className={classes.progress}>
                  <div className={classes.progressBar} style={{ width: `${progress}%`}} />
                </div>
                <Box className={classes.listItemText}>
                  <Box component="span" className={classes.count}>
                    {quantity.toLocaleString()}
                  </Box>
                  <Box component="span" className={classes.name}>
                    {expansion ? (
                      <>
                        {formatCardName(entry, { defaultName: name })}
                      </>
                    ) : (
                      <>
                        <Link component={ReactRouterLink} to={`/sets/${evaluatedExpansion.id}/${entry.id}`}>
                          {formatCardName(entry, { defaultName: name })}
                        </Link>
                        <br />
                        <Link component={ReactRouterLink} to={`/sets/${evaluatedExpansion.id}`}>
                          {formatExpansionName(evaluatedExpansion)}
                        </Link>
                      </>
                    )}

                  </Box>
                </Box>
              </ListItemText>
            </ListItem>
          );
        })}
      </List>
    </>
  )
}

export default Entries;