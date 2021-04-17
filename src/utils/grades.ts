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
 * @param {gradeHistory[]} history The grade history array to parse.
 * @returns {gradeChangeOverTime} The grade change over time.
 */
export const getGradeChangeOverTime: ((history: gradeHistory[]) => gradeChangeOverTime) = (history) => {
  if (!Array.isArray(history) || !history.length) {
    return {} as gradeChangeOverTime;
  }

  let weekly;
  let monthly;
  let yearly;

  const WEEK_MILLISECONDS = 604800000;
  const now = Number(new Date());

  if (now - Number(history[0].date) <= (WEEK_MILLISECONDS * 2)) {
    // If the history array has been updated in the past week, we can assume the entries to represent the weeks leading up to this point.
    weekly = history[0].grades;
    monthly = history[4]?.grades;
    yearly = history[51]?.grades;
  } else {
    // Otherwise we need to calculate how many weeks have passed since the last history change occurred.
    const latest = Number(history[0].date);
    const weeksSinceLastUpdate = Math.floor((now - latest) / WEEK_MILLISECONDS);

    weekly = {};
    monthly = weeksSinceLastUpdate <= 5 ? history[5 - weeksSinceLastUpdate].grades : {};
    yearly = history[51 - weeksSinceLastUpdate]?.grades;
  }

  const defaultValue = history[history.length - 1].grades;

  if (!monthly) {
    return {
      weekly,
      monthly: defaultValue,
      yearly: defaultValue,
    } as gradeChangeOverTime;
  }
  
  if (!yearly) {
    return {
      weekly,
      monthly,
      yearly: defaultValue,
    } as gradeChangeOverTime;
  }

  return {
    weekly,
    monthly,
    yearly,
  } as gradeChangeOverTime;
}