var express = require('express');
var router = express.Router();
var parameterCheck = require('../../node_mymodules/constants/parameter');
var dbcon = require('../test/dbcon');
var sqlMap = require('../../node_mymodules/sql/dbinit');

/* GET users listing. */
router.get('/', function(req, res, next) {
 // res.send('respond with a resource');
    next();
});
router.get('/testParams', function(req, res, next){

    var jsonParam = {};
    jsonParam.name = req.query.name;
    jsonParam.age = req.query.age;

    res.json(jsonParam );
});

router.get('/view/getBoardList', function(req, res, next){
    // req.query.type;
    parameterCheck.checkJson(req,res,  'type');
    parameterCheck.checkJson(req,res,  'page');
    parameterCheck.checkJson(req,res,  'limit');


    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var query =
            sqlMap['getBoardList'];

        query= query.replace("#pos#", (parseInt(req.query['page'])-1) * parseInt(req.query['limit']) );
        query= query.replace("#limit#", req.query['limit'] );
        query= query.replace("#type#", req.query['type'] );
        console.log(query);

        var list = {list:'', totalCnt:0};

        // 컨텐츠 가져오기
        console.log(1);
        connection.query(
            query
            , function (err, rows) {
            // connection.release();
                list.list = rows;
                console.log(2);
            if (!err) {
                //res.json(list);

            }
        });

        // totalC]nt
        query =
            sqlMap['getBoardListTotalCnt'];

        query= query.replace("#type#", req.query['type'] );
        console.log(3);
        connection.query(
            query
            , function (err, rows) {
                connection.release();
                list.totalCnt = rows;
                if (!err) {
                    res.json(list);
                }
            });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });

});

router.get('/view/getBoardDetail', function(req, res, next){
    // req.query.type;
    parameterCheck.checkJson(req,res,  'board_seq');


    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query =
            sqlMap['getBoardDetail'];

        query= query.replace("#board_seq#", req.query['board_seq'] );
        console.log(query);


        var result = {code : 0};
        // 컨텐츠 가져오기
        console.log(1);
        connection.query(
            query
            , function (err, rows) {
                connection.release();
                console.log(rows);
                result.detail = rows[0];
                if (!err) {
                    res.json(result);

                }
            });

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });

});

router.get('/view/getBoardReplyList', function(req, res, next){
    // req.query.type;
    parameterCheck.checkJson(req,res,  'board_seq');


    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }
        var query =
            sqlMap['getBoardReplyList'];

        query= query.replace("#board_seq#", req.query['board_seq'] );
        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                connection.release();
                console.log(rows);
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

router.get('/session/insert/board/reply', function(req, res, next) {
    // req.query.type
    parameterCheck.checkJson(req, res, 'content');
    parameterCheck.checkJson(req, res, 'board_seq');

    dbcon.getConnection(function (err, connection) {
        if (err) {
            console.log('err');
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query =
            sqlMap['insertBoardReply'];

        // 일단 user_seq를 두번 변경 해야하기때문에.. replace 를 두번해줌
        query = query.replace("#user_seq#", req.session.user_seq);
        query = query.replace("#user_seq#", req.session.user_seq);
        query = query.replace("#content#", req.query['content']);
        query = query.replace("#board_seq#", req.query['board_seq']);
        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                // connection.release();
                console.log(rows);
                if (!err) {
                    res.json({"code" : 0});
                }else{
                    res.json({"code" : 701});
                }

                connection.release();
            });

        // totalC]nt

        connection.on('error', function (err) {
            console.log('err');

            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});

router.get('/session/insert/board', function(req, res, next) {
    // req.query.type
    parameterCheck.checkJson(req, res, 'title');
    parameterCheck.checkJson(req, res, 'content');
    parameterCheck.checkJson(req, res, 'type');

    dbcon.getConnection(function (err, connection) {
        if (err) {
            console.log('err');
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query =
            sqlMap['insertBoard'];

        query = query.replace("#user_seq#", req.session.user_seq);
        query = query.replace("#title#", req.query['title']);
        query = query.replace("#tags#", req.query.tags);
        query = query.replace("#content#", req.query['content']);
        query = query.replace("#type#", req.query['type']);

        var tags = req.query['tags'];
        console.log('################');
        console.log('tags : ' + req.query['tags']);

        query = query.replace("#tags#", req.query.tags);

        console.log(query);

        connection.query(
            query
            , function (err, rows) {
                // connection.release();

                console.log(rows);

                // update
                var tags = req.query['tags'];
                console.log(tags);
                var tagArr =tags.split(',');

                console.log('tagArr : '+ tagArr);
                var queryArr = [];
                for(var i=0; i<tagArr.length; i++){
                    query =
                        sqlMap['insertBoardTag'];
                    query = query.replace("#tag#",tagArr[i]);
                    var queueQ = query.replace("#tb_board_seq#",rows.insertId);
                    queryArr[i] =  queueQ;
                    console.log(queueQ);
                }

               if (!err) {
                    queueInsert(queryArr, connection, res);
                }
            });

        // totalC]nt

        connection.on('error', function (err) {
            console.log('err');

            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        });
    });
});

function queueInsert(query, connection, res){
    console.log("queueInsert");
    console.log(query);
    if(query.length> 0){
        connection.query(
            query[0]
            , function (err, rows) {
                if (!err) {
                    console.log('query : ' + query);
                    query.shift();
                    console.log(query.length);
                   queueInsert(query, connection, res);
                }else{
                    res.json({"code" : 0});
                    connection.release();
                }
            });
    }else{
        res.json({"code" : 0});
        console.log('complete');
        connection.release();
    }
}

router.get('/session/insert/like', function(req, res, next) {
    // req.query.type
    parameterCheck.checkJson(req, res, 'type');
    parameterCheck.checkJson(req, res, 'board_seq');

    dbcon.getConnection(function (err, connection) {
        if (err) {
            connection.release();
            res.json({"code": 100, "status": "Error in connection database"});
            return;
        }

        var query =
            sqlMap['getLikeCnt'];

        query = query.replace("#user_seq#", req.session.user_seq);
        query = query.replace("#board_seq#", req.query['board_seq']);
        query = query.replace("#type#", req.query['type']);

        console.log(query);

        connection.query(
            query
            , function (err, rows) {


                console.log(2);
                console.log(rows);
                if (!err) {
                    if(rows[0].cnt > 0){
                        connection.release();
                        res.json({"code" : 500});
                    }else{

                        query =
                            sqlMap['insertLike'];

                        query = query.replace("#user_seq#", req.session.user_seq);
                        query = query.replace("#board_seq#", req.query['board_seq']);
                        query = query.replace("#type#", req.query['type']);

                        connection.query(
                            query
                            , function (err, rows) {

                                query =
                                    sqlMap['updateBoardLike'];

                                query = query.replace("#board_seq#", req.query['board_seq']);
                                query = query.replace("#type#", req.query['type'] == '10' ? 'LIKE_CNT' : 'HATE_CNT');
                                query = query.replace("#type#", req.query['type'] == '10' ? 'LIKE_CNT' : 'HATE_CNT');
                                console.log(query);
                                connection.query(
                                    query
                                    , function (err, rows) {
                                        res.json({"code" : 0});
                                        connection.release();
                                    });
                            });
                    }

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
