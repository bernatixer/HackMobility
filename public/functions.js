var url = "https://cors.io/?http://www.bicing.cat/availability_map/getJsonObject"
var xhr = new XMLHttpRequest({mozSystem: true});

$.getJSON(url, function(data) {
    console.log(data)
    loadPoints(data);
});

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
	console.log("he entrat a loadPoints");
	//var obj = JSON.parse(json)
	for (var i = 0; i < json.length; ++i){
		var bikes 	= json[i].bikes
		var	slots 	= json[i].slots
		var	summ  	= bikes + slots
		var	percent = (bikes/summ)*100 
		console.log("id: " + i-1 + ", bikes: " + bikes ", slots: " + slots + ", summ: " + summ + ", percent: " + percent);
	
	var color = '#ff0000'
	if (percent != 0) 
		color = (percent >= 30 ? "#008000" : "#FFA500");
	
		L.circle([json[i].lat, json[i].lon], 25, {
		color: color,
		fillColor: color,
		fillOpacity: 0.75
		}).addTo(mymap).bindPopup("I am a circle. <b>hoalsla</b>");
	}

}