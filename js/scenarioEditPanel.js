$(document).ready(function(){ 
	var rangeSlider = document.getElementById('border-radius-range');
	console.log(rangeSlider);
	noUiSlider.create(rangeSlider, {
	    start: [1],
	    range: {
	        'min': [1],
	        'max': [20]
	    }
	});
});