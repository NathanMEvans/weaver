// @flow

import {getCurrentWordPair, getTodayOptimalPathLength} from './wordPairs4.js';
import {getNumDaysSinceEpoch} from './utils.js';
import {logEventWithCustomLabel} from './loggingUtils.js';

export function getTodaysUserStats() {
  const userStats = JSON.parse(localStorage.getItem('userStats'));
  if (userStats == null) {
    return {
      'numSolved': 0,
      'todayEpochDay': getNumDaysSinceEpoch(),
      'todayMinPathLength': null,
      'todayOptimalPathLength': null,
      'todayStartWord': null,
      'todayEndWord': null,
      'todayMinPathWords': null,
      'currentStreak': 0,
      'longestStreak': 0,
    };
  } else {
    const [startWord, endWord, optimalPathLength] = getCurrentWordPair();
    return {
      'numSolved': userStats['numSolved'],
      'todayEpochDay': getNumDaysSinceEpoch(),
      'todayMinPathLength': 
        userStats['lastSolvedEpochDayStats']['epochDay'] === getNumDaysSinceEpoch() ? 
          userStats['lastSolvedEpochDayStats']['minPathLength'] :
          null,
      'todayOptimalPathLength': optimalPathLength,
      'todayStartWord': startWord,
      'todayEndWord': endWord,
      'todayMinPathWords': userStats['lastSolvedEpochDayStats']['minPathWords'],
      'currentStreak': 
        userStats['lastSolvedEpochDayStats']['epochDay'] >= (getNumDaysSinceEpoch() - 1) ? 
          userStats['currentStreak'] :
          0,
      'longestStreak': userStats['longestStreak'],
    };
  }
}

export function getHasSolvedToday() {
  const userStats = JSON.parse(localStorage.getItem('userStats'));
  if (userStats == null) {
    return false;
  }
  return userStats['lastSolvedEpochDayStats']['epochDay'] === getNumDaysSinceEpoch();
}

function logPuzzleSolve(pathLength) {
  const optimalPathLength = getTodayOptimalPathLength();
  logEventWithCustomLabel('puzzle_solve', 'delta:' + (pathLength - optimalPathLength));
}

export function updateUserStatsWithWin(solvedEpochDay, enteredWords) {
  const pathLength = enteredWords.length;
  logPuzzleSolve(pathLength);
  const existingUserStats = JSON.parse(localStorage.getItem('userStats'));
  let newUserStats;
  if (existingUserStats == null) {
    newUserStats = {
      'numSolved': 1,
      'lastSolvedEpochDayStats': {
        'epochDay': solvedEpochDay,
        'minPathLength': pathLength,
        'minPathWords': enteredWords,
      },
      'currentStreak': 1,
      'longestStreak': 1,
    };
  } else {
    const lastSolvedEpochDayStats = existingUserStats['lastSolvedEpochDayStats'];
    const lastSolvedEpochDay = lastSolvedEpochDayStats['epochDay'];
    const isRepeatingBoard = lastSolvedEpochDay === solvedEpochDay;
    if (isRepeatingBoard) {
      const existingMinPathLength = lastSolvedEpochDayStats['minPathLength'];
      if (pathLength <= existingMinPathLength) {
        newUserStats = existingUserStats;
        newUserStats['lastSolvedEpochDayStats'] = {
          'epochDay': solvedEpochDay,
          'minPathLength': pathLength,
          'minPathWords': enteredWords,
        };
      } else {
        // If user is repeating a day's board and doesn't solve the board more optimally,
        // then we do not update the stats.
        return;
      }
    } else {
      const isStreakContinued = lastSolvedEpochDay === solvedEpochDay - 1;
      const newCurrentStreak = isStreakContinued ? existingUserStats['currentStreak'] + 1 : 1;
      const existingLongestStreak = existingUserStats['longestStreak'];
      newUserStats = {
        'numSolved': existingUserStats['numSolved'] += 1,
        'lastSolvedEpochDayStats': {
          'epochDay': solvedEpochDay,
          'minPathLength': pathLength,
          'minPathWords': enteredWords,
        },
        'currentStreak': newCurrentStreak,
        'longestStreak': newCurrentStreak > existingLongestStreak ? newCurrentStreak : existingLongestStreak,
      };
    }
  }
  localStorage.setItem(
    'userStats',
    JSON.stringify(newUserStats),
  );
}