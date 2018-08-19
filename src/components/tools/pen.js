import React, { Component } from 'react';
import { changePen } from './../../actions/pen';

class Pen extends Component {
  onClick(e) {
    changePen(this.props.number);
  }
  render() {
    return (
      <div onClick={this.onClick.bind(this)} className="pen">
        <div className={`color ${this.props.name}`}></div>
        <div className="penText">{this.props.name}</div>
      </div>
    )
  }
}

export default Pen;
