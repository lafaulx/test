import React from 'react';

const Box = React.createClass({
  propTypes: {
    localIndex: React.PropTypes.number.isRequired,
    neighbours: React.PropTypes.array.isRequired,
    onMouseOver: React.PropTypes.func.isRequired,
    onMouseOut: React.PropTypes.func.isRequired
  },

  render() {
    let {
      'localIndex': localIndex,
      'neighbours': neighbours
    } = this.props;

    let {
      'name': name,
      'modifiers': modifiers
    } = neighbours[localIndex];

    let content = this.getContent();

    return (
      <div className={`Box ${this.getClassName(modifiers)}`}
            onMouseOver={this.props.onMouseOver}
            onMouseOut={this.props.onMouseOut}>
        <div className='Box-header'>
          <strong className='Box-name'>{name}</strong>
          <a href='#' className='Box-closeButton'></a>
        </div>
        <div className='Box-content'>
          <span>{content.left}</span>
          <span>{content.right}</span>
        </div>
      </div>
    );
  },

  getClassName(modifiers) {
    return modifiers.map(function(modifier) {
      return `Box--${modifier}`;
    }).join(' ');
  },

  getContent() {
    let {
      'localIndex': localIndex,
      'neighbours': neighbours
    } = this.props;
    let content = {
      left: null,
      right: null
    };

    if (neighbours.length > 1) {
      if (localIndex === 0) {
        content.right = neighbours[localIndex + 1].name;
      } else if (localIndex === neighbours.length - 1) {
        content.left = neighbours[localIndex - 1].name;
      } else {
        content.left = neighbours[localIndex - 1].name;
        content.right = neighbours[localIndex + 1].name;
      }
    }

    return content;
  }
});

export default Box;