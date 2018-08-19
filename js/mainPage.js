$(document).ready(function(){     
	if (window.screen) {              
		var myw = screen.availWidth;   
		var myh = screen.availHeight;  
		window.moveTo(0, 0);           
		window.resizeTo(myw, myh);
    }
	/*
	$(window).resize(function() {
	    alert('pp');
	  });
	
	$(".m-page").css("height", $(window).height());
	*/
	
	$("#signin").on("mouseover",function(){
		this.style.cursor="pointer";
		img = $("#icon-guaniu01");
		if (img)
			img.addClass("m-title-sign-anim");
		
	});
	
	$("#signin").on("mouseout",function(){
		img = $("#icon-guaniu01");
		if (img)
			img.removeClass("m-title-sign-anim");
		
	});
});
