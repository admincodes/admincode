var express = require('express');

// 파일다운로드 시 필요
var formidable = require('formidable');
var util = require('util');
var router = express.Router();

var dbcon = require('./dbcon');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get('/session', function(req, res, next) {
    // res.send('respond with a resource');
    console.log('/session');
    next();
});
router.get('/login', function(req, res, next) {
    // res.send('respond with a resource');
    console.log('here');
    var session = req.session;
    session.userid ='korea';
    res.send('respond with a resource');
});

router.get('/session/test', function(req, res, next) {
    // res.send('respond with a resource');
    console.log('here');
    res.send('respond with a resource');
});
/**
 * html file을 반환한다.
 * 절대값을 반환한단다 어떻게 사용해야할지에대해서 고민을 해봐야겠다.
 */
router.get('/testhtml', function(req, res, next){
    res.sendFile('/Users/ddavid/WebstormProjects/expressNodejs/public/html/test.html');
});

/**
 * json 데이터를 반환한다.
 *
 */
router.get('/testJson', function(req, res, next){
    //nonExistFunctionCall();
    var otherArray = ["item1", "item2"];
    var otherObject = { item1: "item1val", item2: "item2val" };
    otherObject['list'] = otherArray;
    res.json(otherObject );
});

/**
 * json 데이터를 반환한다.
 * 테스트 url
 * http://localhost:3000/test/testParams?name=sanghwa&age=333
 */
router.get('/testParams', function(req, res, next){

    var jsonParam = {};
    jsonParam.name = req.query.name;
    jsonParam.age = req.query.age;

    res.json(jsonParam );
});

/**
 * restful API로 가져오는거
 */
router.get('/user/:id', function (req, res, next) {
    console.log('although this matches');
    res.json({id :  req.params.id});
    // next 이놈은 건너뛰는거.
    next();
});

/**
 * 두번째로 온다.
 */
router.get('/user/:id', function (req, res) {
    console.log('and this matches too');
    res.end();
});

/**
 * 딜레이 테스트 만약에 리턴을 안시켜주면 다른 페이지에서도 렉이 걸린다.
 * 왜냐하면 싱글톤으로 구성되어있기 때문
 */
router.get('/delay', function (req, res) {
    console.log('and this matches too');
    res.end();
});

/**
 * post로 받을때는 router. 뒤에 post라고 써줘야 하고 그리고
 * 파라미터들은 req.body 를 이용해서 사용한다
 */
router.post('/post', function (req, res) {

    console.log(req.body.hoho);
    console.log(req.body.se);
    console.log('postTest');
    console.log(req.query.hoho);
    res.end();
});

/**
 * 파일 업로드
 * file Upload
 */
router.post('/fileUpload', function (req, res) {

    var form = new formidable.IncomingForm();
    form.uploadDir = "/nodetemp";


    form.on('progress', function(bytesReceived, bytesExpected) {
        //console.log('progress');
    });
    form.on('field', function(name, value) {
        console.log('field');
    });
    form.on('fileBegin', function(name, file) {
        console.log('fileBegin');
    });
    form.on('file', function(name, file) {
        console.log('file');
    });
    form.on('end', function() {
        console.log('end');
    });
    form.parse(req, function(err, fields, files) {
        console.log('여긴 parse ');
        res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        console.log(files);
    });
});

/**
 * 데이터베이스 테스트
 */
router.get('/query', function (req, res) {

    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("select * from board", function (err, rows) {
           if (!err) {
                res.json(rows);
            }
        });

        connection.query("select * from board", function (err, rows) {
            connection.release();
            if (!err) {
                res.json(rows);
            }
        });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});





module.exports = router;