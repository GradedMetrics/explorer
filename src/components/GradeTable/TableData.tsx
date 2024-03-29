import React from 'react';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Tooltip from '../Tooltip';
import {
  card,
  expansion,
  flattenedGrade,
  gradeChangeOverTime,
} from '../../types';
import {
  flattenGrades,
} from '../../utils/grades';
import Modal from '../Modal';
import Entries from './Entries';

export const historicBackground = `255, 246, 143`;
export const totalBackground = `205, 238, 140`;

type GradeCountProps = {
  compare?: flattenedGrade,
  data?: flattenedGrade,
  entries?: card[],
  expansion?: expansion
  historyDeductsFromTotal?: boolean,
  isHistoric?: boolean,
  name?: string,
  period?: string,
  total?: flattenedGrade,
}

const GradeCount: React.FC<GradeCountProps> = ({
  compare,
  data,
  entries,
  expansion,
  historyDeductsFromTotal = true,
  isHistoric = false,
  name: tableName,
  period,
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

    return {
      background: isHistoric ? `rgba(${historicBackground}, ${percentage})` : `rgba(${totalBackground}, ${percentage})`,
      borderLeft: isHistoric ? '1px solid #e0e0e0' : undefined,
      borderTop: isHistoric ? '1px solid #e0e0e0' : undefined,
    };
  }

  const {
    hasQualifier,
    ids,
    name,
    percentageOfTotal,
    value,
  } = data;

  let content;

  const totalRowStyle = name === 'Total' ? { fontWeight: 700 } : undefined;

  if (isHistoric && compare) {
    const {
      value: current,
    } = compare;

    const offset = historyDeductsFromTotal ? current + value : value;
    const percentageValueOffset = historyDeductsFromTotal ? (current + value) : (current - value);
    const percentage = historyDeductsFromTotal ? ((100 / percentageValueOffset) * -value) : (100 / value) * percentageValueOffset;

    if (!historyDeductsFromTotal && compare.value - value === 0) {
      return noData;
    }

    const displayValue = (historyDeductsFromTotal ? -value : compare.value - value);

    content = (
      <>
        {ids && entries ? (
          <Modal inline opener={displayValue.toLocaleString()}>
            <Entries
              data={entries}
              expansion={expansion}
              grade={`${name}${hasQualifier ? ` with qualifier` : ''}`}
              historyDeductsFromTotal={historyDeductsFromTotal}
              ids={ids}
              name={tableName as string}
              period={period}
              total={displayValue}
            />
          </Modal>
        ) : (
          <>
            {displayValue.toLocaleString()}
          </>
        )}
        {' '}
        <Typography variant="caption" color="textSecondary" style={totalRowStyle}>
          ({offset.toLocaleString()})
        </Typography>
        <Typography variant="caption" color="textSecondary" display="block" style={totalRowStyle}>
          {percentageValueOffset === 0 ? <em>New</em> : `${percentage > 0 ? '+' : ''}${Math.floor(percentage * 100) / 100}%`}
        </Typography>
      </>
    );
  } else {
    content = (
      <>
        {ids && entries ? (
          <Modal inline opener={value.toLocaleString()}>
            <Entries
              data={entries}
              expansion={expansion}
              grade={`${name}${hasQualifier ? ` with qualifier` : ''}`}
              historyDeductsFromTotal={false}
              ids={ids}
              name={tableName as string}
              period={period}
              total={value}
            />
          </Modal>
        ) : value.toLocaleString()}
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
  data: flattenedGrade[]
  expansion?: expansion
  entries?: card[]
  history: gradeChangeOverTime
  historyDeductsFromTotal: boolean
  name?: string
};

const TableData: React.FC<TableDataProps> = ({
  data,
  entries,
  expansion,
  history,
  historyDeductsFromTotal,
  name: tableName,
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
          ids,
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
                        <Typography variant="body2" paragraph>
                          Has a qualifier.
                        </Typography>
                        <Typography variant="body2" paragraph>
                          Qualifiers allow the grade to retain a higher score than it otherwise would have received due to a notable defect recorded as follows: MC (miscut), MK (marked), OC (off-center), OF (out of focus), PD (print defect), or ST (stained).
                        </Typography>
                        <Typography variant="body2">
                          PSA's population report does not differentiate between these.
                        </Typography>
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
            <GradeCount data={entry} entries={entries} name={tableName} total={total} expansion={expansion} />
            <Hidden xsDown>
              <GradeCount data={weeklyData} entries={entries} historyDeductsFromTotal={historyDeductsFromTotal} isHistoric compare={entry} total={totalWeekly} name={tableName} period="1 week" expansion={expansion} />
              <GradeCount data={monthlyData} entries={entries} historyDeductsFromTotal={historyDeductsFromTotal} isHistoric compare={entry} total={totalMonthly} name={tableName} period="5 weeks" expansion={expansion} />
              <GradeCount data={yearlyData} entries={entries} historyDeductsFromTotal={historyDeductsFromTotal} isHistoric compare={entry} total={totalYearly} name={tableName} period="52 weeks" expansion={expansion} />
            </Hidden>
          </TableRow>
        );
      })}
    </>
  )
}

export default TableData;