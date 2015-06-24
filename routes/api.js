var express = require('express');
var router = express.Router();

router.get('/structure', function(req, res, next) {
  res.send([{
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
    }]);
});

module.exports = router;
