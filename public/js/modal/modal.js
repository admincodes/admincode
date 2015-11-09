/**
 * Created by test1 on 2015-06-22.
 */
function open_modal(type){
    var content = '';
    if(type =='login'){
        content= 'login.html';
    }else if(type =='signin'){
        content= 'signin.html';
    }

    var templateAjax = executeGetHtml('/html/template/modal/'+ content );
    templateAjax.success(function(content){
        $('body').append(content).ready(function(){
            $('#'+type).modal('show');
        });
    });
}

function close_modal(type){
    if(type =='login'){
        $('#login').modal('hide');
        setTimeout(function(){
            $('#login').remove();
        }, 1000);
    }else if(type =='signin'){
        $('#signin').modal('hide');
        setTimeout(function(){
            $('#signin').remove();
        }, 1000);
    }
}