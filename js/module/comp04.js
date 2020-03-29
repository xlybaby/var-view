(function($){
	$.varLineCompBox = function(args){
		var scenario_div = args["box"];

		this.getCSStyle = function(css){
			return scenario_div.css(css);
		};
		var _option = {
			    grid: {
			        //show:true,
			        //width:'80%'
//			    		width: '100%',
//			    		height:'100%',
//			    		left:'0',
//			    		right:'0',
//			    		top:'0',
//			    		bottom:'0'
			    },
			    xAxis: {
			        show:true,
			        //name:"时间",
			        nameTextStyle:{
			            color: "#000000"
			        },
			        axisLine:{
			            show:true,
			            lineStyle:{
			                color: "#000000"
			            }
			        },
			        axisTick:{
			            show:true
			        },
			        axisLabel: {
			            show:true,
			            //rotate: -45
			        },
			        type: 'time',
			        boundaryGap: false,
			        //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
			        splitLine: {
			            show:false
			        }
			    },
			    yAxis: {
			    	 show:true,
				        //name:"时间",
				        nameTextStyle:{
				            color: "#000000"
				        },
			        type: 'value',
			        axisTick:{
			            show:true
			        },
			        axisLabel: {
			            show:true,
			            //rotate: -45
			        },
			        axisLine:{
			            show:true,
			            lineStyle:{
					           color: "#000000"
					   }
			        },
			        splitLine:{
			            show:false
			        }
			    },
			    tooltip: {
			        //trigger: 'axis'
			    		show:false
			    },
			    series: [{
			        data: [["2020-01-01 09:00:00",116],["2020-01-01 09:05:00",129],["2020-01-01 09:10:00",135],["2020-01-01 09:15:00",86],["2020-01-01 09:20:00",286],["2020-01-01 09:25:00",157],["2020-01-01 09:30:00",107],["2020-01-01 09:35:00",221],["2020-01-01 09:40:00",133],["2020-01-01 09:45:00",79]],
			        type: 'line',
			        areaStyle: {
			            opacity:0,
			            //color:"#e3f9fd"
			            color:'#fa5a5a'
			        },
			        label:{
			            show: false,
			            //color: "#00ff00"
			        },
			        symbol:'emptyCircle',
			        lineStyle:{
			            color:"#751b13"
			        }
			    }]
			};
		var _materialID;
		this.setMaterial = function(id){
			_materialID = id;
		};
		this.getMaterial = function(){
			return _materialID;
		};
		
		this.getType=function(){
			return "timeseries";
		};
		this.get = function(){
			return scenario_div;
		};
		var chart;
		this.getOptions = function() {
			return _option;
		};
		this.setOptions = function(opts) {
			_option = opts;
			chart.setOption(_option);
		};
		this.draw = function(data) {
			
		};
		this.append = function(){
			 var content = scenario_div.children(".uc-editSceMaterial-spec-ts-cnt");
			 chart = echarts.init(content[0]);
			 chart.setOption(_option);
		};
		this.collect = function() {
			var data = {};
			_varUCCommonComp.collect(data);
			data["chartOptions"] = _option;
			data["material"] = _materialID;
			return data;
		};
		this.fill = function(obj) {
			var o = this.getOptions();
			var editPanel = _varUCEditPanelTS.getPanel();
			
			if( obj === _varComponentLayoutPanel) {
				_varUCCommonComp.fillLayout(this);
			} else if( obj === _varUCEditPanelTS) {
				_varUCEditPanelTS.getPanel().find("#uc-ts-specXAxisLabel").val(o["xAxis"]["name"]);
				_varUCEditPanelTS.getPanel().find("#uc-ts-specYAxisLabel").val(o["yAxis"]["name"]);
				
				_varUCEditPanelTS.bgColorPicker.update(o["grid"]["backgroundColor"]);
				//_varUCEditPanelTS.borderColorPicker.update(o["grid"]["borderColor"]); 
				_varUCEditPanelTS.xAxisColorPicker .update(o["xAxis"]["axisLine"]["lineStyle"]["color"] );
				_varUCEditPanelTS.xAxisNameColorPicker.update(o["xAxis"]["nameTextStyle"]["color"]); 
				_varUCEditPanelTS.yAxisColorPicker.update(o["yAxis"]["axisLine"]["lineStyle"]["color"]); 
				_varUCEditPanelTS.yAxisNameColorPicker.update(o["yAxis"]["nameTextStyle"]["color"]);
				_varUCEditPanelTS.dataAreaColorPicker.update(o["series"][0]["areaStyle"]["color"]); 
				_varUCEditPanelTS.dataAreaLineColorPicker.update(_option["series"][0]["lineStyle"]["color"]);

				_varUCEditPanelTS.tsWidthSlider.update(o["grid"]["width"]);
					editPanel.find("#uc-ts-width-val").val(_varUCEditPanelTS.tsWidthSlider.getVal());
					_varUCEditPanelTS.tsHeightSlider.update(o["grid"]["height"]); 
					editPanel.find("#uc-ts-high-val").val(_varUCEditPanelTS.tsHeightSlider.getVal());
					//_varUCEditPanelTS.tsBorderWidthSlider.udpate(o["grid"]["borderWidth"]);
					//editPanel.find("#uc-ts-border-width-val").val(_varUCEditPanelTS.tsBorderWidthSlider.getVal());
					_varUCEditPanelTS.xAxisLblRotatedSlider.update(o["xAxis"]["axisLabel"]["rotate"]);
					editPanel.find("#uc-timeseries-xaxis-label-rotate-val").val(_varUCEditPanelTS.xAxisLblRotatedSlider.getVal());
					_varUCEditPanelTS.yAxisLblRotatedSlider.update(o["yAxis"]["axisLabel"]["rotate"]);
					editPanel.find("#uc-timeseries-yaxis-label-rotate-val").val(_varUCEditPanelTS.yAxisLblRotatedSlider.getVal());
				
					_varUCEditPanelTS.xAxisTick.update(o["xAxis"]["axisTick"]["show"] );
				_varUCEditPanelTS.xAxisSplitline.update(o["xAxis"]["splitLine"]["show"]);
				_varUCEditPanelTS.xAxisLine.update(o["xAxis"]["axisLine"]["show"]);
				_varUCEditPanelTS.xAxisLable.update(o["xAxis"]["axisLabel"]["show"]);
				_varUCEditPanelTS.yAxisLable.update(o["yAxis"]["axisLabel"]["show"]);
				_varUCEditPanelTS.yAxisTick.update(o["yAxis"]["axisTick"]["show"] );
				_varUCEditPanelTS.yAxisSplitline.update(o["yAxis"]["splitLine"]["show"]);
				_varUCEditPanelTS.yAxisLine.update(o["yAxis"]["axisLine"]["show"]);
				_varUCEditPanelTS.dataAreaLbl.update(o["series"][0]["label"]["show"]);
				_varUCEditPanelTS.tooltipTrigger.update(o["tooltip"]["show"]);
				
				if(  o["series"][0]["areaStyle"]["opacity"] == 1)
					_varUCEditPanelTS.dataAreaCover.update(true);
				else
					_varUCEditPanelTS.dataAreaCover.update(false);
				
				if(  _option["series"][0]['symbol'] === 'none')
					_varUCEditPanelTS.areaSymbolDisplay.update(false);
				else
					_varUCEditPanelTS.areaSymbolDisplay.update(true);
				
			
			}  else if( obj === _varComponentMaterialPanel) {
				_varUCCommonComp.fillMaterial(this);
			}
		};
		
		this.adjust = function(obj) {
			//var comp = _varUCNewBox.getAddedComp( _varUCEditComponent.getCurrentCompID() );

			if( obj === _varUCEditPanelTS.bgColorPicker ) {	
				_option["grid"]["backgroundColor"] = _varUCEditPanelTS.bgColorPicker.getRgbString();
			} 
			else if( obj === _varUCEditPanelTS.dataAreaLineColorPicker ) {	
				_option["series"][0]["lineStyle"]["color"] = _varUCEditPanelTS.dataAreaLineColorPicker.getRgbString();
			}
			 else if( obj === _varUCEditPanelTS.areaSymbolDisplay ) {	
				 if(  _varUCEditPanelTS.areaSymbolDisplay.isChecked())
					 _option["series"][0]['symbol']= 'emptyCircle';
				else
					_option["series"][0]['symbol']= 'none';
				}
			else if( obj ===  _varUCEditPanelTS.borderColorPicker ) {
				_option["grid"]["borderColor"] = _varUCEditPanelTS.borderColorPicker.getRgbString();

			}
			else if( obj ===  _varUCEditPanelTS.xAxisColorPicker ) {
				_option["xAxis"]["axisLine"]["lineStyle"]["color"] = _varUCEditPanelTS.xAxisColorPicker.getRgbString();

			}
			else if( obj ===  _varUCEditPanelTS.xAxisNameColorPicker ) {
				_option["xAxis"]["nameTextStyle"]["color"] = _varUCEditPanelTS.xAxisNameColorPicker.getRgbString();

			}
			else if( obj ===  _varUCEditPanelTS.yAxisColorPicker ) {
				_option["yAxis"]["axisLine"]["lineStyle"]["color"] = _varUCEditPanelTS.yAxisColorPicker.getRgbString();

			}
			else if( obj ===  _varUCEditPanelTS.yAxisNameColorPicker ) {
				_option["yAxis"]["nameTextStyle"]["color"] = _varUCEditPanelTS.yAxisNameColorPicker.getRgbString();

			}
			else if( obj ===  _varUCEditPanelTS.dataAreaColorPicker ) {
				_option["series"][0]["areaStyle"]["color"] = _varUCEditPanelTS.dataAreaColorPicker.getRgbString();

			}
			else if( obj ===  _varUCEditPanelTS.tsWidthSlider ) {
				_option["grid"]["width"] = _varUCEditPanelTS.tsWidthSlider.getVal()+"%";

			}
			else if( obj ===  _varUCEditPanelTS.tsHeightSlider ) {
				_option["grid"]["height"] = _varUCEditPanelTS.tsHeightSlider.getVal()+"%";
			}
			else if( obj ===  _varUCEditPanelTS.tsBorderWidthSlider ) {
				_option["grid"]["borderWidth"] = _varUCEditPanelTS.tsBorderWidthSlider.getVal();
			}
			else if( obj ===  _varUCEditPanelTS.xAxisLblRotatedSlider ) {
				_option["xAxis"]["axisLabel"]["rotate"] = _varUCEditPanelTS.xAxisLblRotatedSlider.getVal();
			}
			else if( obj ===  _varUCEditPanelTS.yAxisLblRotatedSlider ) {
				_option["yAxis"]["axisLabel"]["rotate"] = _varUCEditPanelTS.yAxisLblRotatedSlider.getVal();
			}
			else if( obj ===  _varUCEditPanelTS.xAxisTick ) {
				if(  _varUCEditPanelTS.xAxisTick.isChecked())
					_option["xAxis"]["axisTick"]["show"] = true;
				else
					_option["xAxis"]["axisTick"]["show"] = false;

			}
			else if( obj ===  _varUCEditPanelTS.xAxisSplitline ) {
				if(  _varUCEditPanelTS.xAxisSplitline.isChecked())
					_option["xAxis"]["splitLine"]["show"] = true;
				else
					_option["xAxis"]["splitLine"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.xAxisLine ) {
				if(  _varUCEditPanelTS.xAxisSplitline.isChecked())
					_option["xAxis"]["axisLine"]["show"] = true;
				else
					_option["xAxis"]["axisLine"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.xAxisLable ) {
				if(  _varUCEditPanelTS.xAxisSplitline.isChecked())
					_option["xAxis"]["axisLabel"]["show"] = true;
				else
					_option["xAxis"]["axisLabel"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.yAxisLable ) {
				if(  _varUCEditPanelTS.yAxisSplitline.isChecked())
					_option["yAxis"]["axisLabel"]["show"] = true;
				else
					_option["yAxis"]["axisLabel"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.yAxisTick ) {
				if(  _varUCEditPanelTS.yAxisTick.isChecked())
					_option["yAxis"]["axisTick"]["show"] = true;
				else
					_option["yAxis"]["axisTick"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.yAxisSplitline ) {
				if(  _varUCEditPanelTS.yAxisSplitline.isChecked())
					_option["yAxis"]["splitLine"]["show"] = true;
				else
					_option["yAxis"]["splitLine"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.yAxisLine ) {
				if(  _varUCEditPanelTS.yAxisSplitline.isChecked())
					_option["yAxis"]["axisLine"]["show"] = true;
				else
					_option["yAxis"]["axisLine"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.dataAreaLbl ) {
				if(  _varUCEditPanelTS.dataAreaLbl.isChecked())
					_option["series"][0]["label"]["show"] = true;
				else
					_option["series"][0]["label"]["show"] = false;
			}
			else if( obj ===  _varUCEditPanelTS.dataAreaCover ) {
				if(  _varUCEditPanelTS.dataAreaCover.isChecked())
					_option["series"][0]["areaStyle"]["opacity"] = 1;
				else
					_option["series"][0]["areaStyle"]["opacity"] = 0;
			}
			else if( obj ===  _varUCEditPanelTS.tooltipTrigger ) {
				if(  _varUCEditPanelTS.tooltipTrigger.isChecked())
					_option["tooltip"]["show"] = true;
				else
					_option["tooltip"]["show"]= false;
			}
			else if( obj === _varUCEditPanelTS.specXAxisLabel ){
				_option["xAxis"]["name"] = _varUCEditPanelTS.specXAxisLabel.getTarget().val();
			}
			else if( obj === _varUCEditPanelTS.specYAxisLabel ){
				_option["yAxis"]["name"] = _varUCEditPanelTS.specYAxisLabel.getTarget().val();
			}
			else {
				_varUCCommonComp.adjust(scenario_div, obj);
			}
		}
	};
	
	_varUCCommonComp.register("timeseries", $.varLineCompBox);
})(window.jQuery);