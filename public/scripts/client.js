
		
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
