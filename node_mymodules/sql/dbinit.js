/**
 * Created by test1 on 2015-05-25.
 */

var fs     =    require('fs');


var sqlMap = [];

function setSqlMap(name, filepath ){
    fs.readFile(filepath, function (err, data) {
        if (err) throw err;
        console.log( data.toString('utf8'));
        sqlMap[name]= data.toString('utf8');
    });
}
// 게시판
setSqlMap("insertBoard", 'node_mymodules/sql/board/insert/insertBoard.txt'); // 글등록
setSqlMap("insertBoardReply", 'node_mymodules/sql/board/insert/insertBoardReply.txt'); // 글등록
setSqlMap("insertBoardTag", 'node_mymodules/sql/board/insert/insertBoardTag.txt'); // 글등록
setSqlMap("getBoardDetail", 'node_mymodules/sql/board/select/getBoardDetail.txt'); // 글 상세보기
setSqlMap("getBoardList", 'node_mymodules/sql/board/select/getBoardList.txt'); // 글 리스트 가져오기
setSqlMap("getBoardReplyList", 'node_mymodules/sql/board/select/getBoardReplyList.txt'); // 글 리스트 가져오기
setSqlMap("getBoardListTotalCnt", 'node_mymodules/sql/board/select/getBoardListTotalCnt.txt'); // 글전체 카운트 가져오기

// 좋아요
setSqlMap("getLikeCnt", 'node_mymodules/sql/board/select/getLikeCnt.txt'); // 글 리스트 가져오기
setSqlMap("insertLike", 'node_mymodules/sql/board/insert/insertLike.txt'); // 글 리스트 가져오기
setSqlMap("updateBoardLike", 'node_mymodules/sql/board/update/updateBoardLike.txt'); // 좋아요 등록

// 사용자
setSqlMap("createUser", 'node_mymodules/sql/user/insert/createUser.txt');
setSqlMap("selectUserByEmail", 'node_mymodules/sql/user/select/selectUserByEmail.txt');
setSqlMap("selectUserByEmailNPass", 'node_mymodules/sql/user/select/selectUserByEmailNPass.txt');

setSqlMap("updateUserPassword", 'node_mymodules/sql/user/update/updateUserPassword.txt'); // 패스 워드 변경



module.exports = sqlMap;