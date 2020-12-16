import React from 'react';
import styled from 'styled-components';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';
import {
  flattenedGrade,
  gradeChangeOverTime,
} from '../../types';
import {
  flattenGrades,
} from '../../utils/grades';

export const historicBackground = `255, 246, 143`;
export const totalBackground = `205, 238, 140`;

type GradeCountProps = {
  compare?: flattenedGrade,
  data?: flattenedGrade,
  historyDeductsFromTotal?: boolean,
  isHistoric?: boolean,
  total?: flattenedGrade,
}

const GradeCount: React.FC<GradeCountProps> = ({
  compare,
  data,
  historyDeductsFromTotal = true,
  isHistoric = false,
  total,
}) => {
  const noData = (
    <TableCell
      style={{
        background: '#fdfdfd',
        border: 'none',
      }}
    />
  );

  if (!data) {
    return noData;
  }

  const getValueStyle = () => {
    if (!total) {
      return undefined;
    }

    if (data.name === 'Total') {
      return {
        background: isHistoric ? `rgba(${historicBackground}, 0.34)` : `rgba(${totalBackground}, 0.34)`,
        borderLeft: isHistoric ? '1px solid #e0e0e0' : undefined,
        borderBottom: '1px solid #ccc',
        fontWeight: 700,
      }
    }

    const totalValue = isHistoric && historyDeductsFromTotal ? -total.value : total.value;
    const dataValue = isHistoric && historyDeductsFromTotal ? -data.value : data.value;

    const percentage = (Math.floor(((100 / totalValue) * dataValue) * 100) / 10000) / 3;
    console.log(totalValue, dataValue, percentage);

    return {
      background: isHistoric ? `rgba(${historicBackground}, ${percentage})` : `rgba(${totalBackground}, ${percentage})`,
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

    const offset = historyDeductsFromTotal ? current + value : current - value;
    const percentage = historyDeductsFromTotal ? 100 - ((100 / current) * offset) : (100 / current) * offset;

    if (!historyDeductsFromTotal && compare.value - value === 0) {
      return noData;
    }

    content = (
      <>
        {(historyDeductsFromTotal ? -value : compare.value - value).toLocaleString()}
        {' '}
        <Typography variant="caption" color="textSecondary" style={totalRowStyle}>
          ({offset.toLocaleString()})
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block" style={totalRowStyle}>
          ({Math.floor(percentage * 100) / 100}%)
        </Typography>
      </>
    );
  } else {
    content = (
      <>
        {value.toLocaleString()}
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
        ...(!isHistoric ? {
          background: percentageOfTotal !== undefined ? `linear-gradient(to right, rgba(${totalBackground}, ${percentageOfTotal / 100 / 3}) 0%, rgba(${totalBackground}, 0.34) calc(${percentageOfTotal}% - 2px), rgba(${totalBackground}, 0.66) calc(${percentageOfTotal}% - 2px), transparent ${percentageOfTotal}%, transparent 100%)` : `rgba(${totalBackground}, 0.34)`,
          borderRight: '3px double #ccc'
        } : undefined),
      }}
    >
      {content}
    </TableCell>
  );
}

type TableDataProps = {
  data: flattenedGrade[],
  history: gradeChangeOverTime,
  historyDeductsFromTotal: boolean,
};

const TableData: React.FC<TableDataProps> = ({
  data,
  history,
  historyDeductsFromTotal,
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

        const percentageBackground = name === 'Total' ? undefined : `rgba(${totalBackground}, ${percentageOfTotal / 100 / 3})`;

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
              style={name === 'Total' ? {
                background: `rgba(${totalBackground}, 0.34)`,
              } : percentageOfTotal !== undefined ? {
                background: `linear-gradient(to left, ${percentageBackground} 0%, rgba(${totalBackground}, 0.34) calc(${percentageOfTotal}% - 2px), rgba(${totalBackground}, 0.66) calc(${percentageOfTotal}% - 2px), transparent ${percentageOfTotal}%, transparent 100%)`
              } : {
                background: `rgba(${totalBackground}, 0.34)`,
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
                    text={(
                      <>
                        Has a qualifier.
                        <br />
                        Qualifiers reduce the grade by 1 full point and may be one of the following: MC (miscut), MK (marked), OC (off-center), OF (out of focus), PD (print defect), or ST (stained).
                        <br />
                        PSA's population report does not differentiate between these.
                      </>
                    )}
                    variant="caption"
                  >
                    with qualifier
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
            <Hidden xsDown>
              <GradeCount data={weeklyData} historyDeductsFromTotal={historyDeductsFromTotal} isHistoric compare={entry} total={totalWeekly} />
              <GradeCount data={monthlyData} historyDeductsFromTotal={historyDeductsFromTotal} isHistoric compare={entry} total={totalMonthly} />
              <GradeCount data={yearlyData} historyDeductsFromTotal={historyDeductsFromTotal} isHistoric compare={entry} total={totalYearly} />
            </Hidden>
          </TableRow>
        );
      })}
    </>
  )
}

export default TableData;