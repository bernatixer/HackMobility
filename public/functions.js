var url = "https://cors.io/?http://www.bicing.cat/availability_map/getJsonObject"
var xhr = new XMLHttpRequest({mozSystem: true});


(function ($) {
	getJSON(url, function(data) {
  	console.log(data)
	}

    $(document).ready(getJSON); 
)})(jQuery);




var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox.streets'
	}).addTo(mymap);

	var popup = L.popup();

	/*function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}

	mymap.on('click', onMapClick);*/


function loadPoints (json){
	var obj = JSON.parse(json)
	for (var point in obj){

	
	/*var color = '#ff0000'
	var percent = (point.bikes/(point.bikes+point.slots))*100
	if (percent != 0) {
		color = (percent >= 66 ? "#008000" : "#FFA500");*/
		console.log(point.lat + " " + point.lon);
	}

	
	
	/*L.circle([point.lat, point.lon], 50, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a circle. <b>hoalsla</b>");
	}*/
}