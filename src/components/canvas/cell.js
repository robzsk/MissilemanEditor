import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import PENS from './../../pens';

const draw = v =>
  Object.keys(PENS).reduce((a, c) => {
    if (PENS[c] === v) return c.toLowerCase();
    return a;
  }, PENS.EMPTY);

class Cell extends Component {
  shouldComponentUpdate(next) {
    return next.value !== this.props.value;
  }
  render() {
    return (<div className={`cell ${draw(this.props.value)}`}></div>)
  }
}

export default Cell;
