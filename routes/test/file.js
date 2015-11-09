var express = require('express');

// 파일다운로드 시 필요
var formidable = require('formidable');
var util = require('util');
var router = express.Router();

/* GET users listing. */
router.get('/:name', function(req, res, next) {


    res.send('respond with a resource');
});

module.exports = router;