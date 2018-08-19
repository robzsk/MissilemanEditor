import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Cell from './cell';

class Row extends Component {
  shouldComponentUpdate(next) {
    return next.data.toString() !== this.props.data.toString();
  }
  render() {
    return (<div className="row"> {
      this.props.data.map((v, i) => {
        return (<Cell key={i} value={v}/>);
      })
    }</div>);
  }
}

export default Row;
