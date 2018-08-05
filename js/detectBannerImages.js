function find(xpath, parent){
  var evaluator = new XPathEvaluator(); 
  var doc = document.documentElement;
  if(parent) doc = parent;
  var result = evaluator.evaluate(xpath, doc, null,XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var xnodes = [];
  var xres;
  while (xres = result.iterateNext()) {
    xnodes.push(xres);
  }
  return xnodes;
}

function getBannerImages(container, iter, item, attr) {
	var xnodes = find(container);
	var result=Array();
	if(xnodes) {
		for( var i=0; i< xnodes.length; i++ ) {
			var con = xnodes[i];
			try{
				var iters = find(".//"+iter, con);
				if( iters ) {
					for( var j=0; j< iters.length; j++ ) {
						var iterator = iters[j];
						try {
							var items = find(".//"+item, iterator);
							if( items ) {
								for(var k=0; k< items.length; k++ ) {
									var it=items[k];
									value=it.getAttribute(attr);
									if( !result.includes(value) )
										result.push(value);
								}
							}
						}catch(e){}
					}
				}
			}catch(e){}
		}
		
	}
	
	return result;
}

result = getBannerImages('/html/body/div/div[5]/div[1]','div','a[1]/img', 'src');//*[@id="body_adv"]/div[5]/div[1]/div[1]/div/div/div', 'div', 'a[1]/img', 'src'
console.log( result);