'use strict';

import React from 'react';

import Row from '../molecules/Row'

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
    let acc = this.formRow(structure, 1, 0, []);

    return acc;
  },

  formRow(boxes, type, key, acc) {
    if (boxes.length > 0) {
      let nextType;

      acc.push(this.renderRow(boxes.slice(0, rowTypesToBoxes[type]), type, key));

      if (type === 3) {
        nextType = 1;
      } else {
        nextType = type + 1;
      }

      return this.formRow(boxes.slice(rowTypesToBoxes[type]), nextType, ++key, acc);
    } else {
      return acc;
    }
  },

  renderRow(boxes, type, key) {
    return (
      <Row type={type} boxes={boxes} key={key}/>
    );
  }
});

export default App;