// @flow

import * as React from 'react';
import {
  GameRow, 
  EnteredGameRow, 
  StartWordRow, 
  EndWordRow,
} from './GameRow';

import './GameBoard.css';

class GameBoard extends React.Component {
  scrollToBottom = () => {
    this.inputRowsEnd.scrollIntoView({ behavior: "smooth" });
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  getLastEnteredWordOrStart() {
    if (this.props.enteredWords.length > 0) {
      return this.props.enteredWords.slice(-1)[0];
    } else {
      return this.props.startWord;
    }
  }
  
  render() {
    const wordLength = this.props.startWord.length;
    if (this.props.endWord.length !== wordLength) {
      return (
        <div>Something is wrong...apologies!</div>
      )
    }
    return (
      <div className='gameBoard'>
        <div className='startWordRowContainer'>
          <StartWordRow word={this.props.startWord} />
        </div>
        <div className='inputRowsContainer'>
          {this.props.enteredWords.map((word, index, words) =>
            <EnteredGameRow 
              key={index} 
              word={word} 
              previousWord={
                index > 0 ? words[index - 1] : this.props.startWord
              }
              endWord={this.props.endWord}
            />
          )}
          {!this.props.isGameOver ? 
            <GameRow length={wordLength} word={this.props.currentWord} />
            : null
          }
          <div className='inputRowsEndElement' ref={(el) => { this.inputRowsEnd = el; }}>
          </div>
        </div>
        <div className='endWordRowContainer'>
          <EndWordRow 
            word={this.props.endWord} 
            lastGameWord={this.getLastEnteredWordOrStart()} 
            isBouncingBlock={this.props.isGameOver}
          />
        </div>
        {this.props.enteredWords.length > 0 &&
          <button
            className='clearBoardButton'
            onClick={() => this.props.onClickClearBoard()}>
            Reset
          </button>
        }
      </div>
    );
  }
}

export default GameBoard;