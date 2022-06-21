// @flow

import * as React from 'react';
import GameBoard from './GameBoard';
import GameKeyboard from './GameKeyboard';
import {
  isAlphabetCharacter, 
  getCharacterDiffCount,
} from './utils.js';
import {isValidWord4} from './words4.js';
import {isValidWord5} from './words5.js';
import {updateUserStatsWithWin} from './userStatsUtils.js';
import {logEventWithWordsLabel} from './loggingUtils.js';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredWords: [],
      currentWord: '',
      isGameOver: false,
    };
  }

  addCharacter(character) {
    if (this.state.isGameOver) {
      return;
    }

    const currentWord = this.state.currentWord;
    if (currentWord.length >= this.props.startWord.length) {
      return;
    }
    const newCurrentWord = currentWord + character.toLowerCase();
    this.setState({currentWord: newCurrentWord});
  }

  removeCharacter() {
    if (this.state.isGameOver) {
      return;
    }

    const currentWord = this.state.currentWord;
    if (currentWord.length === 0 && this.state.enteredWords.length > 0) {
      const newEnteredWords = this.state.enteredWords;
      const newCurrentWord = newEnteredWords.pop();
      this.setState({
        enteredWords: newEnteredWords,
        currentWord: newCurrentWord,
      })
    } else {
      const newCurrentWord = currentWord.substring(0, currentWord.length - 1);
      this.setState({currentWord: newCurrentWord});
    }
  }

  getLastEnteredWordOrStart() {
    if (this.state.enteredWords.length > 0) {
      return this.state.enteredWords.slice(-1)[0];
    } else {
      return this.props.startWord;
    }
  }

  processEnter() {
    if (this.state.isGameOver) {
      return;
    }

    const currentWord = this.state.currentWord;
    if (currentWord.length < this.props.startWord.length) {
      return;
    }
    
    // validate new word diffs by exactly 1 character
    const previousWord = this.getLastEnteredWordOrStart();
    const characterDiffCount = getCharacterDiffCount(currentWord, previousWord);
    if (characterDiffCount === 0) {
      this.props.setErrorToast('Did not change any characters');
      return;
    }
    if (getCharacterDiffCount(currentWord, previousWord) !== 1) {
      this.props.setErrorToast('Cannot change more than 1 character');
      return;
    }

    // validate word
    if (
      (currentWord.length === 4 && !isValidWord4(currentWord)) ||
      (currentWord.length === 5 && !isValidWord5(currentWord))
    ) {
      this.props.setErrorToast('Not in word list');
      return;
    }

    const newEnteredWords = this.state.enteredWords;
    newEnteredWords.push(currentWord);

    if (getCharacterDiffCount(currentWord, this.props.endWord) === 0) {
      this.setState({
        enteredWords: newEnteredWords,
        currentWord: null,
        isGameOver: true,
      });
      localStorage.setItem('isGameOver', true);
      updateUserStatsWithWin(this.props.gameEpochDay, newEnteredWords);
      this.props.setSuccessToast('You win!');
      setTimeout(() => this.props.openGameStatsModal(), 1000);
    } else {
      this.setState({
        enteredWords: newEnteredWords,
        currentWord: '',
      });
    }
    localStorage.setItem('enteredWords', JSON.stringify(newEnteredWords));
  }

  processKeyboardEvent(event) {
    if (event.keyCode === 8 /* DELETE */) {
      this.removeCharacter();
    } else if (event.keyCode === 13 /* ENTER */) {
      this.processEnter();
    } else if (isAlphabetCharacter(event.key)) {
      this.addCharacter(event.key);
    }
  }

  setStateFromLocalStorage() {
    this.setState({
      enteredWords: JSON.parse(localStorage.getItem('enteredWords')) ?? [],
      isGameOver: localStorage.getItem('isGameOver') === 'true',
    })
  }

  onClearBoard() {
    this.setState({
      enteredWords: [],
      currentWord: '',
      isGameOver: false,
    });
    localStorage.setItem('enteredWords', JSON.stringify([]));
    localStorage.setItem('isGameOver', false);
  }

  componentDidMount() {
    const storedStartWord = localStorage.getItem('startWord');
    const storedEndWord = localStorage.getItem('endWord');
    if (storedStartWord === this.props.startWord && storedEndWord === this.props.endWord) {
      this.setStateFromLocalStorage();
    } else {
      localStorage.setItem('startWord', this.props.startWord);
      localStorage.setItem('endWord', this.props.endWord);
      localStorage.setItem('enteredWords', JSON.stringify([]));
      localStorage.setItem('isGameOver', false);
    }

    document.addEventListener('keydown', function(event) {
      this.processKeyboardEvent(event);
    }.bind(this));

    this.props.onGameLoad();
  }

  render() {
    return (
      <div className='game'>
        <GameBoard 
          startWord={this.props.startWord}
          endWord={this.props.endWord} 
          enteredWords={this.state.enteredWords}
          currentWord={this.state.currentWord}
          isGameOver={this.state.isGameOver}
          onClickClearBoard={() => {
            logEventWithWordsLabel('click_clear_board');
            this.onClearBoard();
          }}
        />
        <GameKeyboard 
          onClickCharacter={(char) => this.addCharacter(char)}
          onClickDelete={() => this.removeCharacter()}
          onClickEnter={() => this.processEnter()}
        />
      </div>
    );
  }
}

export default Game;
