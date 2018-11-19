var SERVICE_LOCATION_PREFIX = {"datacenter":"http://localhost/datacenter", "platform":"http://localhost/platform"};

function invokeRrequest(method, contentType, dt, uri, entity, callback) {
	$.ajax({
        type: method,
        url: uri,
        data: JSON.stringify(entity),
        dataType: dt,
        contentType: contentType,
        success: function(data){
        	var msg = data["message"];
        	if( !StringUtil.isEmpty(msg) ) {
        		alert(msg);
        		return;
        	}
        	var result = data["data"];
        	callback(result);
        }
    });
}

function exchange(service, uri, entity, callback) {
	var url = SERVICE_LOCATION_PREFIX[service];
	if(uri.substr(0,'/'.length) !== '/')
		url += "/"+uri;
	else
		url += uri;
	console.log("exchange: " + url);
	invokeRrequest("POST", "application/json; charset=utf-8", "json", url, entity, callback);
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