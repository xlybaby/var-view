var singleReview = (function ($) {
	var putLayout = function (typeName, layout) {
		var position = layout["position"];
		var container = $(".page-main-div");
		if(container) {
			box=$("."+typeName).clone(true);
			var id = typeName+"_"+guid();
			box.attr('id',id);
			
			box.css('display','flex');
			box.css('width',position["width"]+"%");
			box.css('height',position["height"]+"%");
			box.css('top',position["y"]+"%");
			box.css('left',position["x"]+"%");
			box.css('position',"absolute");
			
			container.append(box);
		}
	};
	
    var pub = {
        review: function (scenarios) {
            try{
            	for(var i=0;i<scenarios.length;i++) {
            		var scenario=scenarios[i];
            		var typeName = scenario["scenarioTypeName"];
            		var layout=scenario["layout"];
            		putLayout(typeName, layout);
            	}
            }catch(e){
            	console.log(e);
            	return false;
            }
            return true;
        }
    	
    } 
    return pub;    
})(window.jQuery);

$(document).ready(function(){ 
	mainInit();
	
	var scenarios = [{"scenarioTypeName":"box_block","layout":{"position":{ "width": 40.05, "height": 24.96, "x": 52.45, "y": 40.39}}},
					{"scenarioTypeName":"box_block","layout":{"position":{ "width": 40.05, "height": 24.96, "x": 9.63, "y": 12.71}}},
					{"scenarioTypeName":"box_block","layout":{"position":{ "width": 40.05, "height": 24.96, "x": 9.28, "y": 65.96}}}];
	singleReview.review(scenarios);
});