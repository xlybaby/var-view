function getInternalClickPosition(event, obj) {
	//alert(event.pageX + "," + event.pageY);
	var x = event.pageX;
	var y = event.pageY;
	$.ajax({
        type: "POST",
        url: "template/locateone",
        data: JSON.stringify({"locateX": x, "locateY": y}),
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function(data){
                    console.log(data);
                 }
    });
}