// @flow

import * as React from 'react';
import GameBlock from './GameBlock';

class GameRow extends React.Component {
  render() {
    const word = this.props.word != null ? this.props.word : '';
    const blocks = [];
    for (let i = 0; i < this.props.length; i++) {
      const character = i < word.length ?  word[i] : undefined;
      const classNames = [];
      if (character != null) {
        classNames.push('filledBlock');
      }
      if (i === word.length) {
        classNames.push('currentBlock');
      }
      blocks.push(
        <GameBlock 
          key={i} 
          character={character}
          classNames={classNames}
        />
      );
    }
    return (
      <div className='row'>
        {blocks}
      </div>
    );
  }
}

class EnteredGameRow extends React.Component {
  render() {
    const blocks = [];
    for (let i = 0; i < this.props.word.length; i++) {
      const classNames = ['filledBlock'];
      if (this.props.word.charAt(i) !== this.props.previousWord.charAt(i)) {
        classNames.push('transitionBlock');
      }
      if (this.props.word.charAt(i) === this.props.endWord.charAt(i)) {
        classNames.push('correctBlock');
      }
      blocks.push(
        <GameBlock 
          key={i} 
          character={this.props.word[i]}
          classNames={classNames}
        />
      );
    }
    return (
      <div className='row'>
        {blocks}
      </div>
    );
  }
}

class StartWordRow extends React.Component {
  render() {
    const blocks = [];
    for (let i = 0; i < this.props.word.length; i++) {
      blocks.push(
        <GameBlock 
          key={i} 
          character={this.props.word[i]}
          classNames={['startWordBlock']}
        />
      );
    }
    return (
      <div className='row startWordRow'>
        {blocks}
      </div>
    );
  }
}

class EndWordRow extends React.Component {
  render() {
    const blocks = [];
    for (let i = 0; i < this.props.word.length; i++) {
      const isBlockComplete = this.props.word.charAt(i) === this.props.lastGameWord.charAt(i);
      blocks.push(
        <GameBlock 
          key={i} 
          character={this.props.word[i]}
          classNames={
            isBlockComplete ? (
              this.props.isBouncingBlock ? 
                ['endWordBlockComplete', 'bouncingBlock'] :
                ['endWordBlockComplete']
            ): ['endWordBlock']
          }
        />
      );
    }
    return (
      <div className='row endWordRow'>
        {blocks}
      </div>
    );
  }
}

class ExampleGameRow extends React.Component {
  render() {
    const blocks = [];
    for (let i = 0; i < this.props.word.length; i++) {
      blocks.push(
        <GameBlock 
          key={i} 
          character={this.props.word[i]}
          classNames={['exampleWordBlock']}
        />
      );
    }
    return (
      <div className='row'>
        {blocks}
      </div>
    );
  }
}

export {
  GameRow,
  EnteredGameRow,
  StartWordRow,
  EndWordRow,
  ExampleGameRow,
};