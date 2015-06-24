'use strict';

import React from 'react';

import Row from '../molecules/Row'

let rowTypesToBoxes = {
  1: 3,
  2: 2,
  3: 1
};

const App = React.createClass({
  propTypes: {
    structure: React.PropTypes.array.isRequired
  },

  render() {
    let rows = this.renderRows(this.setBoxModifiers(this.formBoxGroups(this.props.structure)));

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
  },

  formBoxGroups(boxes) {
    let groupedBoxes = [];

    while (boxes.length > 0) {
      groupedBoxes.push(boxes.splice(0, 4));
    }

    return groupedBoxes;
  },

  setBoxModifiers(boxGroups) {
    let flattenBoxes = [];

    for (let i = 0; i < boxGroups.length; i++) {
      let group = boxGroups[i];

      flattenBoxes = flattenBoxes.concat(group.map(function(box, j) {
        let num = j + 1;

        box.modifiers = [];

        if (num % 2 === 0) {
          box.modifiers.push('bg-2');
        }

        if (num % 3 === 0) {
          box.modifiers.push('bg-3');
        }

        if (num % 4 === 0) {
          box.modifiers.push('bg-4');
        }

        if (i === boxGroups.length - 1 && num === group.length) {
          box.modifiers.push('last');
        }

        return box;
      }));
    }

    return flattenBoxes;
  }
});

export default App;