// @flow

import * as React from 'react';
import GameModal from './GameModal.js';
import {EnteredGameRow, StartWordRow, EndWordRow} from './GameRow.js';
import {getYesterdayOptimalPath} from './wordPairs4.js';

import './YesterdayModal.css';

class HowToPlayModal extends React.Component {
  getModalContent() {
    const yesterdayOptimalPath = getYesterdayOptimalPath();
    const startWord = yesterdayOptimalPath[0];
    const endWord = yesterdayOptimalPath.slice(-1)[0];
    const rows = [];
    rows.push(
      <div key={startWord} className='yesterdayGameBoardRow'>
        <StartWordRow word={startWord} />
      </div>
    );
    for (let i = 1; i < yesterdayOptimalPath.length - 1; i++) {
      rows.push(
        <div key={yesterdayOptimalPath[i]} className='yesterdayGameBoardRow'>
          <EnteredGameRow 
            word={yesterdayOptimalPath[i]}
            previousWord={yesterdayOptimalPath[i-1]}
            endWord={endWord}
          />
        </div>
      );
    }
    rows.push(
      <div key={endWord} className='yesterdayGameBoardRow'>
        <EndWordRow word={endWord} lastGameWord={endWord} />
      </div>
    );
    return (
      <div className='yesterdayModalContentContainer'>
        <div className='yesterdayOptimalText'>
          Yesterday's optimal: {yesterdayOptimalPath.length - 1}
        </div>
        <div className='yesterdayGameBoardContainer'>
          {rows}
        </div>
        <div className='yesterdayExplanation'>
          This is just one optimal path.
          <br />
          There may be others!
        </div>
      </div>
    );
  }

  render() {
    return (
      <GameModal
        title='Yesterday'
        content={this.getModalContent()}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
      />
    );
  }
}

export default HowToPlayModal;