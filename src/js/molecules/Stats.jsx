import React from 'react';

const Row = React.createClass({
  propTypes: {
    totalCount: React.PropTypes.number.isRequired,
    deletedCount: React.PropTypes.number.isRequired
  },

  render() {
    return (
      <ul className='Stats'>
        <li>
          {"Total boxes count: "}
          <strong>{this.props.totalCount}</strong>
        </li>
        <li>
          {"Deleted boxes count: "}
          <strong>{this.props.deletedCount}</strong>
        </li>
      </ul>
    );
  }
});

export default Row;