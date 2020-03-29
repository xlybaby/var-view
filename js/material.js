var _documentRoot;
var reciever = (function ($) {
	var methods = {};
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
		_data["selector"] = {}
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
			selector = $(".corpus-selector");
			_data["selector"]["rootXpath"] = $(".corpus-selector > .container-info").find("input[name='root-xpath']").val();
			_data["selector"]["rootLabel"] = $(".corpus-selector > .container-info").find("input[name='root-label']").val();
			_data["selector"]["rootLinkXpath"] = $(".corpus-selector > .container-info").find("input[name='link-xpath']").val();
			_data["selector"]["rootLinkLabel"] = $(".corpus-selector > .container-info").find("input[name='link-label']").val();
			
			var children = selector.find(".children-info").find(".child-node");
			_data["selector"]["children"] = [];
			for(var i=0;i<children.length;i++) {
				var child = {};
				child["xpath"] = children[i].find("input[name='root-xpath']").val();
				child["label"] = children[i].find("input[name='root-label']").val(child["label"]);
				child["linkXpath"] = children[i].find("input[name='link-xpath']").val();
				child["linkLabel"] = children[i].find("input[name='link-label']").val();
				_data["selector"]["children"].append(child);
			}
		} 
		var detailC = $(".uc-edit-comp-con .item-basic-info");
		_data["addr"] = detailC.find("#website-addr-input").val();
		_data["name"] = detailC.find("#material-name-input").val();
		_data["keywords"] = detailC.find("#material-keywords-input").val();
		_data["categories"] = _documentRoot.category.getSelectedItems();
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
		
	this.ini = function() {
		this.category = new $.multiOptionSelector($("#material-category-input"));
		this.typeSel = new $.varRadioBox({"target":$("#material-type-selector")});
		this.browserContent = new $.varRadioBox({"target":$("#material-browser-article-content")});
		this.bannerNeedLink = new $.varCheckBox({"target":$(".material-banner-need-link")});
		this.subscribeNeedLink = new $.varCheckBox({"target":$(".material-subscribe-need-link")});
		this.timeSeriesXAxis = new $.varCheckBox({"target":$(".material-ts-time-xaxis")});
			
		$("button[name='add-new-material-button']").click(function(e){
			addNew();
		});
		$("button[name='save-material-button']").click(function(e){
			save();
		});
		$("button[name='delete-material-button']").click(function(e){
			del();
		});
		
		$(".corpus-selector").find(".handle-info").find("button[name='add-new-child-btn']").click(function(event){
			var node = $(".corpus-selector").children('.container-info').clone(true);
			var con = $("<div class='child-node' style='width: 100%;display: flex;flex-direction: column;'></div>");
			con.append(node);
			$(".corpus-selector").find(".children-info").append(con);
		});
		
		$(".corpus-selector").find(".handle-info").find("button[name='delete-last-child-btn']").click(function(event){
			$(".corpus-selector").find(".children-info").find(".child-node:last").remove();
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
		
		$("#uc-material-search-keywords").keypress(function(e) {
			　　if (e.ctrlKey && e.which == 13)
						retrieve();
			});
		$("#uc-material-search-keywords").siblings("button").click(function(e) {
						retrieve();
			});
	}
};
})(window.jQuery);

$(document).ready(function(){ 
	mainInit();
	_documentRoot = new $.documentRoot();
	//root.ini();
});