var unsavedTempaltes = {};
var scenarioTypeNames = ["DEFAULT","BANNER","REFRESHBLOCK","RANKLIST","TIMESERIES","CORPUSCOLLECT"];

var current_ucMaterialItemEditId;
var current_ucMaterialScenarioId;

var UC_SCENARIO_DATA_CACHE = {};
UC_SCENARIO_DATA_CACHE["empty"] = {
		    "backgroundColor": "rgb(255, 255, 255)",
			"fontColor": "rgb(0, 0, 0)",
			"height": "20",
			"heightUnit": "%",
			"left": "0%",
			"paddingBottom": 0,
			"paddingLeft": 0,
			"paddingRight": 0,
			"paddingTop": 0,
			"period": 1,
			"periodUnit": "hour",
			"position": "relative",
			"shadowColor": "rgb(51,51,51)",
			"shadowBlur": 0,
			"shadowBox": "0px 0px 0px 0px rgb(51, 51, 51) ",
			"shadowH": 0,
			"shadowInset": "",
			"shadowSpread": 0,
			"shadowV": 0,
			"top": "0%",
			"width": "25",
			"widthUnit": "%",
			
			"borderBottomStyle":"solid",
			"borderBottomColor":"rgb(136,136,136)",
			"borderBottomWidth":0,
			"borderBottomRadius":0,
			
			"borderLeftStyle":"solid",
			"borderLeftColor":"rgb(136,136,136)",
			"borderLeftWidth":0,
			"borderLeftRadius":0,
		
			"borderRightStyle":"solid",
			"borderRightColor":"rgb(136,136,136)",
			"borderRightWidth":0,
			"borderRightRadius":0,
		
			"borderTopStyle":"solid",
			"borderTopColor":"rgb(136,136,136)",
			"borderTopWidth":0,
			"borderTopRadius":0,
};