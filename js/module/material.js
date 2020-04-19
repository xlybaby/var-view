var _documentRoot;
var reciever = (function ($) {
	var methods = {"fetchPage":"/pycloud/fetchPage"};
	var pub = {
			openPageView:function(page) {
				invokeRedirect(page);
			},
			exchange:function(uri, callback,body){
				invokeRrequest(methods[uri], callback,  body);
			}
    } 
    return pub;    
})(window.jQuery);

(function ($){
	$.varSameHieBox = function(args){
		var _box;
		var _curNodeId;
		this.submit = function(event) {
			//this.cancel(event);
			$(".overlay").hide();
			_box.hide();
		}
		this.populate = function(xnodes, nodeId) {
			this.show();
			if( _curNodeId == nodeId )
				return;
			
			_box.children(".content").empty();
			for(var i=0;i<xnodes.length;i++) {
				row = _box.children(".row-template").clone(true);
				node = $(xnodes[i]);
				row.find("span").text(node.text());
				row.removeClass("row-template");
				_box.children(".content").append(row);
			}
			_curNodeId = nodeId;
		}
		this.ini = function() {
			_box = $(".detect-same-hierarchy-result-box");
			_box.find("button[name='submit-ok']").click(this.submit);
			_box.find("button[name='submit-cancel']").click(this.cancel);
		};
		this.cancel = function(event) {
			$(".overlay").hide();
			_box.hide();
		}
		this.show = function() {
			_box.css("left", (($(window).width() - _box.width())/2)+"px");
			_box.css("top", (($(window).height() - _box.height())/2)+"px");
			 
			 $(".overlay").css("display","block");
			 _box.css("display","flex");
		};
	};
	
})(window.jQuery);


