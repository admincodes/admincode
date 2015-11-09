/**
 * Created by test1 on 2015-06-22.
 */
function login(){

    var user_email = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    if(user_email == ''){
        alert('이메일을 입력해주세요');
        return ;
    }

    if(password == ""){
        alert('비밀번호를 입력해주세요');
        return;
    }

    // md5

    var params = {
        'user_email' : user_email,
        'password' : password
    }
    var ajax = executeGet('/users/login', params);
    ajax.success(function(content){
        if(content.code == 0){
            // 로그인 성공
            changeLoginMode(true);
        }else if(content.code== 900){
            alert('아이디 또는 비밀번호가 맞지 않습니다.');
        }
    });
}

// 회원 등록하기

function register() {
    var inputEmailRe = $('#inputEmailRe').val();
    var inputNickNameRe = $('#inputNickNameRe').val();
    var inputPasswordRe = $('#inputPasswordRe').val();
    var inputPasswordConfirmRe = $('#inputPasswordConfirmRe').val();

    if (inputEmailRe == null || inputEmailRe == '') {
        alert('이메일을 작성해주세요');
        return;
    }

    if (inputNickNameRe == null || inputNickNameRe == '') {
        alert('닉네임을 작성해주세요');
        return;
    }

    if (inputPasswordRe == null || inputPasswordRe == '') {
        alert('비밀번호를 작성해주세요');
        return;
    }

    if (inputPasswordConfirmRe == null || inputPasswordConfirmRe == '') {
        alert('비밀번호를 확인 작성해주세요');
        return;
    }

    if (inputPasswordRe != inputPasswordConfirmRe) {
        alert('패스워드가 일치 하지 않습니다.');
        return;
    }

    var params = {
        'user_name': inputNickNameRe,
        'user_email': inputEmailRe,
        'password': inputPasswordRe
    };

    var emailCheckAjax = executeGet('/users/check/user', params);
        emailCheckAjax.success(function(content) {
            if(content.exists =='Y'){
                alert('이미 사용중인 이메일입니다.');
                return;
            }

            var ajax = executeGet('/users/create/user', params);
            ajax.success(function(content){
                if(content.code == 0){
                    // 로그인 성공
                    alert('회원이 가입되었습니다.');
                    $('#signin').modal('hide');

                    var params = {
                        'user_email' : inputEmailRe,
                        'password' : inputPasswordRe
                    }
                    var ajax = executeGet('/users/login', params);
                    ajax.success(function(content){
                        if(content.code == 0){
                            // 로그인 성공
                            changeLoginMode(true);
                        }else if(content.code== 900){
                            alert('아이디 또는 비밀번호가 맞지 않습니다.');
                        }
                    });
                }
            });
         });
}

function logout(){
    var params = {};

    var ajax = executeGet('/users/logout', params);
    ajax.success(function(content){
        if(content.code == 0){
            changeLoginMode(false);
        }
    });
}

