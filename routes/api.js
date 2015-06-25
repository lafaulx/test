var express = require('express');
var router = express.Router();

var structure = [0, 1, 2, 3, 4, 5, 6, 7];

var boxes = [{
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
  }];

var mergeBoxesIntoStructure = function() {
  return structure.map(function(id) {
    return boxes.filter(function(box) {
      return box.name === id
    })[0];
  });
}

router.get('/structure', function(req, res) {
  res.send(mergeBoxesIntoStructure());
});

router.put('/structure', function(req, res) {
  structure = req.body.structure.map(function(box) {
    return box.name;
  });

  res.sendStatus(200);
});

router.post('/structure/box', function(req, res) {
  var existingId = req.body.id;
  var newBoxId = boxes.length;
  var newBox = {
    name: newBoxId
  };

  boxes.push(newBox);

  for (var i = 0; i < structure.length; i++) {
    if (existingId === structure[i]) {
      structure.splice(i + 1, 0, newBoxId);
      res.send(mergeBoxesIntoStructure());

      break;
    }
  }
});

module.exports = router;
