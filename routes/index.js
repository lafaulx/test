var express = require('express');
var React = require('react');
var router = express.Router();

require('babel/register');

var App = require('../src/js/organisms/App.jsx');
var AppAPI = require('../src/js/api/AppAPI');

router.get('/', function(req, res, next) {
  console.log(AppAPI);
  AppAPI.getStructure().then(function(structure) {
    var state = JSON.stringify(structure);
    var handlerFactory = React.createFactory(App);
    var html = React.renderToString(handlerFactory({
      structure: structure
    }));

    console.log(state);

    res.render('index', {
      html: html,
      state: state
    });
  });
});

module.exports = router;
