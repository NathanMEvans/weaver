// @flow

import * as React from 'react';

import './GameHeader.css';

import {getTodaySpecialEmoji} from './wordPairs4.js';

class GameHeader extends React.Component {
  render() {
    const specialEmoji = getTodaySpecialEmoji();
    return (
      <div className='gameHeader'>
        <div className='gameHeaderLeftGroup'>
          <button className='howToPlayButton' onClick={this.props.onClickHowToPlay}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path 
                d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" 
              />
            </svg>
          </button>
        </div>
        <div className='gameTitle'>
          {specialEmoji}
          Weaver
          {specialEmoji}
        </div>
        <div className='gameHeaderRightGroup'>
          <button className='yesterdayButton' onClick={this.props.onClickYesterday}>
            <svg viewBox="0 0 24 24">
              <path d="M21,12V6c0-1.1-0.9-2-2-2h-1V2h-2v2H8V2H6v2H5C3.9,4,3,4.9,3,6v14c0,1.1,0.9,2,2,2h7v-2H5V10h14v2H21z M15.64,20 c0.43,1.45,1.77,2.5,3.36,2.5c1.93,0,3.5-1.57,3.5-3.5s-1.57-3.5-3.5-3.5c-0.95,0-1.82,0.38-2.45,1l1.45,0V18h-4v-4h1.5l0,1.43 C16.4,14.55,17.64,14,19,14c2.76,0,5,2.24,5,5s-2.24,5-5,5c-2.42,0-4.44-1.72-4.9-4L15.64,20z"></path>
            </svg>
          </button>
          <button className='userStatsButton' onClick={this.props.onClickUserStats}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path 
                d="M16,11V3H8v6H2v12h20V11H16z M10,5h4v14h-4V5z M4,11h4v8H4V11z M20,19h-4v-6h4V19z" 
              />
            </svg>
          </button>
        </div>
      </div>);
  }
}

export default GameHeader;