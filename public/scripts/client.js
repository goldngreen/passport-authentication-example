	
function ajax(url, requestParams) {
    requestParams.timeout = 120000;
    $.ajax({
        method: 'post',
        url: url,
        complete: function(result, request) {
            window.location.replace("/");
        },
        error: function(result, request) {
        },
        data: requestParams
    });   	 							
}


$(document).ready(function() {
    console.log( "Ready!" );
    try {
        if (window.self !== window.top) {
            alert("Running in iFrame. This application will not work in an iFrame. Please go to full screen mode.");
        };
    } catch (e) {
        return true;
    }

    $("#ajax-login").click(function() {
        ajax('/ajaxlogin', { username: $('#username').val(), password: $('#password').val() });
    });
});
