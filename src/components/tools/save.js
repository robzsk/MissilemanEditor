import React, { Component } from 'react';

class Save extends Component {
  onClick() {
    const textToCopy = this.refs.textToCopy;
    textToCopy.value = this.exportData();
    textToCopy.select();
    document.execCommand('copy');
  }

  flip(data) {
    return data.reduce((a, c) => {
      a.unshift(c);
      return a;
    }, []);
  }

  exportData() {
    const { data } = this.props;
    return `[${this.flip(data).reduce((a, c) => {
      return `${a}\n\t[${c.toString()}],`;
    }, '')}\n]`;
  }

  render() {
    return (
      <div className="saveBtn" onClick={this.onClick.bind(this)}>
      <textarea ref="textToCopy" className="textToCopy" defaultValue={this.exportData()}></textarea>
        COPY
      </div>
    )
  }
}

export default Save;
