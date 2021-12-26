import React from 'react';
import { Box, Divider, Link, List, ListItem, ListItemText, Typography } from '@material-ui/core';
import {
  Link as ReactRouterLink,
} from 'react-router-dom';
import {
  card,
  expansion,
  gradeIds,
} from '../../types';
import { formatCardName, formatExpansionName } from '../../utils/strings';

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

const Entries: React.FC<EntriesProps> = ({
  data,
  expansion,
  grade,
  historyDeductsFromTotal = true,
  ids,
  name,
  period,
  total,
}: EntriesProps) => {
  const historyDeducts = expansion ? false : historyDeductsFromTotal;

  return (
    <>
      <Typography variant="h5" gutterBottom>
        {period ? `${grade} ${name} cards graded in the past ${period}` : `Total ${grade} ${name} cards graded`}
      </Typography>
      <Typography>
        There have been {total.toLocaleString()} {grade} {name} cards graded {period ? `in the past ${period}` : `in total`}, made up of...
      </Typography>
      <List>
        {Object.entries(ids).sort(([, a], [, b]) => (historyDeducts ? a > b : a < b) ? 1 : -1).map(([key, value]) => {
          const entry = data.find(({ id }) => id === key) as card;
          const evaluatedExpansion = entry.expansion || expansion as expansion;
          const quantity = historyDeducts ? -value : value;

          return (
            <ListItem
              key={entry.id}
              style={{
                paddingBottom: 0,
                paddingTop: 0,
              }}
            >
              <ListItemText>
                <Typography component="span">
                  {quantity} x
                </Typography>
                <Box component="span" ml={1}>
                  <Link component={ReactRouterLink} to={`/sets/${evaluatedExpansion.id}/${entry.id}`}>
                    {formatCardName(entry, { defaultName: name })} · {formatExpansionName(evaluatedExpansion)}
                  </Link>
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