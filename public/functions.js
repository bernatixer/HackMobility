var url = "http://www.bicing.cat/availability_map/getJsonObject"
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
	var	summ  	= parseInt(bikes) + parseInt(slots)
	var	percent = (parseInt(bikes)/parseInt(summ))*100
	
	var color = "rgb(0,0,0)";
	var red = 1;
	if (percent != 0){
		color = (percent > 50 ?" rgb(0,255,0)" : "rgb(255,"+ Math.floor(230*(percent/100)) +",0)")
		red = 0.7
	}

		var circle = L.circle([json[i].lat, json[i].lon], 25, {
		title: json[i].address,
		color: color,
		fillColor: color,
		fillOpacity: red
		}).addTo(mymap).bindPopup("Bike number: " + json[i].bikes + "</br>" +  "Bike Slots: " + json[i].slots  + "</br>" + json[i].address);
		markersLayer.addLayer(circle);
	}

}