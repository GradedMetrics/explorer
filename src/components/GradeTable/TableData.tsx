import React from 'react';
import styled from 'styled-components';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import {
  flattenedGrade,
  gradeChangeOverTime,
} from '../../types';
import {
  flattenGrades,
} from '../../utils/grades';

const Abbr = styled.abbr({
  borderBottom: '1px dotted #ccc',
  cursor: 'help',
  display: 'inline-block',
  textDecoration: 'none',
});

type GradeCountProps = {
  compare?: flattenedGrade,
  data?: flattenedGrade,
  isHistoric?: boolean,
  total?: flattenedGrade,
}

const GradeCount: React.FC<GradeCountProps> = ({
  compare,
  data,
  isHistoric = false,
  total,
}) => {
  if (!data) {
    return (
      <TableCell
        style={{
          background: '#fdfdfd',
          border: 'none',
        }}
      />
    );
  }

  const getValueStyle = () => {
    if (!total) {
      return undefined;
    }

    if (data.name === 'Total') {
      return {
        background: isHistoric ? `rgba(255, 255, 150, 0.34)` : `rgba(205, 238, 140, 0.34)`,
        borderLeft: isHistoric ? '1px solid #e0e0e0' : undefined,
        borderBottom: '1px solid #ccc',
        fontWeight: 700,
      }
    }

    const totalValue = isHistoric ? -total.value : total.value;
    const dataValue = isHistoric ? -data.value : data.value;

    const percentage = (Math.floor(((100 / totalValue) * dataValue) * 100) / 10000) / 3;

    return {
      background: isHistoric ? `rgba(255, 255, 150, ${percentage})` : `rgba(205, 238, 140, ${percentage})`,
      borderLeft: isHistoric ? '1px solid #e0e0e0' : undefined,
      borderTop: isHistoric ? '1px solid #e0e0e0' : undefined,
    };
  }

  const {
    percentageOfTotal,
    value,
  } = data;

  let content;

  const totalRowStyle = data.name === 'Total' ? { fontWeight: 700 } : undefined;

  if (isHistoric && compare) {
    const {
      value: current,
    } = compare;

    content = (
      <>
        {-value}
        {' '}
        <Typography variant="caption" color="textSecondary" style={totalRowStyle}>
          ({current + value})
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block" style={totalRowStyle}>
          ({Math.floor((100 - ((100 / current) * (current + value))) * 100) / 100}%)
        </Typography>
      </>
    );
  } else {
    content = (
      <>
        {value}
        <Typography variant="caption" color="textSecondary" display="block">
          ({percentageOfTotal !== undefined ? percentageOfTotal : '100'}%)
        </Typography>
      </>
    )
  }

  return (
    <TableCell
      align="right"
      style={{
        ...(total ? getValueStyle() : undefined),
        ...(!isHistoric ? { borderRight: '3px double #ccc' } : undefined),
      }}
    >
      {content}
    </TableCell>
  );
}

type TableDataProps = {
  data: flattenedGrade[],
  history: gradeChangeOverTime,
};

const TableData: React.FC<TableDataProps> = ({
  data,
  history,
}) => {
  const {
    weekly,
    monthly,
    yearly,
  } = history;

  const flattenedWeeklyGrades = weekly?.total ? flattenGrades(weekly) : [];
  const flattenedMonthlyGrades = monthly?.total ? flattenGrades(monthly) : [];
  const flattenedYearlyGrades = yearly?.total ? flattenGrades(yearly) : [];

  const getTotal = (dataset: flattenedGrade[]) => dataset.find(entry => entry.name === 'Total')

  const total = getTotal(data);
  const totalWeekly = getTotal(flattenedWeeklyGrades);
  const totalMonthly = getTotal(flattenedMonthlyGrades);
  const totalYearly = getTotal(flattenedYearlyGrades);

  return (
    <>
      {data.map(entry => {
        const {
          description,
          hasQualifier = false,
          name,
          percentageOfTotal = 0,
        } = entry;

        const historyMatch = ({
          hasQualifier: historyHasQualifier = false,
          name: historyName,
        }: {
          hasQualifier?: boolean,
          name: string,
        }) => name === historyName && historyHasQualifier === hasQualifier;

        const weeklyData = flattenedWeeklyGrades.find(historyMatch);
        const monthlyData = flattenedMonthlyGrades.find(historyMatch);
        const yearlyData = flattenedYearlyGrades.find(historyMatch);

        const x = name === 'Total' ? undefined : `rgba(205, 238, 140, ${percentageOfTotal / 100 / 3})`;

        return (
          <TableRow
            key={`${name}${hasQualifier ? 'Q' : ''}`}
            style={name === 'Total' ? {
              background: '#fafafa',
            } : {
              background: '#fff',
            }}
          >
            <TableCell
              style={percentageOfTotal ? {
                background: `linear-gradient(to left, ${x} 0%, rgba(205, 238, 140, 0.34) calc(${percentageOfTotal}% - 2px), rgba(205, 238, 140, 0.66) calc(${percentageOfTotal}% - 2px), transparent ${percentageOfTotal}%, transparent 100%)`
              } : {
                background: 'rgb(205, 238, 140, 0.34)',
                borderBottom: '1px solid #ccc',
                fontWeight: 'bold',
              }}
            >
              {name}
              {hasQualifier ? (
                <>
                  {' '}
                  <Tooltip
                    placement="right"
                    title={(
                      <>
                        Has a qualifier.
                        <br />
                        Qualifiers reduce the grade by 1 full point and may be one of the following: MC (miscut), MK (marked), OC (off-center), OF (out of focus), PD (print defect), or ST (stained).
                        <br />
                        PSA's population report does not differentiate between these.
                      </>
                    )}
                  >
                    <Typography variant="caption" color="textPrimary">
                      <Abbr>
                        with qualifier
                      </Abbr>
                    </Typography>
                  </Tooltip>
                </>
              ) : undefined}
              {description ? (
                <>
                  {' '}
                  <Typography variant="caption" color="textSecondary" display="block">
                    {description}
                  </Typography>
                </>
              ) : undefined}
            </TableCell>
            <GradeCount data={entry} total={total} />
            <GradeCount data={weeklyData} isHistoric compare={entry} total={totalWeekly} />
            <GradeCount data={monthlyData} isHistoric compare={entry} total={totalMonthly} />
            <GradeCount data={yearlyData} isHistoric compare={entry} total={totalYearly} />
          </TableRow>
        );
      })}
    </>
  )
}

export default TableData;