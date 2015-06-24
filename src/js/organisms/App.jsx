'use strict';

import React from 'react';

let structure = [0, 1, 2, 3, 4, 5, 6, 7];
let boxes = [{
    name: 0
  }, {
    name: 1
  }, {
    name: 2
  }, {
    name: 3
  }, {
    name: 4
  }, {
    name: 5
  }, {
    name: 6
  }, {
    name: 7
  }
];

let rowTypesToBoxes = {
  1: 3,
  2: 2,
  3: 1
};

const App = React.createClass({
  render() {
    let rows = this.renderRows(structure);

    return (
      <div className='App'>
        <div className='Container2'>
          {rows}
        </div>
      </div>
    );
  },

  renderRows(structure) {
    let acc = this.formRow(structure, 1, []);

    return acc;
  },

  formRow(boxes, type, acc) {
    if (boxes.length > 0) {
      let nextType;

      acc.push(this.renderRow(boxes.slice(0, rowTypesToBoxes[type]), type));

      if (type === 3) {
        nextType = 1;
      } else {
        nextType = type + 1;
      }

      return this.formRow(boxes.slice(rowTypesToBoxes[type]), nextType, acc);
    } else {
      return acc;
    }
  },

  renderRow(boxes, type) {
    let renderedBoxes = [];

    for (let i = 0; i < boxes.length; i++) {
      renderedBoxes.push(this.renderBox(i, boxes));
    }

    return (
      <div className={`Row Row-${type}`}>
        {renderedBoxes}
      </div>
    );
  },

  renderBox(rowIndex, neighbours) {
    let id = neighbours[rowIndex];

    return (
      <div className='Box'>
        <div>
          {id}
        </div>
      </div>
    );
  }
});

export default App;