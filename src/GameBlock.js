// @flow

import * as React from 'react';

class GameBlock extends React.Component {
  render() {
    const classNames = ['block'].concat(this.props.classNames);
    return <div className={classNames.join(' ')}>{this.props.character}</div>
  }
}

export default GameBlock;