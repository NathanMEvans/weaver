// @flow

import * as React from 'react';

class GameKeyboard extends React.Component {
  render() {
    return (
      <div className='keyboard'>
        <div className='keyboardRow'>
          {['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'].map(char => 
            <KeyboardCharacterButton
              key={char}
              character={char}
              onClick={() => this.props.onClickCharacter(char)}
            />
          )}
        </div>
        <div className='keyboardRow'>
          <div className='keyboardSpacer' />
          {['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'].map(char => 
            <KeyboardCharacterButton
              key={char}
              character={char}
              onClick={() => this.props.onClickCharacter(char)}
            />
          )}
          <div className='keyboardSpacer' />
        </div>
        <div className='keyboardRow'>
          <KeyboardEnterButton onClick={() => this.props.onClickEnter()} />
          {['z', 'x', 'c', 'v', 'b', 'n', 'm'].map(char => 
            <KeyboardCharacterButton
              key={char}
              character={char}
              onClick={() => this.props.onClickCharacter(char)}
            />
          )}
          <KeyboardDeleteButton onClick={() => this.props.onClickDelete()} />
        </div>
      </div>
    );
  }
}

class KeyboardCharacterButton extends React.Component {
  render() {
    return (
      <button className='button characterButton' onClick={this.props.onClick}>
        {this.props.character}
      </button>
    );
  }
}

class KeyboardEnterButton extends React.Component {
  render() {
    return (
      <button className='button enterButton' onClick={this.props.onClick}>
        Enter
      </button>
    );
  }
}

class KeyboardDeleteButton extends React.Component {
  render() {
    return (
      <button className='button deleteButton' onClick={this.props.onClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path 
            d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z" 
          />
        </svg>
      </button>
    );
  }
}

export default GameKeyboard;