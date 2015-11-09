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
// �Խ���
setSqlMap("insertBoard", 'node_mymodules/sql/board/insert/insertBoard.txt'); // �۵��
setSqlMap("insertBoardReply", 'node_mymodules/sql/board/insert/insertBoardReply.txt'); // �۵��
setSqlMap("insertBoardTag", 'node_mymodules/sql/board/insert/insertBoardTag.txt'); // �۵��
setSqlMap("getBoardDetail", 'node_mymodules/sql/board/select/getBoardDetail.txt'); // �� �󼼺���
setSqlMap("getBoardList", 'node_mymodules/sql/board/select/getBoardList.txt'); // �� ����Ʈ ��������
setSqlMap("getBoardReplyList", 'node_mymodules/sql/board/select/getBoardReplyList.txt'); // �� ����Ʈ ��������
setSqlMap("getBoardListTotalCnt", 'node_mymodules/sql/board/select/getBoardListTotalCnt.txt'); // ����ü ī��Ʈ ��������

// ���ƿ�
setSqlMap("getLikeCnt", 'node_mymodules/sql/board/select/getLikeCnt.txt'); // �� ����Ʈ ��������
setSqlMap("insertLike", 'node_mymodules/sql/board/insert/insertLike.txt'); // �� ����Ʈ ��������
setSqlMap("updateBoardLike", 'node_mymodules/sql/board/update/updateBoardLike.txt'); // ���ƿ� ���

// �����
setSqlMap("createUser", 'node_mymodules/sql/user/insert/createUser.txt');
setSqlMap("selectUserByEmail", 'node_mymodules/sql/user/select/selectUserByEmail.txt');
setSqlMap("selectUserByEmailNPass", 'node_mymodules/sql/user/select/selectUserByEmailNPass.txt');

setSqlMap("updateUserPassword", 'node_mymodules/sql/user/update/updateUserPassword.txt'); // �н� ���� ����



module.exports = sqlMap;