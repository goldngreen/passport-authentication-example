
		
function ajax(form, requestParams) {
    requestParams.timeout = 120000;
    $.ajax({
        method: 'post',
        url: form.action,
        complete: function(result, request) {
            console.log(result);
        },
        error: function(result, request) {
            console.log('Error calling ' + this.data.method);
        },
        data: requestParams
    });   	 							
}
