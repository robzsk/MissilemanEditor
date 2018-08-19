import React, { Component } from 'react';
import { increase, decrease } from './../../actions/grid';

class Size extends Component {
  increase(e) {
    increase(this.props.name);
  }
  decrease(e) {
    decrease(this.props.name);
  }
  render() {
    return (
      <div className="adjpen">
        <div className="size">{this.props.tag}</div>
        <div className="adjcontrols">
          <div onClick={this.increase.bind(this)} className="adjuster">+</div>
          <div onClick={this.decrease.bind(this)} className="adjuster">-</div>
        </div>
        <div className="adjText">{this.props.value}</div>
      </div>
    )
  }
}

export default Size;
