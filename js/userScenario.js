var reciever = (function ($) {
	var pub = {
			openPageView:function(page) {
				invokeRedirect(page);
			},
			brokeFavorite:function(callback,body){
				invokeRrequest( "/var/action/find/brokeF", callback,  body);
			},
			updateCategory:function(callback,body){
				invokeRrequest( "/var/action/find/updateUserCategory", callback,  body);
			},
			deleteUserCategory: function(cid, callback){
				var body={categoryId:cid};
				invokeRrequest( "/var/action/find/getUserCategories", callback,  body);
			},
		fetchUserCategories: function(callback){
			var body={parent:null};
			//invokeRrequest( "/var/action/find/getUserCategories", callback,  body);
			var data={"items":[{"categoryId":"astg4gasdrgfds","label":"新闻"},
        		{"categoryId":"astg4gasdrgfds","label":"理财"},
        		{"categoryId":"astg4gasdrgfds","label":"时尚"}]};
        	callback(data);
		},
        fetchFavoriteScenarios: function (keywords, type, category, num,callback) {
            try{
            	var body={keywords:keywords,type:type,category:category,num:num};
             //invokeRrequest( "/var/action/find/getUserFavorite", callback,  body);
            	
            	//for test only:
            	var data={"items":[{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"},
            		{"type":"template","itemId":"astg4gasdrgfds","src":"/var/images/mainbg/vintage-typewriter-qhd-2048x1152.jpg","author":"Andy笑笑"}]};
            	callback(data);
            }catch(e){
	            	console.log(e);
	            	return false;
            }
            return true;
        },
        fetchUserScenarios: function (keywords, type, category, num, callback) {
            try{
            		var body={keywords:keywords,type:type,category:category,num:num};
                //invokeRrequest( "/var/action/find/getUserProject", callback,  body);
            		var data={"items":[{"type":"material","itemId":"astg4gasdrgfds","src":"/var/images/favicon.ico","description":"本站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新本站内容。"},
                		{"type":"material","itemId":"astg4gasdrgfds","src":"/var/images/favicon.ico","description":"本站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新本站内容。"},
                		{"type":"material","itemId":"astg4gasdrgfds","src":"/var/images/favicon.ico","description":"本站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新本站内容。"},
                		{"type":"material","itemId":"astg4gasdrgfds","src":"/var/images/favicon.ico","description":"本站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新本站内容。"},
                		{"type":"material","itemId":"astg4gasdrgfds","src":"/var/images/favicon.ico","description":"本站致力于推广各种编程语言技术，所有资源是完全免费的，并且会根据当前互联网的变化实时更新本站内容。"},
                		]};
            		callback(data);
            }catch(e){
	            	console.log(e);
	            	return false;
            }
            return true;
        }
    } 
    return pub;    
})(window.jQuery);

(function ($){
$.myItemBlock = function(data){
	var _data = data;
	var template = '<div class="view-col-wide-my">'+
								'<div class="view-col-img">'+
								'	<img src="" style="width: 100%;" />'+
								'</div>'+
								'<div class="view-col-txt">'+
								'		<div class="view-col-txt-left">'+
								'		<svg class="uc-float-icon edit-item" style=" font-size: 1em; font-weight: 400;color: #c83c23;" aria-hidden="true">		'+		    				
								'			<use xlink:href="#icon-shoudong"></use>'+
								'		</svg>'+
								'	</div>'+
								'	<div class="view-col-txt-right">'+
								'		<span class="view-col-label"></span>'+
								'	</div>'+
									
								'</div>'+
								'<div class="view-col-mask"></div>'+
								'</div>';
	var templateM = '<div class="view-col-wide-my">'+
									'<div class="view-col-img">'+
									'	<div style="width: 100%; height: auto;">'+
											'<img src="" style="width:32px;height:32px;float:left;"/>'+
											'	<span class="uc-text cn_material_label"><p></p></span>'+
											'</div>'+
									'</div>'+
									'<div class="view-col-txt">'+
									'		<div class="view-col-txt-left">'+
									'		<svg class="uc-float-icon edit-item" style=" font-size: 1em; font-weight: 400;color: #c83c23;" aria-hidden="true">		'+		    				
									'			<use xlink:href="#icon-shoudong"></use>'+
									'		</svg>'+
									'	</div>'+
									'	<div class="view-col-txt-right">'+
									'		<span class="view-col-label"></span>'+
									'	</div>'+
										
									'</div>'+
									'<div class="view-col-mask"></div>'+
									'</div>';
	var comp;
	
	var edit = function(){
		if(_data["type"] === "template")
			reciever.openPageView("/var/view/uc/pageLayout?itemid="+_data["itemId"]);
		else if(_data["type"] === "material")
			reciever.openPageView("/var/view/uc/sourceEstablish?itemid="+_data["itemId"]);
	};
	this.append = function(parent){
		if(_data["type"] == "template") {
			comp = $(template);
			comp.find(".view-col-img").children("img").attr("src", _data["src"]);
			comp.find(".view-col-img").click(function(event){
				event.stopPropagation();
				reciever.openPageView("/var/view/singleton/pageView?itemid="+_data["itemId"]);
			});
		} else if(_data["type"] == "material") {
			comp = $(templateM);
			comp.find(".view-col-img").children("img").attr("src", _data["favicon"]);
			comp.find(".view-col-img").children("p").text(_data["description"]);
		} 
		
		comp.find(".edit-item").click(function(event){
			event.stopPropagation();
			edit();
		});
		comp.find(".edit-item").on({
			mouseover:function(event){
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		parent.append(comp);
	}
	
};

})(window.jQuery);

(function ($){
$.favoriteItemBlock = function(data){
	var _data = data;
	var template = '<div class="view-col-wide">'+
								'<div class="view-col-img">'+
								'	<img src="" style="width: 100%;" />'+
								'</div>'+
								'<div class="view-col-txt">'+
								'		<div class="view-col-txt-left">'+
								'		<svg class="uc-float-icon broke-favorite" style=" font-size: 1em; font-weight: 400;color: #c83c23;" aria-hidden="true">		'+		    				
								'			<use xlink:href="#icon-xinsui"></use>'+
								'		</svg>'+
								'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">		'+		    				
								'			<use xlink:href="#icon-tuijian1"></use>'+
								'		</svg>'+
								'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">	'+			    				
								'			<use xlink:href="#icon-jubao3"></use>'+
								'		</svg>'+
								'	</div>'+
								'	<div class="view-col-txt-right">'+
								'		<span class="view-col-label">By&nbsp;</span>'+
								'		<span class="view-col-label author"></span>'+
								'	</div>'+
									
								'</div>'+
								'<div class="view-col-mask"></div>'+
								'</div>';
	var templateM = '<div class="view-col-wide">'+
									'<div class="view-col-img">'+
									'	<div style="width: 100%; height: auto;">'+
									'<img src="" style="width:32px;height:32px;float:left;"/>'+
									'	<span class="uc-text cn_material_label"><p></p></span>'+
									'</div>'+
									'</div>'+
									'<div class="view-col-txt">'+
									'		<div class="view-col-txt-left">'+
									'		<svg class="uc-float-icon broke-favorite" style=" font-size: 1em; font-weight: 400;color: #c83c23;" aria-hidden="true">		'+		    				
									'			<use xlink:href="#icon-xinsui"></use>'+
									'		</svg>'+
									'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">		'+		    				
									'			<use xlink:href="#icon-tuijian1"></use>'+
									'		</svg>'+
									'		<svg class="uc-float-icon" style=" font-size: 1.17em; font-weight: 400;color: #efefef;" aria-hidden="true">	'+			    				
									'			<use xlink:href="#icon-jubao3"></use>'+
									'		</svg>'+
									'	</div>'+
									'	<div class="view-col-txt-right">'+
									'		<span class="view-col-label">By&nbsp;</span>'+
									'		<span class="view-col-label author"></span>'+
									'	</div>'+
										
									'</div>'+
									'<div class="view-col-mask"></div>'+
									'</div>';
	var comp;
	
	var brokeF = function(){
		var body={};
		body["itemId"] = _data["itemId"];
		reciever.brokeFavorite(function(data){
			comp.remove();
		},body);
		
		
	};
	this.append = function(parent){
		if(_data["type"] == "template") {
			comp = $(template);
			comp.find(".view-col-img").children("img").attr("src", _data["src"]);
			comp.find(".view-col-img").click(function(event){
				event.stopPropagation();
				reciever.openPageView("/var/view/singleton/pageView?itemid="+_data["itemId"]);
			});
		} else if(_data["type"] == "material") {
			comp = $(templateM);
			comp.find(".view-col-img").children("img").attr("src", _data["favicon"]);
			comp.find(".view-col-img").children("p").text(_data["description"]);
			comp.find(".view-col-img").click(function(event){
				event.stopPropagation();
				reciever.openPageView("/var/view/singleton/materialView?itemid="+_data["itemId"]);
			});
		} 
		
		comp.find(".view-col-label.author").text(data["author"]);
		comp.find(".broke-favorite").click(function(event){
			event.stopPropagation();
			brokeF();
		});
		comp.find(".broke-favorite").on({
			mouseover:function(event){
				event.stopPropagation();
				event.target.style.cursor="pointer";
			}
		});
		
		parent.append(comp);
	}
	
};

})(window.jQuery);

(function ($){
	$.documentRoot = function(args){
		var num = 20;
		
		var populate = function(data){
			var type = data["type"];
			var items = data["items"];
			if(type == "favorite"){
				var container = $(".uc-edit-components-favorite");
				var row = container.children(".view-row:last");
				var re = row.children(".view-col-wide").length;
				for(var i=0;i<items.length;i++) {
					if(re%5==0){
						row = $("<div class='view-row'></div>");
						container.append(row);
					}
					var item = new $.favoriteItemBlock(items[i]);
					row.append(item);
					re++;
				}
			}else if(type == "myProject"){
				var container = $(".uc-edit-comp-con-items");
				var row = container.children(".view-row:last");
				var re = row.children(".view-col-wide-my").length;
				for(var i=0;i<items.length;i++) {
					if(re%4==0){
						row = $("<div class='view-row'></div>");
						container.append(row);
					}
					var item = new $.myItemBlock(items[i]);
					row.append(item);
					re++;
				}
			}
			
			
		};
		var appendC = function(item){
			var newC = $('<div class="uc-input-block-table-row" >'+
					'<div class="user-items-category-nosel category-lable" category="">'+
					'	<span class="uc-text cn_category_label"></span>'+
					'	<div style="display: flex; align-items: center; margin-left:5px; white-space : nowrap;">'+
					'			<svg  class="uc-float-icon editor" style="font-size: 0.87em; font-weight: 400;color: #333;" aria-hidden="true">		'+		    				
					'				<use xlink:href="#icon-bianji"></use>'+
					'			</svg>&nbsp;&nbsp;&nbsp;'+
					'			<svg  class="uc-float-icon delete" style="font-size: 0.87em; font-weight: 400;color: #333;" aria-hidden="true">	'+			    				
					'				<use xlink:href="#icon-lajitong3"></use>'+
					'			</svg>'+
					'	</div>'+
					
					'</div>'+
					'<div class="user-items-category-sel" style="display: none;">'+
					'	<input type="text" class="input-category-editor" value="" style="width: 100%;outline:none;" />'+
					'</div>'+
				'</div>');
			newC.find(".user-items-category-sel.category-lable").attr("category", item["categoryId"]);
			newC.find(".user-items-category-sel.category-lable").children(".cn_category_label").text(item["label"]);
			newC.find(".user-items-category-sel > input[type='text']").attr("value", item["label"]);
			newC.find(".user-items-category-sel.category-lable").find(".editor").click(function(event){
				var target=$(event.target);
				target.parents(".user-items-category-sel").siblings(".user-items-category-sel").css("display","flex");
				target.parents(".user-items-category-sel").hide();
			});
			newC.find(".user-items-category-sel.category-lable").find(".delete").click(function(event){
				var target=$(event.target);
				var cid = target.parents(".user-items-category-sel").attr("category");
				reciever.deleteUserCategory(cid,function(data){
					var flag = data["delete"];
					if(flag == 1)
						target.parents(".uc-input-block-table-row").remove();
				});
			});
			newC.find(".user-items-category-sel > input[type='text']").keypress(function(e) {
		　　if (e.ctrlKey && e.which == 13){
					var target=$(e.target);
					target.parents(".user-items-category-sel").siblings(".user-items-category-sel").css("display","flex");
					target.parents(".user-items-category-sel").hide();
					var body={"categoryName":target.val(),"categoryId":newC.find(".user-items-category-sel.category-lable").attr("category")};
					reciever.updateCategory(function(data){
						target.parents(".user-items-category-sel").siblings(".user-items-category-sel").children(".cn_category_label").text(target.val());
					},body);
					}
		　　});
			
			$("#user-items-category").find(".uc-input-block-table").append(newC);
			return newC;
		};
		var populateC = function(data){
			var items = data["items"];
			for(var i =0;i<items.length;i++){
				appendC(items[i]);
			}
		};
		var retrieveC = function(){
			reciever.fetchUserCategories(populateC);
		};
		var retrieve = function(){
			var keywords = $("#uc-material-search-keywords").val();
			if(StringUtil.isEmpty(keywords)) keywords="";
			var category = $("#user-items-category").find(".user-items-category-sel.category-lable").attr("category");
			var template = $(".page-tab-box").find(".page-tab").attr("template");
			var type=this.seaFilterType.getSelectValue();
			if(template==="favorite") {
				reciever.fetchFavoriteScenarios(keywords,type,category,num,populate);
			} else if(template==="myProject") {
				reciever.fetchUserScenarios(keywords,type,category,num,populate);
			}
		};
		
	this.ini = function() {
		this.seaFilterType = new $.varRadioBox({"target":$("#user-items-filter-type"), "callback":null});
		$("#user-items-search-box input[type='text']").keypress(function(e) {
			　　if (e.ctrlKey && e.which == 13)
						retrieve();
			});
		$("#user-items-search-box button").click(function(e) {
						retrieve();
			});
		
		$(".page-tab-box button").click(function(event) {
			　event.stopPropagation();
				if( $(this).parents(".page-tab").length>0 ) return;
				//console.log(this);
				$(this).parents(".page-tab-box").children(".page-tab,.page-tab-hide").toggleClass("page-tab page-tab-hide");
				$(this).parents(".page-tab-box").find(".box-link-label,.box-link-label-hide").toggleClass("box-link-label box-link-label-hide");
				$(".uc-edit-components-favorite,.uc-edit-components-user").toggleClass("element-display-flex element-hide");
		});
		$("#user-items-category").find("button[name='addCategory']").click(function(e) {
			var item = appendC();
			item.find(".user-items-category-sel.category-lable").find(".editor").click();
			});
		//retrieveC();
		//retrieve();
	}
	};
})(window.jQuery);


$(document).ready(function(){ 
	mainInit();
	var root = new $.documentRoot();
	root.ini();
});