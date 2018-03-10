var mymap = L.map('mapid').setView([51.505, -0.09], 13);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox.streets'
	}).addTo(mymap);

	

	L.circle([51.508, -0.11], 50, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
	}).addTo(mymap).bindPopup("I am a circle. <b>hoalsla</b>");


	var popup = L.popup();

	/*function onMapClick(e) {
		popup
			.setLatLng(e.latlng)
			.setContent("You clicked the map at " + e.latlng.toString())
			.openOn(mymap);
	}

	mymap.on('click', onMapClick);*/

function loadPoints (var json){
	for (var point in json){

	var color

	if ((point.bikes/(point.bikes+point.slots))*100)

	L.circle([point.lat, point.lon], 50, {
		color: 'red',
		fillColor: '#f03',
		fillOpacity: 0.5
		}).addTo(mymap).bindPopup("I am a circle. <b>hoalsla</b>");
	}
}