	
function ajax(url, requestParams) {
    requestParams.timeout = 120000;
    $.ajax({
        method: 'post',
        url: url,
        complete: function(result, request) {
            alert(result.responseText);
            console.log(result.responseText);
            window.location.replace("/");
        },
        error: function(result, request) {
            console.log('Error calling ' + this.data.method);
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
});
