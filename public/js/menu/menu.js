/**
 * Created by test1 on 2015-06-22.
 */
function getTitle(){
    var contentAjax = executeGetHtml('/html/template/menu/titleMenu.html');
    contentAjax.success(function(content){

        $('#titmeMenu').append(content);
        var params ={};
        var ajax = executeGet('/users/check/userStatus', params);
        ajax.success(function(content){
            if(content.code == 0){
                // 로그인 성공
                if(content.isLogined =='Y'){
                    changeLoginMode(true);
                }else{
                    changeLoginMode(false);
                }
            }else{
                changeLoginMode(false);
            }
        });
    });
}

/**
 * 로그인 메뉴를 변경한다.
 * @param isLogin
 */
function changeLoginMode(isLogin){
    if(isLogin){
        try{
            $('#login').modal('hide');
        }catch(e){};

        $('#loginBar').hide();
        $('#regiBar').hide();
        $('#logoutBar').show();
    }else{
        $('#loginBar').show();
        $('#regiBar').show();
        $('#logoutBar').hide();
    }
}

getTitle();