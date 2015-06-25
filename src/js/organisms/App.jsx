'use strict';

import React from 'react';

import Row from '../molecules/Row';
import Stats from '../molecules/Stats';
import AppAPI from '../api/AppAPI';

let rowTypesToBoxes = {
  1: 3,
  2: 2,
  3: 1
};

let ActionMessages = {
  'DELETE': function(id) {
    return `Box ${id} is being deleted`;
  },
  'CREATE': function(id) {
    return `New box is being appended after ${id}`;
  }
}

const App = React.createClass({
  propTypes: {
    structure: React.PropTypes.array.isRequired
  },

  getInitialState() {
    let structure = this.props.structure || [];
    let totalCount = structure.length;

    return {
      boxHover: false,
      structure: structure,
      totalCount: totalCount,
      deletedCount: 0,
      actionInProgress: false,
      actionMessage: '',
      lightness: 5
    }
  },

  render() {
    let rows = this.renderRows(this.setBoxModifiers(this.formBoxGroups(this.state.structure.slice(0))));

    return (
      <div className='App'>
        <div className={`Container1 ${this.state.boxHover ? 'Container1--boxHover' : ''}`}>
          <div className={`Container2 Container2--lighten-${this.state.lightness} ${this.state.boxHover ? 'Container2--boxHover' : ''}`}>
            <div>
              {rows}
            </div>
            <div className={`Overlay ${this.state.actionInProgress ? 'Overlay--show' : ''}`}>
              <strong>{this.state.actionMessage}</strong>
            </div>
          </div>
        </div>
        <Stats totalCount={this.state.totalCount} deletedCount={this.state.deletedCount} />
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
      <Row type={type}
            boxes={boxes}
            key={key}
            onBoxMouseOver={this.handleBoxMouseOver}
            onBoxMouseOut={this.handleBoxMouseOut}
            onBoxDelete={this.handleBoxDelete}
            onBoxClick={this.handleBoxClick}/>
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
  },

  handleBoxMouseOver() {
    this.setState({
      boxHover: true
    });
  },

  handleBoxMouseOut() {
    this.setState({
      boxHover: false
    });
  },

  handleBoxDelete(event, id) {
    let self = this;
    let structureCopy = this.state.structure.slice(0);

    for (var i = 0; i < structureCopy.length; i++) {
      if (structureCopy[i].name === id) {
        structureCopy.splice(i, 1);

        this.setState({
          actionInProgress: true,
          actionMessage: ActionMessages.DELETE(id)
        });

        AppAPI.updateStructure(structureCopy).then(function() {
          let lightness = self.state.lightness;

          if (lightness < 10) {
            lightness++;
          }

          self.setState({
            structure: structureCopy,
            totalCount: structureCopy.length,
            deletedCount: ++self.state.deletedCount,
            lightness: lightness
          });

          setTimeout(function() {
            self.setState({
              actionInProgress: false
            });
          }, 1000);
        });

        break;
      }
    }
  },

  handleBoxClick(event, id) {
    let self = this;

    this.setState({
      actionInProgress: true,
      actionMessage: ActionMessages.CREATE(id)
    });

    AppAPI.createBox(id).then(function(structure) {
      let lightness = self.state.lightness;

      if (lightness > 0) {
        lightness--;
      }

      self.setState({
        structure: structure,
        totalCount: structure.length,
        lightness: lightness
      });

      setTimeout(function() {
        self.setState({
          actionInProgress: false
        });
      }, 1000);
    });
  }
});

export default App;