function drawCorpusComp() {
	var root = $(".demo_bg");
	
}

$(document).ready(function(){ 
	mainInit();
	$('.bxslider').bxSlider({
	    mode: 'fade',
	    captions: true,
	    slideWidth: 450
	  });
	
	$('.corpus_item').on({
		click: function(event){
			var item = $(event.target);
			var expand = item.attr("expand");
			if( expand === "cascade" ) {
				var level = item.attr("level");
				//retrieves children items
				//TODO
				
			}
		},
		mouseover:function(event){
			event.target.style.cursor="pointer"; 
		}
	});
});