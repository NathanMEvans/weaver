// @flow

import * as React from 'react';
import GameModal from './GameModal.js';

import './HowToPlayModal.css';
import {EnteredGameRow, ExampleGameRow} from './GameRow.js';

class HowToPlayModal extends React.Component {
  getModalContent() {
    return (
      <div id='howToPlayModalContent'>
        <div className='howToPlayHistorySection'>
          This game is called a "word ladder" and was invented by Lewis Carroll in 1877.
        </div>
        <div className='howToPlayRulesSection'>
          <div className='howToPlayExampleTitle'>
            Rules
          </div>
          <div className='howToPlaySentenceBlock'>
            Weave your way from the start word to the end word.
          </div>
          <div className='howToPlaySentenceBlock'>
            Each word you enter <b>can only change 1 letter</b> from the word above it.
          </div>
        </div>
        <div className='howToPlayExampleSection'>
          <div className='howToPlayExampleTitle'>
            Example
          </div>
          <div className='howToPlayExampleGameRow'>
            <ExampleGameRow word='east' />
          </div>
          <div className='howToPlaySentenceBlock'>
            <b>EAST</b> is the start word, <b>WEST</b> is the end word
          </div>
          <div className='howToPlayExampleGameRow'>
            <EnteredGameRow 
              word='vast'
              previousWord='east'
              endWord='west'
            />
          </div>
          <div className='howToPlaySentenceBlock'>
            We changed <b>E</b> to <b>V</b> to make <b>VAST</b>
          </div>
          <div className='howToPlayExampleGameRow'>
            <EnteredGameRow 
              word='vest'
              previousWord='vast'
              endWord='west'
            />
          </div>
          <div className='howToPlaySentenceBlock'>
            We changed <b>A</b> to <b>E</b> to make <b>VEST</b>
          </div>
          <div className='howToPlayExampleGameRow'>
            <EnteredGameRow 
              word='west'
              previousWord='vest'
              endWord='west'
            />
          </div>
          <div className='howToPlaySentenceBlock'>
            And we changed <b>V</b> to <b>W</b> to make <b>WEST</b>
          </div>
          <div className='howToPlayExampleGameRow'>
            <ExampleGameRow word='west' />
          </div>
          <div className='howToPlaySentenceBlock'>
            Done!
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <GameModal
        title='How To Play'
        content={this.getModalContent()}
        isOpen={this.props.isOpen}
        onClose={this.props.onClose}
      />
    );
  }
}

export default HowToPlayModal;