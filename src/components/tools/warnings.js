import React, { Component } from 'react';
import PENS from './../../pens';

class Warnings extends Component {
  getErrors() {
    const { data } = this.props;
    let player = false;
    let target = false;
    const ret = [];
    data.forEach(row => {
      if (row.indexOf(PENS.PLAYER) !== -1) {
        player = true;
      }
      if (row.indexOf(PENS.TARGET) !== -1) {
        target = true;
      }
    }, []);

    if (!player) {
      ret.push('Player spawn is not set.');
    }
    if (!target) {
      ret.push('At least one target must be placed.')
    }
    return ret;
  }
  render() {
    const errors = this.getErrors();
    return (
      <div className="warnings">
        {
          errors.map((e, i) => (<div key={i}>Warning: {e}</div>))
        }
      </div>
    )
  }
}

export default Warnings;
