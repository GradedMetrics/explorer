import {
  flattenedGrade,
  gradeChangeOverTime,
  gradeHistory,
  grades,
} from '../types';

/**
 * This flattens the grades object to allow easy rendering onto a table.
 * @param {grades} grades The grades object to flatten.
 * @returns {flattenedGrade[]} An array of flattened grades.
 */
export const flattenGrades: ((grades: grades) => flattenedGrade[]) = ({
  1: psa1,
  '1.5': psa1Half,
  2: psa2,
  3: psa3,
  4: psa4,
  5: psa5,
  6: psa6,
  7: psa7,
  8: psa8,
  9: psa9,
  10: psa10,
  auth,
  total,
}) => {
  const overallTotal = (total.grade || 0) + (total.half || 0) + (total.qualifier || 0);

  return (
    [
      {
        name: 'Total',
        value: overallTotal,
      },
      ...[
        {
          description: 'Gem Mint',
          name: 'PSA 10',
          value: psa10?.grade,
        }, {
          hasQualifier: true,
          name: 'PSA 9',
          value: psa9?.qualifier,
        }, {
          description: 'Mint',
          name: 'PSA 9',
          value: psa9?.grade,
        }, {
          name: 'PSA 8.5',
          value: psa8?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 8',
          value: psa8?.qualifier,
        }, {
          description: 'Near Mint - Mint',
          name: 'PSA 8',
          value: psa8?.grade,
        }, {
          name: 'PSA 7.5',
          value: psa7?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 7',
          value: psa7?.qualifier,
        }, {
          description: 'Near Mint',
          name: 'PSA 7',
          value: psa7?.grade,
        }, {
          name: 'PSA 6.5',
          value: psa6?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 6',
          value: psa6?.qualifier,
        }, {
          description: 'Excellent - Mint',
          name: 'PSA 6',
          value: psa6?.grade,
        }, {
          name: 'PSA 5.5',
          value: psa5?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 5',
          value: psa5?.qualifier,
        }, {
          description: 'Excellent',
          name: 'PSA 5',
          value: psa5?.grade,
        }, {
          name: 'PSA 4.5',
          value: psa4?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 4',
          value: psa4?.qualifier,
        }, {
          description: 'Very Good - Excellent',
          name: 'PSA 4',
          value: psa4?.grade,
        }, {
          name: 'PSA 3.5',
          value: psa3?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 3',
          value: psa3?.qualifier,
        }, {
          description: 'Very Good',
          name: 'PSA 3',
          value: psa3?.grade,
        }, {
          name: 'PSA 2.5',
          value: psa2?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 2',
          value: psa2?.qualifier,
        }, {
          description: 'Good',
          name: 'PSA 2',
          value: psa2?.grade,
        }, {
          hasQualifier: true,
          name: 'PSA 1.5',
          value: psa1Half?.qualifier,
        }, {
          description: 'Fair',
          name: 'PSA 1.5',
          value: psa1Half?.half,
        }, {
          hasQualifier: true,
          name: 'PSA 1',
          value: psa1?.qualifier,
        }, {
          description: 'Poor',
          name: 'PSA 1',
          value: psa1?.grade,
        }, {
          name: 'Authentic',
          value: auth?.grade,
        }
      ]
        .filter(({ value }) => value)
        .map(entry => ({
          ...entry,
          percentageOfTotal: Math.floor(((100/overallTotal) * (entry.value || 0)) * 100) / 100,
        }))
    ]
  ) as flattenedGrade[];
}

/**
 * This takes a full grade history array and determines the weekly, monthly and yearly change.
 * Note that the history array is only updated if data changes, meaning weeks may be missing. This
 * accounts for that.
 * @param {gradeHistory[]} contentHistory The grade history array to parse.
 * @param {gradeHistory[]} allHistory
 * @returns {gradeChangeOverTime} The grade change over time.
 */
export const getGradeChangeOverTime: ((
  contentHistory: gradeHistory[],
  allHistory: gradeHistory[]
) => gradeChangeOverTime) = (contentHistory, allHistory) => {
  if (!Array.isArray(contentHistory) || !contentHistory.length) {
    return {} as gradeChangeOverTime;
  }

  const WEEK_INDEX = 0; // 1 week
  const MONTH_INDEX = 4; // 5 weeks
  const YEAR_INDEX = 51; // 52 weeks

  let weekly = {};
  let monthly;
  let yearly;

  console.log(contentHistory, allHistory);

  const hasDirectMatch = (index: number) => {
    // Compare the content history with the full history to see if there was a change on the given date index.
    return Number(contentHistory[index]?.date) === Number(allHistory[index + 1].date);
  }

  if (hasDirectMatch(WEEK_INDEX)) {
    // There have been changes in the past week.
    weekly = contentHistory[WEEK_INDEX].grades;
  }

  if (contentHistory.length === 1) {
    // There is only one historic entry and we've processed it already, no need to continue.
    return {
      weekly,
      monthly: weekly,
      yearly: weekly,
    } as gradeChangeOverTime;
  }

  const getOldestChange = (cutOffDate: number) => {
    // Find the oldest piece of content history prior to the provided cut off date. 
    const changes = contentHistory.filter(entry => Number(entry.date) > cutOffDate);
    return changes[changes.length - 1];
  }

  if (hasDirectMatch(MONTH_INDEX)) {
    // There have been changes in the past month and this is the furthest date.
    monthly = contentHistory[MONTH_INDEX].grades;
  } else {
    // Otherwise grab the oldest change within the 5 week period.
    monthly = getOldestChange(Number(allHistory[MONTH_INDEX + 1].date))?.grades;
  }

  if (hasDirectMatch(YEAR_INDEX)) {
    // There have been changes in the past year and this is the furthest date.
    yearly = contentHistory[YEAR_INDEX].grades;
  } else {
    yearly = getOldestChange(Number(allHistory[YEAR_INDEX + 1].date))?.grades;
  }

  return {
    weekly,
    monthly,
    yearly,
  } as gradeChangeOverTime;
}