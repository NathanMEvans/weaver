// @flow

import * as React from 'react';
import GameBlock from './GameBlock.js';
import GameModal from './GameModal.js';
import {getTodaysUserStats} from './userStatsUtils.js';
import {getCharacterDiffCount, getDateStringFromDaysSinceEpoch} from './utils.js';
import {getTodaySpecialEmoji} from './wordPairs4.js';
import {logEventWithWordsLabel, logEventWithCustomLabel} from './loggingUtils.js';

import './GameStatsModal.css';

class GameStatsModal extends React.Component {
  copyToClipboard(text) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    this.props.onCopyToClipboard();
  }

  shareOrCopyToClipboard(text) {
    if (navigator.canShare && navigator.canShare({text: text})) {
      navigator
        .share({
          text: text,
        })
        .then(() => {
          logEventWithWordsLabel('share_success');
        })
        .catch(error => {
          logEventWithCustomLabel('share_failure', String(error));
          this.copyToClipboard(text);
        });
    } else {
      logEventWithWordsLabel('share_unsupported');
      this.copyToClipboard(text);
    }
  }

  getEnteredWordsText(enteredWords, endWord) {
    let text = '';
    for (let i = 0; i < enteredWords.length; i++) {
      const enteredWord = enteredWords[i];
      const enteredWordEndWordCharacterDiffCount = getCharacterDiffCount(enteredWord, endWord);
      const numGreenSquares = endWord.length - enteredWordEndWordCharacterDiffCount;
      for (let j = 0; j < endWord.length; j++) {
        if (j < numGreenSquares) {
          text += '🟩';
        } else {
          text += '⬜';
        }
      }
      text += '\n';
    }
    return text;
  }

  shareTodaysResultsOrCopyToClipboard(todayEpochDay, startWord, endWord, score, enteredWords) {
    const todayDateString = getDateStringFromDaysSinceEpoch(todayEpochDay);
    const specialEmoji = getTodaySpecialEmoji();
    let text = 'Weaver';
    text += specialEmoji != null ? specialEmoji : ' ';
    text += todayDateString + '\n\n';
    const wordSize = startWord.length;
    text += startWord.toUpperCase() + '\n';
    text += this.getEnteredWordsText(enteredWords, endWord);
    text += endWord.toUpperCase();
    this.shareOrCopyToClipboard(text);
  }

  getModalContent() {
    const userStats = getTodaysUserStats();
    return (
      <div id='gameStatsModalContent'>
        <div className='todayUserStatsRow'>
          {userStats['todayMinPathLength'] != null &&
            <div className='userStat'>
              <GameBlock character={userStats['todayOptimalPathLength']} classNames={['userStatsBlock']} />
              <div className='userStatLabel'>
                Today's Optimal
              </div>
            </div>
          }
          <div className='userStat'>
            {userStats['todayMinPathLength'] == null ?
              <GameBlock character='?' classNames={['userStatsBlock']} /> :
              <GameBlock character={userStats['todayMinPathLength']} classNames={['successUserStatsBlock']} />
            }
            <div className='userStatLabel'>
              Today's Score
            </div>
          </div>
          {userStats['todayMinPathLength'] != null &&
            <div className='shareTodaysScoreButtonContainer'>
              <button className='shareTodaysScoreButton' 
                onClick={() => 
                  this.shareTodaysResultsOrCopyToClipboard(
                    userStats['todayEpochDay'],
                    userStats['todayStartWord'],
                    userStats['todayEndWord'],
                    userStats['todayMinPathLength'], 
                    userStats['todayMinPathWords'], 
                  )}>
                <div className='shareButtonText'>
                  Share
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92s2.92-1.31 2.92-2.92c0-1.61-1.31-2.92-2.92-2.92zM18 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM6 13c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm12 7.02c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
                </svg>
              </button>
            </div>
          }
        </div>
        <div className='historicalUserStatsRow'>
          <div className='userStat'>
            <GameBlock character={userStats['numSolved']} classNames={['userStatsBlock']} />
            <div className='userStatLabel'>
              Solved
            </div>
          </div>
          <div className='userStat'>
            <GameBlock character={userStats['longestStreak']} classNames={['userStatsBlock']} />
            <div className='userStatLabel'>
              Longest Streak
            </div>
          </div>
          <div className='userStat'>
            <GameBlock character={userStats['currentStreak']} classNames={['userStatsBlock']} />
            <div className='userStatLabel'>
              Current Streak
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <GameModal
        title='Statistics'
        content={this.getModalContent()}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
      />
    );
  }
}

export default GameStatsModal;