'use strict';

require('../less/index');

import React from 'react';
import App from './organisms/App';

var state = {};

if (typeof window !== 'undefined' && window.state) {
  state = window.state;
}

React.render(<App structure={state}/>, document.getElementById('app'));