var _materials = [];
(function ($){
$.materialItemBlock = function(data){
	var _data = data;
	var template = '<div onmouseover="this.style.cursor=\'pointer\';" class="uc-input-block-table-row" materialId="">'+
								'	<div style="display: flex;  justify-content: center; align-items: center; width: 55px; white-space : nowrap;">'+
									'<img name="website-favicon-ico" src="" style="width:32px;height:32px"/>'+
									'</div>'+
									'<div style="display: flex; align-items: center;  justify-content: center; margin-left:5px; ">								'+								
									'	<span class="uc-text cn_material_label"><p class="material-description"></p></span>'+
									'</div>'+
								'</div>';
	var comp;
	var cid = data["categoryId"];
	
	var fill = function() {
		$(".uc-edit-components-selector").hide();
		var type = _data["type"];
		var selector;
		if(type==="timeseries") {
			selector = $(".timeseries-selector");
			selector.find("input[name='xaxis-xpath-input']").val(_data["xaxisXpath"]);
			selector.find("input[name='xaxis-label-input']").val(_data["xaxisLabel"]);
			selector.find("input[name='yaxis-label-input']").val(_data["yaxisLabel"]);
			selector.find("input[name='yaxis-xpath-input']").val(_data["yaxisXpath"]);
			_documentRoot.timeSeriesXAxis.update(_data["timeXAxis"]);
			
		} else if(type==="subscribe") {
			selector = $(".subscribe-selector");
			selector.find("input[name='item-xpath-input']").val(_data["itemXpath"]);
			selector.find("input[name='item-label-input']").val(_data["itemLabel"]);
			_documentRoot.subscribeNeedLink.update(_data["needLink"]);
			
		}  else if(type==="banner") {
			selector = $(".banner-selector");
			selector.find("input[name='img-xpath-input']").val(_data["imgXpath"]);
			selector.find("input[name='img-label-input']").val(_data["imgLabel"]);
			_documentRoot.bannerNeedLink.update(_data["needLink"]);
			
		}  else if(type==="browser") {
			selector = $(".browser-selector");
			selector.find("input[name='article-xpath-input']").val(_data["articleXpath"]);
			selector.find("input[name='article-label-input']").val(_data["articleLabel"]);
			selector.find("input[name='list-label-input']").val(_data["listLabel"]);
			selector.find("input[name='list-xpath-input']").val(_data["listXpath"]);
			_documentRoot.browserContent.update(_data["articleContent"]);
			
		}  else if(type==="corpus") {
			selector = $(".corpus-selector");
			selector.find(".children-info").find(".child-node").remove();
			$(".corpus-selector > .container-info").find("input[name='root-xpath']").val(_data["rootXpath"]);
			$(".corpus-selector > .container-info").find("input[name='root-label']").val(_data["rootLabel"]);
			$(".corpus-selector > .container-info").find("input[name='link-xpath']").val(_data["rootLinkXpath"]);
			$(".corpus-selector > .container-info").find("input[name='link-label']").val(_data["rootLinkLabel"]);
			
			var children = _data["children"];
			for(var i=0;i<children.length;i++) {
				selector.find(".handle-info").find("button[name='add-new-child-btn']").click();
				var childNode = selector.find(".children-info").find(".child-node:last");
				childNode.find("input[name='root-xpath']").val(children[i]["xpath"]);
				childNode.find("input[name='root-label']").val(children[i]["label"]);
				childNode.find("input[name='link-xpath']").val(children[i]["linkXpath"]);
				childNode.find("input[name='link-label']").val(children[i]["linkLabel"]);
			}
		} 
		var detailC = $(".uc-edit-comp-con .item-basic-info");
		detailC.find("#website-addr-input").val(_data["addr"]);
		detailC.find("#material-name-input").val(_data["name"]);
		detailC.find("#material-keywords-input").val(_data["keywords"]);
		_documentRoot.category.update(_data["categories"]);
		
		selector.css("display","flex");
	};
	
	this.append = function(parent){
		comp = $(templateM);
		comp.find("img[name='website-favicon-ico']").attr("src", _data["favicon"]);
		comp.find(".material-description").text(_data["description"]);
		comp.attr("materialId", _data["materialId"]);
		comp.click(function(event){
			//clear();
			$(this).siblings(".uc-input-block-table-row-highlight").toggleClass("uc-input-block-table-row-highlight uc-input-block-table-row");
			$(this).toggleClass("uc-input-block-table-row-highlight uc-input-block-table-row");
			fill();
		});
	}
	this.click = function() {
		comp.click();
	}
	this.del = function() {
		var con = $(".uc-component-datasource");
		con.find(".uc-input-block-table-row-highlight").remove();
		var detailC = $(".uc-edit-comp-con .item-basic-info");
		detailC.find("#website-addr-input").val("");
		detailC.find("#material-name-input").val("");
		detailC.find("#material-keywords-input").val("");
		detailC.find("#material-category-input").val("");
		$(".uc-edit-components-selector").hide();
	}
	this.save = function(){
		var type = _data["type"];
		_data["selectors"] = []
		var selector;
		if(type==="timeseries") {
			selector = $(".timeseries-selector");
			_data["selector"]["xaxisXpath"] = selector.find("input[name='xaxis-xpath-input']").val();
			_data["selector"]["xaxisLabel"] = selector.find("input[name='xaxis-label-input']").val();
			_data["selector"]["yaxisLabel"] = selector.find("input[name='yaxis-label-input']").val();
			_data["selector"]["yaxisXpath"] = selector.find("input[name='yaxis-xpath-input']").val();
			_data["selector"]["timeXAxis"] = _documentRoot.timeSeriesXAxis.isChecked();
			
		} else if(type==="subscribe") {
			selector = $(".subscribe-selector");
			_data["selector"]["itemXpath"] = selector.find("input[name='item-xpath-input']").val();
			_data["selector"]["itemLabel"] = selector.find("input[name='item-label-input']").val();
			_data["selector"]["needLink"] = _documentRoot.subscribeNeedLink.isChecked();
			
		}  else if(type==="banner") {
			selector = $(".banner-selector");
			_data["selector"]["imgXpath"]  = selector.find("input[name='img-xpath-input']").val();
			_data["selector"]["imgLabel"] = selector.find("input[name='img-label-input']").val();
			_data["selector"]["needLink"] = _documentRoot.bannerNeedLink.isChecked();
			
		}  else if(type==="browser") {
			selector = $(".browser-selector");
			_data["selector"]["articleXpath"] = selector.find("input[name='article-xpath-input']").val();
			_data["selector"]["articleLabel"] = selector.find("input[name='article-label-input']").val();
			_data["selector"]["listLabel"] = selector.find("input[name='list-label-input']").val();
			_data["selector"]["listXpath"] = selector.find("input[name='list-xpath-input']").val();
			_data["selector"]["articleContent"] = _documentRoot.browserContent.getSelectValue();
			
		}  else if(type==="corpus") {
		} 
		var detailC = $(".uc-edit-comp-con .item-basic-info");
		_data["addr"] = detailC.find("#website-addr-input").val();
		_data["meta"] = {}
		_data["meta"]["name"] = detailC.find("#material-name-input").val();
		_data["meta"]["keywords"] = detailC.find("#material-keywords-input").val();
		_data["meta"]["categories"] = _documentRoot.category.getSelectedItems();
		console.log(_data);
		reciever.exchange("/var/action/uc/saveUserMaterial",function(data){
			alert("保存成功！");
		},_data);
	}
	append();
	if(!cid) {
		cid = guid();
		comp.attr("materialId", cid);
	}
	_materials[cid] = this;
};

})(window.jQuery);

