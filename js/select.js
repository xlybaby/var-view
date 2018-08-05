function select(val,p_name,p_tag,p_class,p_id){
  var elements=find(p_name,p_tag,p_class,p_id);
  if (elements){ 
    var node=elements.iterateNext(); 
    while(node){
      var opts=node.options;
      for(var i=0;i<opts.length;i++) {
        opts[i].value=val;
        opts[i].setAttribute("selected","selected");
        return;
      }
      node = elements.iterateNext();
    }
  } 
}