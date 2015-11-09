var express = require('express');
var parameterCheck = require('../../node_mymodules/constants/parameter');
var dbcon = require('../test/dbcon');
var sqlMap = require('../../node_mymodules/sql/dbinit');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/html', function(req, res, next){
    res.sendfile('public/test.html');

});
router.get('/create/user', function(req, res, next) {
    // req.query.type;
    parameterCheck.checkJson(req, res, 'user_name');
    parameterCheck.checkJson(req, res, 'user_email');
    parameterCheck.checkJson(req, res, 'password');


    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var query =
            sqlMap['createUser'];

        query = query.replace("#user_name#", req.query['user_name']);
        query = query.replace("#user_email#", req.query['user_email']);
        query = query.replace("#password#", req.query['password']);
        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                // connection.release();

                console.log(2);
                console.log(rows);
                if (!err) {
                    res.json({"code" : 0});
                    console.log('complete');
                }

                connection.release();
            });

        // totalC]nt

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});

router.get('/check/user', function(req, res, next){
    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var query =
            sqlMap['selectUserByEmail'];

        query = query.replace("#user_email#", req.query['user_email']);
        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                // connection.release();
                if (!err) {
                    console.log(rows[0]);
                    var result = {"code" : 0};
                    if(parseInt(rows[0].cnt) > 0  ){
                        result.exists = 'Y';
                    }else{
                        result.exists = 'N';
                    }
                    res.json(result);

                    connection.release();
                }
            });

        // totalC]nt

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});

router.get('/login', function(req, res, next) {
    // res.send('respond with a resource');
    // req.query.type;
    parameterCheck.checkJson(req, res, 'user_email');
    parameterCheck.checkJson(req, res, 'password');

    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query =
            sqlMap['selectUserByEmailNPass'];

        query = query.replace("#user_email#", req.query['user_email']);
        query = query.replace("#password#", req.query['password']);
        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                // connection.release();

                if (!err) {
                    if(rows == null || rows.length ==0){
                        res.json({"code" : 900});
                    }else{

                        var session = req.session;
                        session.user_email =req.query['user_email'];
                        session.user_seq = rows[0].USER_SEQ;
                        res.json({"code" : 0});
                    }

                    connection.release();
                }
            });

        // totalC]nt

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});

router.get('/check/userStatus', function(req, res, next) {
    if(typeof req.session.user_email != 'undefined'
        && req.session.user_email != null
        && req.session.user_email != '' ){
        res.json({"code" : 0, isLogined :'Y'});
    }else{
        res.json({"code" : 0, isLogined :'N'});
    }
});

router.get('/logout', function(req, res, next) {
    req.session.destroy();
    res.json({"code" : 0});
});

router.get('/session/update/userPassword', function(req, res, next) {

    parameterCheck.checkJson(req, res, 'password');

    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query =
            sqlMap['updateUserPassword'];

        query = query.replace("#user_seq#", req.session.user_seq);
        query = query.replace("#password#", req.query['password']);
        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                // connection.release();

                if (!err) {
                    if(rows == null || rows.length ==0){
                        res.json({"code" : 900});
                    }else{

                        var session = req.session;
                        session.user_email =req.query['user_email'];
                        session.user_seq = rows[0].USER_SEQ;
                        res.json({"code" : 0});
                    }

                    connection.release();
                }
            });

        // totalC]nt

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});

module.exports = router;
