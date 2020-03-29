$(document).ready(function(){ 
	mainInit();
	
//	invokeRrequest( "/var/action/main/getMainPageInfo", function(data){
//		var src = data["backgroundImg"];
//		var slogan = data["slogan"];
//		$(".m-panel-bg").attr("src", src);
//		var strs= slogan.match(/\W/g);
//		console.log(strs);
//	},  {});
	var slogan = "每一个奇迹都源自一次开始";
	var strs= slogan.match(/\W/g);
	if(strs){
		var con = $(".m-panel-white-slogan");
		for(var i=0;i<strs.length;i++) {
			if(i%2==0)
				var div = $('<div class="m-panel-white-slogan-font fadeInUp animated delay-1s">'+strs[i]+'</div>');
			else
				var div = $('<div class="m-panel-white-slogan-font fadeInDown animated delay-1s">'+strs[i]+'</div>');
			con.append(div);
		}
		con.toggleClass("flipOutX animated delay-5s");
		$(".m-panel-count").toggleClass("flipInX animated delay-5half");
	}
	
	var fetchSceCount = setInterval(function(){
//		invokeRrequest( "/var/action/main/getPlatformSceCount", function(data){

//	},  {});
		var test = "12345";
		var strs= test.match(/\w/g);
		var con = $(".count-panels");
		con.children(".m-panel-count-num").remove();
		var flag = strs.length;
		for(var i=0;i<strs.length;i++) {
			var div = $('<div class="m-panel-count-num flipInY animated delay-'+(flag--)+'00ms">'+strs[i]+'</div>');
			con.append(div);
		}
	},7000);
});