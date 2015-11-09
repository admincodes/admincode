/**
 * Created by test1 on 2015-05-26.
 */
/**
 * executeGetInfo
 *
 * params = {
 *			'search.pos' : searchValue.pos,
 *			'search.max' : searchValue.max
 *  };

 *
 * @param eagle_url
 * @param params
 */
function executeGet(eagle_url, params) {
    var ajax = $.ajax({
        type : "GET",
        url : eagle_url,
        data : params,
        dataType : "json",
        traditional : true
    }).success(function(data) {
        if(data.code==99){
            open_modal('login');
        }
    }).error(function() {
    }).complete(function() {
    });
    return ajax;
}

function executePost(eagle_url, params) {
    var ajax = $.ajax({
        type : "POST",
        url : eagle_url,
        data : params,
        dataType : "json",
        traditional : true
    }).success(function(data) {
        if(data.code==99){
            open_modal('login');
        }
    }).error(function() {
    }).complete(function() {
    });
    return ajax;
}

function executeGetHtml(eagle_url) {
    var ajax = $.ajax({
        type : "GET",
        url : eagle_url,
        dataType : "html"
    }).success(function(data) {
    }).error(function() {
    }).complete(function() {
    });
    return ajax;
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}