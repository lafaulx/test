import React from 'react';

const Box = React.createClass({
  propTypes: {
    localIndex: React.PropTypes.number.isRequired,
    neighbours: React.PropTypes.array.isRequired
  },

  render() {
    let {
      'neighbours': neighbours,
      'localIndex': localIndex
    } = this.props;

    let id = neighbours[localIndex];
    let content = {
      left: null,
      right: null
    };

    if (neighbours.length > 1) {
      if (localIndex === 0) {
        content.right = neighbours[localIndex + 1];
      } else if (localIndex === neighbours.length - 1) {
        content.left = neighbours[localIndex - 1];
      } else {
        content.left = neighbours[localIndex - 1];
        content.right = neighbours[localIndex + 1];
      }
    }

    return (
      <div className='Box'>
        <div className='Box-header'>
          <strong className='Box-name'>{id}</strong>
          <a href='#' className='Box-closeButton'></a>
        </div>
        <div className='Box-content'>
          <span>{content.left}</span>
          <span>{content.right}</span>
        </div>
      </div>
    );
  }
});

export default Box;