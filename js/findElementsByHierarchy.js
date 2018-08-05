function findElementsByXPath(xpath) {
	var evaluator = new XPathEvaluator();
	var result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var xnodes = [];
	var xres;
	while (xres = result.iterateNext()) {
		xnodes.push(xres);
	}
	return xnodes;
}

function findElementsByHierarchy(xpath) {
	var re = /\[\d\]$/;
	var itemhastail = xpath.match(re);
	if(itemhastail) {
		console.log("xpath item has tail : " + itemhastail);
		xpath = xpath.replace(re,"");
	}
	console.log(xpath);
	var pathlevels = xpath.split("/");
	var tail = Array();
	var component = {};
	
	for(var i=pathlevels.length-1;i>=0;i--) {
		var level = pathlevels[i];
		var ma = level.match(re);
		if (ma) {
			//console.log(ma[0]);
			//console.log(tail);
			var parentary = pathlevels.slice(0, i);
			var withoutma = level.replace(re,"");
			var xpath = parentary.join("/")+"/"+withoutma;
			//console.log("current iterator's xpath: " + xpath);
			var xnodes = findElementsByXPath(xpath);
			
			//console.log("find current iterator's count: " + xnodes.length);
			var itercount=0;
			for( var p=0; p<xnodes.length; p++ ) {
				xnode = xnodes[p];
				var tailary = tail.join("/");
				var detectxpath = xpath + "["+(p+1)+"]" + "/" + tailary;
				//console.log("test one of iterator's child: " + detectxpath);
				var children = findElementsByXPath(detectxpath);
				if( children && children.length > 0  ) {
					itercount++;
					//console.log("find children: " + children.length);
				}

			}
			if( itercount>1 ) {
				var container_xpath=parentary.join("/");
				var iterator_xpath=withoutma;
				var item_xpath=tail.join("/");
				component["container"] = container_xpath;
				component["iterator"] = iterator_xpath;
				if(itemhastail) {
					component["item"] = item_xpath+itemhastail;
				} else {
					component["item"] = item_xpath;
				}
				return component;
				console.log(component);
				//console.log("Detected path: " + xpath);
				//console.log("Tail path: " + tail.join("/"));
				//return xpath;
			}
		} 
		tail.unshift(level);
		
	}
	return undefined;
//	var evaluator = new XPathEvaluator();
//	var result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
//	var xnodes = [];
//	var xres;
//	while (xres = result.iterateNext()) {
//		xnodes.push(xres);
//	}
//	console.log(xnodes);
}
                                            //*[@id="listTable1"]/tbody/tr[1]/td[2]
                                           //*[@id="listTable2"]/tbody/tr[1]/td[2]
											//*[@id="listTable3"]/tbody/tr[1]/td[2]
											//*[@id="listTable4"]/tbody/tr[1]/td[2]

                                           //*[@id="listTable1"]/tbody/tr[1]/td[1]
                                            //*[@id="cate_1226"]/ul/li[1]/h3/a
                                           //*[@id="body_adv"]/div[5]/div[1]/div[1]/div/div/div/div[3]/a[1]/img
											///html/body/div/div[5]/div[1]/div[5]/a[1]/img
///html/body/div[1]/div[1]/div[3]/div[2]/div[2]/div[2]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/div[1]
//*[@id="normalthread_5051503"]/tr/th/a
findElementsByHierarchy('//*[@id="normalthread_5051503"]/tr/th/a');
