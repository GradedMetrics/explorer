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
          ids: psa10?.gradeIds,
          name: 'PSA 10',
          value: psa10?.grade,
        }, {
          description: 'Mint',
          ids: psa9?.gradeIds,
          name: 'PSA 9',
          value: psa9?.grade,
        }, {
          hasQualifier: true,
          ids: psa9?.qualifierIds,
          name: 'PSA 9',
          value: psa9?.qualifier,
        }, {
          ids: psa8?.halfIds,
          name: 'PSA 8.5',
          value: psa8?.half,
        }, {
          description: 'Near Mint - Mint',
          ids: psa8?.gradeIds,
          name: 'PSA 8',
          value: psa8?.grade,
        }, {
          hasQualifier: true,
          ids: psa8?.qualifierIds,
          name: 'PSA 8',
          value: psa8?.qualifier,
        }, {
          ids: psa7?.halfIds,
          name: 'PSA 7.5',
          value: psa7?.half,
        }, {
          description: 'Near Mint',
          ids: psa7?.gradeIds,
          name: 'PSA 7',
          value: psa7?.grade,
        }, {
          hasQualifier: true,
          ids: psa7?.qualifierIds,
          name: 'PSA 7',
          value: psa7?.qualifier,
        }, {
          ids: psa6?.halfIds,
          name: 'PSA 6.5',
          value: psa6?.half,
        }, {
          description: 'Excellent - Mint',
          ids: psa6?.gradeIds,
          name: 'PSA 6',
          value: psa6?.grade,
        }, {
          hasQualifier: true,
          ids: psa6?.qualifierIds,
          name: 'PSA 6',
          value: psa6?.qualifier,
        }, {
          ids: psa5?.halfIds,
          name: 'PSA 5.5',
          value: psa5?.half,
        }, {
          description: 'Excellent',
          ids: psa5?.gradeIds,
          name: 'PSA 5',
          value: psa5?.grade,
        }, {
          hasQualifier: true,
          ids: psa5?.qualifierIds,
          name: 'PSA 5',
          value: psa5?.qualifier,
        }, {
          ids: psa4?.halfIds,
          name: 'PSA 4.5',
          value: psa4?.half,
        }, {
          description: 'Very Good - Excellent',
          ids: psa4?.gradeIds,
          name: 'PSA 4',
          value: psa4?.grade,
        }, {
          hasQualifier: true,
          ids: psa4?.qualifierIds,
          name: 'PSA 4',
          value: psa4?.qualifier,
        }, {
          ids: psa3?.halfIds,
          name: 'PSA 3.5',
          value: psa3?.half,
        }, {
          description: 'Very Good',
          ids: psa3?.gradeIds,
          name: 'PSA 3',
          value: psa3?.grade,
        }, {
          hasQualifier: true,
          ids: psa3?.qualifierIds,
          name: 'PSA 3',
          value: psa3?.qualifier,
        }, {
          ids: psa2?.halfIds,
          name: 'PSA 2.5',
          value: psa2?.half,
        }, {
          description: 'Good',
          ids: psa2?.gradeIds,
          name: 'PSA 2',
          value: psa2?.grade,
        }, {
          hasQualifier: true,
          ids: psa2?.qualifierIds,
          name: 'PSA 2',
          value: psa2?.qualifier,
        }, {
          ids: psa1Half?.halfIds,
          description: 'Fair',
          name: 'PSA 1.5',
          value: psa1Half?.half,
        }, {
          hasQualifier: true,
          ids: psa1Half?.qualifierIds,
          name: 'PSA 1.5',
          value: psa1Half?.qualifier,
        }, {
          description: 'Poor',
          ids: psa1?.gradeIds,
          name: 'PSA 1',
          value: psa1?.grade,
        }, {
          hasQualifier: true,
          ids: psa1?.qualifierIds,
          name: 'PSA 1',
          value: psa1?.qualifier,
        }, {
          ids: auth?.gradeIds,
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