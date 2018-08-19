import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Row from './row';
import { connect } from 'react-redux';
import { draw } from './../../actions/grid';

class Grid extends Component {
  getWidth() {
    return this.props.state.grid[0].length;
  }
  getHeight() {
    return this.props.state.grid.length;
  }
  getMouseX(e) {
    const left = ReactDOM.findDOMNode(this).offsetLeft;
    // don't allow any number greater than the width-1
    return Math.min(Math.floor((e.clientX - left) / 20), this.getWidth() - 1);
  }
  getMouseY(e) {
    const top = ReactDOM.findDOMNode(this).offsetTop;
    // don't allow any number greater than the height-1
    return Math.min(Math.floor((e.clientY - top) / 20), this.getHeight() - 1);
  }
  mouseMove(e) {
    if (e.buttons === 1) {
      draw(this.getMouseX(e), this.getMouseY(e), this.props.state.pen);
    }
  }
  onClick(e) {
    draw(this.getMouseX(e), this.getMouseY(e), this.props.state.pen);
  }
  shouldComponentUpdate(next) {
    return next.state.grid.toString() !== this.props.state.grid.toString();
  }
  render() {
    return (
      <div
        onMouseMove={this.mouseMove.bind(this)}
        onClick={this.onClick.bind(this)}
        className="grid">{
          this.props.state.grid.map((row, i) => {
            return (<Row data={row} key={i}/>);
          })
      }</div>
    )
  }
}

export default connect(state => ({ state }))(Grid);
