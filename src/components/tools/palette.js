import React, { Component } from 'react';
import { connect } from 'react-redux';
import Size from './size';
import Pen from './pen';
import Save from './save';
import PENS from './../../pens';

class Palette extends Component {
  getWidth() {
    return this.props.state.grid[0].length;
  }
  getHeight() {
    return this.props.state.grid.length;
  }
  render() {
    const pens = Object.keys(PENS);
    return (<div className="paletteDock">
    <Size tag={'W'} name={'width'} value={this.getWidth()}/>
    <Size tag={'H'} name={'height'} value={this.getHeight()}/>
    {
      pens.map((p, i) => (<Pen key={i} name={p.toLowerCase()} number={PENS[p]} selected={PENS[p] === this.props.state.pen.color} />))
    }
    <Save data={this.props.state.grid}/>
    </div>)
  }
}

export default connect(state => ({ state }))(Palette);
