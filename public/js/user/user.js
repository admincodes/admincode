/**
 * Created by test1 on 2015-06-22.
 */
function login(){

    var user_email = $('#inputEmail').val();
    var password = $('#inputPassword').val();

    if(user_email == ''){
        alert('�̸����� �Է����ּ���');
        return ;
    }

    if(password == ""){
        alert('��й�ȣ�� �Է����ּ���');
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
            // �α��� ����
            changeLoginMode(true);
        }else if(content.code== 900){
            alert('���̵� �Ǵ� ��й�ȣ�� ���� �ʽ��ϴ�.');
        }
    });
}

// ȸ�� ����ϱ�

function register() {
    var inputEmailRe = $('#inputEmailRe').val();
    var inputNickNameRe = $('#inputNickNameRe').val();
    var inputPasswordRe = $('#inputPasswordRe').val();
    var inputPasswordConfirmRe = $('#inputPasswordConfirmRe').val();

    if (inputEmailRe == null || inputEmailRe == '') {
        alert('�̸����� �ۼ����ּ���');
        return;
    }

    if (inputNickNameRe == null || inputNickNameRe == '') {
        alert('�г����� �ۼ����ּ���');
        return;
    }

    if (inputPasswordRe == null || inputPasswordRe == '') {
        alert('��й�ȣ�� �ۼ����ּ���');
        return;
    }

    if (inputPasswordConfirmRe == null || inputPasswordConfirmRe == '') {
        alert('��й�ȣ�� Ȯ�� �ۼ����ּ���');
        return;
    }

    if (inputPasswordRe != inputPasswordConfirmRe) {
        alert('�н����尡 ��ġ ���� �ʽ��ϴ�.');
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
                alert('�̹� ������� �̸����Դϴ�.');
                return;
            }

            var ajax = executeGet('/users/create/user', params);
            ajax.success(function(content){
                if(content.code == 0){
                    // �α��� ����
                    alert('ȸ���� ���ԵǾ����ϴ�.');
                    $('#signin').modal('hide');

                    var params = {
                        'user_email' : inputEmailRe,
                        'password' : inputPasswordRe
                    }
                    var ajax = executeGet('/users/login', params);
                    ajax.success(function(content){
                        if(content.code == 0){
                            // �α��� ����
                            changeLoginMode(true);
                        }else if(content.code== 900){
                            alert('���̵� �Ǵ� ��й�ȣ�� ���� �ʽ��ϴ�.');
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

