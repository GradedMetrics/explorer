import React from 'react';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import TableData from './GradeTable/TableData';
import {
  flattenGrades,
  getGradeChangeOverTime,
} from '../utils/grades';
import {
  gradeHistory,
  grades,
} from '../types';

const Wrapper = styled.article({
  'thead': {
    background: '#f5f5f5',

    'th': {
      borderBottomColor: '#ccc',
    }
  },

  'tbody': {
    'td': {
      '&:nth-child(2)': {
        borderRight: '1px solid #e0e0e0',
      }
    }
  }
});

type GradeTableProps = {
  history: gradeHistory[],
  total: grades,
}

const GradeTable: React.FC<GradeTableProps> = ({
  history,
  total,
}) => {
  const mainHeadingStyle = { background: '#789839', color: '#fff' };
  const historicHeadingStyle = { background: '#f2f2f2' };

  return (
    <Box my={2}>
      <Hidden smUp>
      <Typography
        paragraph
        variant="body2"
      >
        Grade history is only visible on larger screens. If you're on a mobile device which supports different orientations, viewing this page landscape instead of portrait may be all you need.
      </Typography>
      </Hidden>
      <Wrapper>
        <TableContainer component={Paper}>
          <Table aria-label="Grades table." size="small">
            <TableHead>
              <TableRow>
                <TableCell rowSpan={2} style={mainHeadingStyle}>Grade</TableCell>
                <TableCell rowSpan={2} style={mainHeadingStyle}>Total Graded</TableCell>
                <Hidden xsDown>
                  <TableCell colSpan={3} style={{ borderLeft: '3px double #ccc', ...historicHeadingStyle }}>Cards graded in the past...</TableCell>
                </Hidden>
              </TableRow>
              <Hidden xsDown>
                <TableRow style={historicHeadingStyle}>
                  <TableCell>1 week</TableCell>
                  <TableCell>5 weeks</TableCell>
                  <TableCell>52 weeks</TableCell>
                </TableRow>
              </Hidden>
            </TableHead>
            <TableBody>
              <TableData data={flattenGrades(total)} history={getGradeChangeOverTime(history)} />
            </TableBody>
          </Table>
        </TableContainer>
      </Wrapper>
    </Box>
  );
}

export default GradeTable;