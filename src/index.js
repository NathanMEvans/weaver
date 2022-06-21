// @flow

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Game from './Game';
import GameHeader from './GameHeader';
import GameStatsModal from './GameStatsModal';
import HowToPlayModal from './HowToPlayModal';
import YesterdayModal from './YesterdayModal';
import {getCurrentWordPair, getTodaySpecialMessageData} from './wordPairs4.js';
import {getNumDaysSinceEpoch} from './utils.js';
import {getHasSolvedToday} from './userStatsUtils.js';
import {logEventWithWordsLabel} from './loggingUtils.js';

ReactDOM.render(
  <React.StrictMode>
    <CreateGame />
  </React.StrictMode>,
  document.getElementById('app-container')
);

function CreateGame() {
  const [startWord, endWord] = getCurrentWordPair();
  const currentEpochDay = getNumDaysSinceEpoch();
  const hasSolvedToday = getHasSolvedToday();

  const [isHowToPlayModalOpen, setIsHowToPlayModalOpen] = useState(false);
  const [isYesterdayModalOpen, setIsYesterdayModalOpen] = useState(false);
  const [isGameStatsModalOpen, setIsGameStatsModalOpen] = useState(hasSolvedToday);

  return (
    <div id='game-container'>
      <GameHeader
        onClickHowToPlay={() => {
          logEventWithWordsLabel('click_how_to_play');
          setIsHowToPlayModalOpen(true);
        }}
        onClickYesterday={() => {
          logEventWithWordsLabel('click_yesterday');
          setIsYesterdayModalOpen(true);
        }}
        onClickUserStats={() => {
          logEventWithWordsLabel('click_user_stats');
          setIsGameStatsModalOpen(true);
        }} 
      />
      <Game 
        startWord={startWord} 
        endWord={endWord}
        gameEpochDay={currentEpochDay}
        onGameLoad={() => setSpecialMessageToast()}
        openGameStatsModal={() => setIsGameStatsModalOpen(true)}
        setErrorToast={(message) => setErrorToast(message)}
        setSuccessToast={(message) => setSuccessToast(message)}
      />
      <HowToPlayModal
        isOpen={isHowToPlayModalOpen}
        onClose={() => setIsHowToPlayModalOpen(false)}
      />
      <YesterdayModal
        isOpen={isYesterdayModalOpen}
        onClose={() => setIsYesterdayModalOpen(false)}
      />
      <GameStatsModal 
        isOpen={isGameStatsModalOpen} 
        onClose={() => setIsGameStatsModalOpen(false)} 
        onCopyToClipboard={() => setGenericToast('Copied to clipboard')}
      />
      <div className='toast aboveKeyboardToast' id='error-toast' />
      <div className='toast aboveKeyboardToast' id='success-toast' />
      <div className='toast aboveKeyboardToast' id='generic-toast' />
      <div className='toast belowHeaderToast' id='special-message-toast' />
    </div>
  );
}

function setErrorToast(message) {
  setToast('error-toast', message, 2000);
}

function setSuccessToast(message) {
  setToast('success-toast', message, 2000);
}

function setGenericToast(message) {
  setToast('generic-toast', message, 2000);
}

function setSpecialMessageToast() {
  const [todaySpecialMessage, todaySpecialMessageBackgroundColor] = getTodaySpecialMessageData();
  if (todaySpecialMessage != null) {
    if (todaySpecialMessageBackgroundColor != null) {
      const specialMessageToastElement = document.getElementById('special-message-toast');
      specialMessageToastElement.style.setProperty('background-color', todaySpecialMessageBackgroundColor);
    }
    setToast('special-message-toast', todaySpecialMessage, 3000);
  }
}

function setToast(elementId, message, duration) {
  const element = document.getElementById(elementId);
  element.innerText = message;
  element.style.display = 'block';
  setTimeout(() => {
    element.style.display = 'none';
    element.innerText = null;
  }, duration);
}
