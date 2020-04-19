var digitalSign = (function ($) {
	var pub = {
			
			hashCode: function(str){
			    var hash = 0;
			    if (str.length == 0) return hash;
			    for (i = 0; i < str.length; i++) {
			        char = str.charCodeAt(i);
			        hash = ((hash<<5)-hash)+char;
			        hash = hash & hash; // Convert to 32bit integer
			    }
			    return hash;
			},
			djb2Code: function(str){
			    var hash = 5381;
			    for (i = 0; i < str.length; i++) {
			        char = str.charCodeAt(i);
			        hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
			    }
			    return hash;
			},
			sdbmCode: function(str){
			    var hash = 0;
			    for (i = 0; i < str.length; i++) {
			        char = str.charCodeAt(i);
			        hash = char + (hash << 6) + (hash << 16) - hash;
			    }
			    return hash;
			},
			loseCode: function(str){
			    var hash = 0;
			    for (i = 0; i < str.length; i++) {
			        char = str.charCodeAt(i);
			        hash += char;
			    }
			    return hash;
			}
    } 
    return pub;    
})(window.jQuery);