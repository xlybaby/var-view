var SERVICE_LOCATION_PREFIX = {"datacenter":"http://localhost/datacenter", "platform":"http://localhost/platform"};
var _GLOBAL_TOKN;

function invokeRedirect( direct ) {
	var entity = {direct:direct};
	$.ajax({
		headers: {      
            Accept: "application/json; charset=utf-8",
            token: _GLOBAL_TOKN 
        },
        type: "POST",
        url: "/var/auth/redirect",
        data: JSON.stringify(entity),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data, status, xhr){
				        	_GLOBAL_TOKN = xhr.getResponseHeader("authorization");
				        	if(xhr.status == 301){
				        		var uri = xhr.getResponseHeader("uc-redirect-uri");
				        		window.location.href=uri;
				        	}
        }
    });
}

function invokeRrequest( uri, callback,  entity, method, contentType, dt ) {
	$.ajax({
		headers: {      
            Accept: mGetStringValue(contentType, "application/json; charset=utf-8"),
            token: _GLOBAL_TOKN 
        },
        type: mGetStringValue(method, "POST"),
        url: uri,
        data: StringUtil.isEmpty(entity)?"":JSON.stringify(entity),
        dataType: mGetStringValue(dt, "json"),
        contentType: mGetStringValue(contentType, "application/json; charset=utf-8"),
        success: function(data, status, xhr){
        	_GLOBAL_TOKN = xhr.getResponseHeader("authorization");
		        	var result = data["retData"];
		        	if(callback)	callback(result);
		        	var msg = data["retMsg"];
		        	if( !StringUtil.isEmpty(msg) ) {
		        		alert(msg);
		        		return;
		        	}
		        
        }
    });
}
