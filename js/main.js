function changPointer(obj) {
	obj.style.cursor="pointer";
}

var _visibleWindowHeight = $(window).height(); //浏览器时下窗口可视区域高度
var _documentHeight = $(document).height(); //浏览器时下窗口文档的高度
var _bodyHeight = $(document.body).height();//浏览器时下窗口文档body的高度
var _bodyOuterHeight = $(document.body).outerHeight(true);//浏览器时下窗口文档body的总高度 包括border padding margin
var _visibleWindowWidth = $(window).width(); //浏览器时下窗口可视区域宽度
var _documentWidth = $(document).width();//浏览器时下窗口文档对于象宽度
var _bodyWidth = $(document.body).width();//浏览器时下窗口文档body的高度
var _bodyOuterWidth = $(document.body).outerWidth(true);//浏览器时下窗口文档body的总宽度 包括border padding margin
  
//var _visibleWindowHeight = $(document).scrollTop(); //获取滚动条到顶部的垂直高度
//var _visibleWindowHeight = $(document).scrollLeft(); //获取滚动条到左边的垂直宽度
