/**
 * Created by test1 on 2015-05-26.
 */
var mainData = {
    type: 10
};


function getData(type, page){
    mainData.type = type;
    var params = {'type' : type,
                    'page' : page,
                    'limit' : 10}
    var ajax = executeGet('/boards/view/getBoardList', params);
    ajax.success(function(data) {
        if(data != null){
            var list = data.list;

            var contentAjax = executeGetHtml('/html/template/board/listcontent.html');
            contentAjax.success(function(content){
                var str = "";
                for(var i=0; i<list.length; i++){
                    Mustache.parse(content);   // optional, speeds up future uses
                    console.log(list[i]);
                    var rendered = Mustache.render(content, list[i]);
                    str+= rendered;
                    str = escape(str);
                }
                console.log(str);
                $('#s' + type).html(str);

                //  ����
                $('[data-toggle="tooltip"]').tooltip();
            });

            var pagingAjax = executeGetHtml('/html/template/paging/paging.html');
            pagingAjax.success(function(content){
                Paging.setCurrentPage(page);
                Paging.setTotalCnt(parseInt(data.totalCnt[0].totalCnt));
                console.log(Paging.getJsonData());

                var jsonData = Paging.getJsonData();
                for(var i=0; i<jsonData.paging.length; i++){
                    // action
                    jsonData.paging[i].action = "javascript:getData('"+ type+"',"+jsonData.paging[i].number+")";
                }
                // ���� action
                jsonData.prevAction = "javascript:getData('"+ type+"',"+Paging.getPrevPage()+")";
                // �ؽ�Ʈ action
                jsonData.nextAction = "javascript:getData('"+ type+"',"+Paging.getNextPage()+")";

                // ó�� action
                jsonData.firstAction = "javascript:getData('"+ type+"',1)";
                // ������ action
                jsonData.lastAction = "javascript:getData('"+ type+"',"+Paging.lastPage+")";
                jsonData.lastPage = Paging.lastPage;

                var str = "";
                Mustache.parse(content);   // optional, speeds up future uses
                //console.log(list[i]);
                var rendered = Mustache.render(content, jsonData);
                str+= rendered;



                $('#paging').html(str);
                console.log(str);
            });
        }
        console.log(data);
    });
}

/**
 * �� �󼼺��� ���� ������ ��������
 * @param board_seq
 */
function getMainContentData(board_seq){
    var params = {'board_seq' : board_seq}
    var ajax = executeGet('/boards/view/getBoardDetail', params);
    ajax.success(function(data) {
        if(data != null){
            console.log(data);
            var detail = data.detail;

            var contentAjax = executeGetHtml('/html/template/board/maincontent.html');
            contentAjax.success(function(content){
                var str = "";

                Mustache.parse(content);   // optional, speeds up future uses
                    //console.log(list[i]);
                var rendered = Mustache.render(content, detail);
                str+= rendered;
                // console.log(str);
                $('#mainContent').html(str);
            });
        }
        console.log(data);
    });
}

/**
 * �� ��� ����Ʈ ��������
 * @param board_seq
 */
function getBoardReplyList(board_seq){
    var params = {'board_seq' : board_seq}
    var ajax = executeGet('/boards/view/getBoardReplyList', params);
    ajax.success(function(data) {
        if(data != null){
            console.log(data);

            var contentAjax = executeGetHtml('/html/template/board/replylistcontent.html');
            contentAjax.success(function(content){
                var str = "";
                for(var i=0; i<data.length; i++){
                    Mustache.parse(content);   // optional, speeds up future uses
                    console.log(data[i]);
                    var rendered = Mustache.render(content, data[i]);
                    str+= rendered;
                    str = escape(str);
                }
                console.log(str);
                $('#topic_reply_list').html(str);
            });
        }
    });
}

function sendLike(type){

    var params ={'type': type, 'board_seq':getUrlParameter('board_seq')}
    var ajax = executeGet('/boards/session/insert/like', params);
    ajax.success(function(data) {
        if(data != null){
            console.log(data);
            if(data.code==500){
                alert('�̹� �����߽��ϴ�.');
            }else if(data.code ==0){
                var cnt = type=='10' ?  $('#like_cnt').text() : $('#hate_cnt').text();

                cnt = parseInt(cnt);
                cnt++;
                if(type == '10'){
                    $('#like_cnt').html(cnt);
                }else{
                    $('#hate_cnt').html(cnt);
                }
            }
        }
        console.log(data);
    });
}

function writeTopic(){

    var title = $('#question_title').val() ;
    var content = $('#twitter-footer').html() ;
    var type = $('#question_type').val() ;
    var tags = $('#question_tags').val() ;

    var params ={'type': type,
        'title' : title,
        'tags' : tags,
        'content' : content
    }
    var ajax = executeGet('/boards/session/insert/board', params);
    ajax.success(function(data) {
        if(data != null){
            console.log(data);
            if(data.code==0){
                alert('���� ��ϵǾ����ϴ�.');
            }else {
                alert('�۵���� �����ؽ��ϴ�');
            }
        }
        console.log(data);
    });
}

function writeReply(){

    var content = $('#topic_reply_area').val() ;
    var board_seq = getUrlParameter('board_seq');

    var params ={'content': content,
        'board_seq' : board_seq
    }
    var ajax = executeGet('/boards/session/insert/board/reply', params);
    ajax.success(function(data) {
        if(data != null){
            console.log(data);
            if(data.code==0){
                $("#topic_reply_area").val('');
                alert('����� ��ϵǾ����ϴ�.');
                $("#question-repl").collapse("hide");

            }else {
                alert('��۵���� �����ؽ��ϴ�');
            }
        }
        console.log(data);
    });
}

function escape(str){
    str  = replaceAll(str, "&lt;", '<');
    str  = replaceAll(str, "&gt;", '>');
    str  = replaceAll(str, "&#x2F;", '/');
    return str;
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

