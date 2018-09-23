function invokeRrequest(method, uri, entity, callback) {
	$.ajax({
        type: method,
        url: uri,
        data: JSON.stringify(entity),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
        	callback(data);
        }
    });
}

function invokeGet(uri, callback) {
	$.ajax({
        type: "GET",
        url: uri,
        success: function(data){
        	callback(data);
        }
    });
}