function collectCorpus() {
	var detailC = $(".uc-edit-comp-con .item-basic-info");
	_data={};
	_data["type"] = 9;
	selector = $(".corpus-selector");
	level=1;
	_data["level"] =level;
	_data["selectors"]=[];
	rootselector = {};
	rootselector["xpath"] = $(".corpus-selector > .container-info").find("input[name='root-xpath']").val();
	rootSubXpath = $(".corpus-selector > .container-info").find("input[name='root-sub-xpath']").val();
	rootPagiXpath = $(".corpus-selector > .container-info").find("input[name='root-pagination']").val();
	rootNeedExtract = $(".corpus-selector > .container-info").find(".root-need-extract").find(".checked.uc-float-icon-checked");
	if (!StringUtil.isEmpty(rootSubXpath)){
		rootsubsel = [];
		rootsubsel.append({"xpath":rootSubXpath});
		rootselector["subselectors"] = rootsubsel;
		if( rootNeedExtract.lenght>0 ) {
			rootsubsel[0]["extract"] = 1;
		}else
			rootsubsel[0]["extract"] = 0;
	}
	if (!StringUtil.isEmpty(rootPagiXpath)){
		rootpagisel ={};
		rootpagisel["xpath"]=rootPagiXpath;
		_data["pagination"] = {"selector":rootpagisel,"limit": 10,"interim": 1,"mode": "parallel"};
	}
	
	_data["selectors"].push(rootselector);
	
	var children = selector.find(".child-node");
	var curparent = _data;
	for(var i=0;i<children.length;i++) {
		level+=1;
		var child = {"selectors":[],"level":level};
		childsel = {}
		childsel["xpath"] = $(children[i]).find("input[name='link-xpath']").val();
		childsubxpath= $(children[i]).find("input[name='link-label']").val();
		childpagixpath= $(children[i]).find("input[name='link-pagination']").val();
		childNeedExtract = $(children[i]).find(".node-need-extract").find(".checked.uc-float-icon-checked");

		if( !StringUtil.isEmpty(childsubxpath) ) {
			childsubsel = [];
			childsubsel.push({"xpath":childsubxpath});
			childsel["subselectors"] = childsubsel;
			if(childNeedExtract.length>0){
				childsubsel[0]["extract"]=1;
			}else
				childsubsel[0]["extract"]=0;
		}
		if (!StringUtil.isEmpty(childpagixpath)){
			childpagisel ={};
			childpagisel["xpath"]=childpagixpath;
			child["pagination"] = {"selector":childpagisel,"limit": 10,"interim": 1,"mode": "parallel"};
		}
		child["selectors"].push(childsel);
		curparent["child"] = child;
		curparent = child;
	}
	_data["addr"] = detailC.find("#website-addr-input").val();
	_data["meta"] = {}
	_data["meta"]["name"] = detailC.find("#material-name-input").val();
	_data["meta"]["keywords"] = detailC.find("#material-keywords-input").val();
	//_data["meta"]["categories"] = _documentRoot.category.getSelectedItems();
	console.log(JSON.stringify(_data));
}
(function ($){
	$.documentRoot = function(args){
		var num = 20;
		var addNew = function() {
			var con = $(".uc-component-datasource");
			var type = _documentRoot.typeSel.getSelectValue();
			var r = new $.materialItemBlock({favicon:"",description:"",type:type});
			con.append(r);
			r.click();
		};
		var save = function() {
			var con = $(".uc-component-datasource");
			var mid = con.find(".uc-input-block-table-row-highlight").attr("categoryId");
			if(_materials[mid])
				_materials[mid].save();
			
		};
		var del = function() {
			var mId = con.find(".uc-input-block-table-row-highlight").attr("materialId");

			if( !StringUtil.isEmpty(mId) && confirm("确定要删除这个素材吗？")) {
				reciever.exchange("/var/action/uc/delUserMaterial",function(data){
					_materials[mId].del();
				},{materialId:mId});
			} else {
				_materials[mId].del();
			}
		};
		var populate = function(data){
			var materials = data["items"];
			var con = $(".uc-component-datasource");
			con.find(".uc-input-block-table").find(".uc-input-block-table-row").remove();
			var detailC = $(".uc-edit-comp-con .item-basic-info");
			detailC.find("#website-addr-input").val("");
			detailC.find("#material-name-input").val("");
			detailC.find("#material-keywords-input").val("");
			detailC.find("#material-category-input").val("");
			$(".uc-edit-components-selector").hide();
			
			for(var i=0;i<materials.length;i++) {
				var r = new $.materialItemBlock(materials[i]);
				con.append(r);
			}
		};
		
		var retrieve = function(){
			var type;
			reciever.exchange("/var/action/uc/getUserMaterial",populate,{"type":type});
		};
		
		this.nodeAdjust = function(obj){
			console.log(obj);
			var action = $(obj).attr("name");
			var row = $(obj).parents(".material-page-search-node-row");
			
			if( action == "detectSameHierarchy" ) {
				xpath = row.find(".uc-text.abspath").text();
				console.log(xpath);
				//xnodes = findElementsByXPath('/html/body/div[2]/div[2]/div[3]/div[1]/div[1]/div/ul/li/h3/a');
				
				xnodes = detectSameHierarchy(xpath,window.frames[0].document);
				console.log(xnodes);
				this.varSameHieBox.populate(xnodes,row.attr("node-id"));
				//_varSameHieBox.show();
			} else if( action == "detectSubSelectors" ) {
				
			} else if( action == "deleteNode" ) {
				row.remove();
			}  else if( action == "cutxpathtail" ) {
				var xpath = row.find(".uc-text.xpath").text();
				var xpathIdx = xpath.lastIndexOf("/");
				if(xpathIdx>0){
					row.find(".uc-text.xpath").text(xpath.substring(0,xpathIdx));
				}
				var re = /\[\d+\]/g;
				var abspath = xpath.substring(0,xpathIdx).replace(re,"");
				row.find(".uc-text.abspath").text(abspath);
				
			}  else if( action == "restorexpathtail" ) {
				var xpath = row.find(".uc-text.xpath").text();
				var orignxpath = row.find("input[name='hidden-xpath']").val();
				if(xpath.length == orignxpath.length) return;
				var startIdx = xpath.length+1;
				var endIdx = orignxpath.indexOf('/', startIdx);
				if(endIdx>0){
					var subpath = orignxpath.substring(startIdx-1, endIdx);
				}else
					var subpath = orignxpath.substring(startIdx-1);
				
				var re = /\[\d+\]/g;
				var abspath = (xpath+subpath).replace(re,"");
				row.find(".uc-text.xpath").text(xpath+subpath);
				row.find(".uc-text.abspath").text(abspath);
			} 
		}
		
	this.ini = function() {
		//this.category = new $.multiOptionSelector($("#material-category-input"));
		this.typeSel = new $.varRadioBox({"target":$("#material-type-selector")});
		this.browserContent = new $.varRadioBox({"target":$("#material-browser-article-content")});
		this.bannerNeedLink = new $.varCheckBox({"target":$(".material-banner-need-link")});
		this.subscribeNeedLink = new $.varCheckBox({"target":$(".material-subscribe-need-link")});
		this.corpusCheckbox = new $.varCheckBox({"target":$(".corpus-selector .uc-check-box")});
		new $.varCheckBox({"target":$(".material-ts-time-xaxis")});
		
		this.varSameHieBox = new $.varSameHieBox();
		this.varSameHieBox.ini();
		
		$(".material-page-search-node-row.template").find("button").click(function(e){
			_documentRoot.nodeAdjust(this);
		});
		
		$("button[name='add-new-material-button']").click(function(e){
			addNew();
		});
		$("button[name='save-material-button']").click(function(e){
			collectCorpus()
			save();
		});
		$("button[name='delete-material-button']").click(function(e){
			del();
		});
		
		$(".corpus-selector").find(".addChildBtn").click(function(event){
			var container = $(".corpus-selector").children('.container-info');
			var template = $(".corpus-selector").find('.child-node-template').clone(true);
			template.toggleClass('child-node child-node-template');
			template.show();
			container.append(template);
		});
		
		$(".corpus-selector").find(".delChildNodeBtn").click(function(event){
			target = $(event.target);
			target.parents(".uc-edit-panel-block.child-node").remove();
		});
		
		$(".uc-edit-components-selector").find(".selector-edit-button").click(function(event){
			var target = $(event.target);
			var xpath = target.parents(".uc-input-block-table").find(".seaXPath");
			var label = target.parents(".uc-input-block-table").find(".seaLabel");
			var addr = $(".item-basic-info").find("#website-addr-input");
			$(".uc-edit-comp-r").find("#material-adjust-frame-addr").val(addr.val());
			$(".uc-edit-comp-r").find("#material-adjust-frame-xpath").val(xpath.val());
			$(".uc-edit-comp-r").find("#material-adjust-frame-label").val(label.val());
		});
		$("#material-adjust-frame-addr").keypress(function(e) {
				var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
			　　if (keyCode == 13)
						reciever.exchange("fetchPage",function(data){
							console.log(data);
							uri = data["src"]
							$(".uc-edit-comp-r-container").children("iframe").attr('src', '/downloads/static/'+uri);
							$(".uc-edit-comp-r-container").children("iframe").load(function()  
							{ 
								frame=$(this);
								console.log(frame.contents().find("div[name='cate_div']"));
							}); 
						},{"url":$(this).val()});
			});
		$("#material-adjust-frame-label").keypress(function(e) {
			　var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
			　　if (keyCode == 13) {
						
						result = findElementsContainsSpecifiedTextInSingleDocument(window.frames[0].document,null,$(this).val());
			　　	nodes = result["nodes"];
			　　	paths = result["paths"]
						if (nodes){
			　　		for(var i=0;i<nodes.length;i++) {
			　　			console.log(nodes[i]);
			　　			var row=$(".material-page-search-node-row.template").clone(true);
			　　			row.removeClass("template");
			　　			row.show();
			　　			row.find(".uc-text.labelname").text(nodes[i]["node"].tagName);
			　　			row.find(".uc-text.xpath").text(nodes[i]["xpath"]);
			　　			row.find(".uc-text.abspath").text(nodes[i]["abspath"]);
			　　			
			　　			row.find("input[name='hidden-labelname']").val(nodes[i]["node"].tagName);
			　　			row.find("input[name='hidden-xpath']").val(nodes[i]["xpath"]);
			　　			row.find("input[name='hidden-abspath']").val(nodes[i]["abspath"]);
			　　			
			　　			row.attr("node-id",digitalSign.hashCode(nodes[i]["abspath"]+'-'+i));
			　　			$(".material-page-search-node-row.template").parent(".uc-edit-comp-r-container").append(row);
			　　		}
			　　		//console.log(paths);
			　　		//findIterator(paths);
			　　	}
			　　		
					}
			});
		$("#uc-material-search-keywords").keypress(function(e) {
			　var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
			　　if (keyCode == 13)
						retrieve();
			});
		$("#uc-material-search-keywords").siblings("button").click(function(e) {
						retrieve();
			});
	}
};
})(window.jQuery);

_documentRoot = new $.documentRoot();
$(document).ready(function(){ 
	mainInit();
	_documentRoot.ini();
});