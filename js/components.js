var Corpus = (function ($) {
	
	var pub = {
		expand: function(event){
			
		},
		load: function(scenarioId, data){
			if(data) {
				
			}
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Ranklist = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Subscribe = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Timeseries = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		}
    	
    } 
    return pub;    
})(window.jQuery);

var Banner = (function ($) {
	
	var pub = {
		load: function(scenarioId, data){
			if(data) {
				
			}
		}
    	
    } 
    return pub;    
})(window.jQuery);

var DrawComponent = (function ($) {
	
	var pub = {
		drawRanklist: function (scenario) {
			//draw
        	
        	//load
        	setTimeout( Ranklist.load(scenario["scenarioId"]), 500 );
        },
        drawSubscribe: function (scenario) {
        	//draw
        	
        	//load
        	setTimeout( Subscribe.load(scenario["scenarioId"]), 500 );
        },
        drawTimeseries: function (scenario) {
        	//draw
        	
        	//load
        	setTimeout( Timeseries.load(scenario["scenarioId"]), 500 );
        },
        drawBanner: function (scenario) {
        	//draw
        	
        	//load
        	setTimeout( Banner.load(scenario["scenarioId"]), 500 );
        },
        drawCorpus: function (scenario) {
        	//draw
        	
        	//load
        	setTimeout( Corpus.load(scenario["scenarioId"]), 500 );
        }
    	
    } 
    return pub;    
})(window.jQuery);

var PopulateTemplate = (function ($) {
	
	var pub = {
		populate: function (template) {
            var scenarios = template["scenarios"];
            for(var i=0;i<scenarios.length;i++) {
            	var scenario = scenarios[i];
            	switch(scenario["scenarioType"]){
            	case 1:
            		DrawComponent.drawBanner(scenario);
            		break;
            	case 2:
            		DrawComponent.drawSubscribe(scenario);
            		break;
            	case 3:
            		DrawComponent.drawRanklist(scenario);
            		break;
            	case 4:
            		DrawComponent.drawTimeseries(scenario);
            		break;
            	case 5:
            		DrawComponent.drawCorpus(scenario);
            		break;
            	default:
            		break;
            	}
            }
        }
    	
    } 
    return pub;    
})(window.jQuery);

$(document).ready(function(){ 
	mainInit();
	//get parameter: template_id
	var tid = $.getUrlParam('tid');
	if( !StringUtil.isEmpty() ){
	//invoke api getting template
		var params={};
		params["templateID"] = tid;
		var callback = function(data){
			var template = data["template"];
			//starts drawing
			PopulateTemplate.populate(template);
			//ends drawing
		};
		//request("post", "/datacenter/", data, callback);
	
	}
});