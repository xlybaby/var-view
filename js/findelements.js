function find(p_name,p_tag,p_class,p_id){
  if( !p_name && !p_tag && !p_class && !p_id ) 
    return null;
  var xpath="//";
  var express="";
  if(p_tag)
  	xpath+=p_tag;
  else
  	xpath+="*";
  
  if(p_id)
  	express+="contains(@id, '"+p_id+"')";

  if(p_name){
  	if(express.length>0)
      express+=" and ";
    express+="contains(@name, '"+p_name+"')";
  }
  if(p_class){
  	if(express.length>0)
      express+=" and ";
    express+="contains(@class, '"+p_class+"')";
  }

  if(express.length>0)
  	express="["+express+"]";

  xpath+=express;
  var evaluator = new XPathEvaluator(); 
  var result = evaluator.evaluate(xpath, document.documentElement, null,XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
  var xnodes = [];
  var xres;
  while (xres = result.iterateNext()) {
    xnodes.push(xres);
  }
  var x = 0;
    var y = 0;
    var current = xnodes[0]
    while(current)
    {
        x += current.offsetLeft;
        y += current.offsetTop;
        current = current.offsetParent
    }
console.log("absx: "+x);
  console.log("absy: "+y);

  rect = xnodes[0].getBoundingClientRect();
  console.log("width: "+rect["width"]);
  console.log("height: "+rect["height"]);
  console.log("x: "+rect["x"]);
  console.log("y: "+rect["y"]);

  console.log("offsetTop: "+xnodes[0].offsetTop);
  console.log("offsetLeft: "+xnodes[0].offsetLeft);


  return result;
}