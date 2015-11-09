var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/html', function(req, res, next){
    res.sendfile('public/test.html');

});

module.exports = router;
