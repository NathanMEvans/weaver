// @flow

import * as React from 'react';

import './GameModal.css';

class GameModal extends React.Component {
  render() {
    const overlayClassNames = ['overlay'];
    if (this.props.isOpen === true) {
      overlayClassNames.push('overlayOpen');
    }
    return (
      <div className={overlayClassNames.join(' ')}>
        <div className='overlayContent'>
          <div className='modal'>
            <div className='modalHeaderRow'>
              <div className='dummyLeftItem' />
              <div className='modalTitle'>
                {this.props.title}
              </div>
              <button className='closeModalButton' onClick={this.props.onClose}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path 
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                />
                </svg>
              </button>
            </div>
            <div className='modalContent'>
              {this.props.content}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GameModal;