
		
function ajax(url, requestParams) {
    requestParams.timeout = 120000;
    $.ajax({
        method: 'get',
        url: url,
        complete: function(result, request) {
            console.log(result);
            window.location.replace("/");
        },
        error: function(result, request) {
            console.log('Error calling ' + this.data.method);
        },
        data: requestParams
    });   	 							
}
