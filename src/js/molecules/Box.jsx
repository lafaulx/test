import React from 'react';

const Box = React.createClass({
  propTypes: {
    localIndex: React.PropTypes.number.isRequired,
    neighbours: React.PropTypes.array.isRequired
  },

  render() {
    return (
      <div className='Box'>
        <div>
          {this.props.key}
        </div>
      </div>
    );
  }
});

export default Box;