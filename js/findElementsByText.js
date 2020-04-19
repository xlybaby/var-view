//var paths={};
var re = /\[\d+\]/g;
function findElementsByXPath(xpath,document) {
	var evaluator = new XPathEvaluator();
	var result = evaluator.evaluate(xpath, document.documentElement, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
	var xnodes = [];
	var xres;
	while (xres = result.iterateNext()) {
		xnodes.push(xres);
	}
	return xnodes;
}
function detectSameHierarchy(xpath,document) {
	xpathary = xpath.split('/');
	for(var i=xpathary.length;i>0;i--) {
		xp = xpathary.join('/');
		xnodes = findElementsByXPath(xp,document);
		console.log("find "+xnodes.length+" nodes in path: "+xp);
		xpathary.pop();
		if( xnodes.length > 3 ) 
			return xnodes;
	}
}
function getPathTo(element) {
    //if (element.id!=='')
        //return '[@id="'+element.id+'"]';
    if (element.tagName.toLowerCase()=="body")
        return "/html/"+element.tagName;

    var ix= 0;
    var siblings= element.parentNode.childNodes;
    for (var i= 0; i<siblings.length; i++) {
        var sibling= siblings[i];
        if (sibling===element)
            return getPathTo(element.parentNode)+'/'+element.tagName+'['+(ix+1)+']';
        if (sibling.nodeType===1 && sibling.tagName===element.tagName)
            ix++;
    }
}
function findElementsXPath(element) {
	if (element.nodeType !== 1)
		return null;
	var tag = element.tagName;
	if (tag.toLowerCase() == "body") 
		return "/html/body";
	var path = getPathTo(element);
	if (path)
		path = path.toLowerCase();
	if ( path.indexOf("/html/") == 0 )
		return path;
	else
		return "//*"+path;
}
function findElementsInFrame(pnode, text, nodes,paths){
	var childs=pnode.childNodes;
	var added=false;
	for(var i=0;i<childs.length;i++){
		if(childs[i].nodeType===3){
			if(childs[i].nodeValue.indexOf(text)>=0){
				
				var xpath=findElementsXPath(pnode);
				var abspath = xpath.replace(re,"");
				if (!paths[abspath]){
					paths[abspath]=Array();
				}
				paths[abspath].push(xpath);
				added=true;
				nodes.push({"node":pnode,"xpath":xpath,"abspath":abspath});
			}
		}else if(childs[i].nodeType===1&&childs[i].childNodes&&childs[i].nodeName.toLowerCase()!=="script"){
			findElementsInFrame(childs[i], text, nodes,paths);
		}
		
	}
}

function findElementsContainsSpecifiedTextInSingleDocument(currentDocument, location, text){
	var nodes=Array();
	var paths={};
	findElementsInFrame(currentDocument.body, text, nodes,paths);
	return {"nodes":nodes,"paths":paths};
}
function findElementsContainsSpecifiedTextInMultiDocuments(currentDocument, location, text){
	var nodes=Array();
	findElementsInFrame(currentDocument.body, text, nodes);
	if(nodes.length>0)
		return nodes;
	
	var frames=currentDocument.getElementsByTagName("iframe");
	for(var i=0;i<frames.length;i++){
		if(frames[i].contentDocument&&frames[i].contentDocument.body) {
			var ary=findElementsContainsSpecifiedText(frames[i].contentDocument, location, text);
			if(ary.length>0)
				return ary;
		}
	}
	
	return Array();
}

//finds=findElementsContainsSpecifiedTextInMultiDocuments(document, null, "年化收益率");
//console.log(paths);
//for(var i=0;i<finds.length;i++){
//	console.log(finds[i]);
//}
function findIterator(paths) {
	var keys=Object.keys(paths)
	for(var i=0;i<keys.length;i++){
		var key=keys[i];
		var ary=paths[key];
		if(ary && ary.length>=3){
			console.log("Find list: " + key);
			var count=Array();
			for(var j=0;j<2;j++){
				console.log("xpath: " + ary[j]);
				var nums = ary[j].match(re);
				console.log(nums);
				if(count.length==0){
					for(var k=0;k<nums.length;k++){
						var int=parseInt(nums[k].replace("[","").replace("]",""));
						console.log(int);
						count.push(int);
					}
					continue;
				}else{
					console.log(count);
					for(var k=0;k<nums.length;k++){
						console.log(nums[k]);
						var integer=parseInt(nums[k].replace("[","").replace("]",""));
						if(count[k]!=integer){
							console.log("Found diff index at "+k);
							break;
						}
					}
				}
			}
		}
	}
}
//findIterator();