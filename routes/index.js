var express = require('express');
var React = require('react');
var router = express.Router();

require('babel/register');

var App = require('../src/js/organisms/App.jsx');

router.get('/', function(req, res, next) {
  var handlerFactory = React.createFactory(App);
  var html = React.renderToString(handlerFactory());

  res.render('index', {
    html: html
  });
});

module.exports = router;
