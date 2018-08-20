import React, { Component } from 'react';
import { changePen } from './../../actions/pen';

class Pen extends Component {
  onClick(e) {
    changePen(this.props.number);
  }
  isSelected() {
    return this.props.selected ? 'penSelected' : '';
  }
  render() {
    return (
      <div onClick={this.onClick.bind(this)} className={`pen ${this.isSelected()}`}>
        <div className={`color ${this.props.name}`}></div>
        <div className="penText">{this.props.name}</div>
      </div>
    )
  }
}

export default Pen;
