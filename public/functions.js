var url = "getJsonObject"

/*setTimeout(function() {
	$.getJSON(url, function(data) {
		loadPoints(data);
		console.log("Punts actualitzats");
	});
}, 60000);*/
$.getJSON(url, function(data) {
	loadPoints(data);
	console.log("Punts actualitzats");
});

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox.streets'
}).addTo(mymap);

var popup = L.popup();

function loadPoints (json){
	for (var i = 0; i < json.length; ++i) {
		var bikes 	= json[i].bikes,
			slots 	= json[i].slots,
		 	summ  	= parseInt(bikes) + parseInt(slots),
			percent = (parseInt(bikes)/parseInt(summ))*100,
			color 	= "rgb(0,0,0)",
			red 	= 1,
			address	= json[i].address,
			lat 	= json[i].lat,
			lon 	= json[i].lon,
			id 	    = json[i].id;

		bikeData[id] = {percent: percent, lat: lat, lon: lon, address: address, nearbyStations: json[i].nearbyStations};

		if (percent != 0) {
			color = (percent > 50 ?" rgb(0,255,0)" : "rgb(255,"+ Math.floor(230*(percent/100)) +",0)");
			red = 0.7;
		}

		var circle = L.circle([lat, lon], 25, {
			title: json[i].address,
			color: color,
			fillColor: color,
			fillOpacity: red
		}).addTo(mymap).bindPopup("Bike number: " + json[i].bikes + "</br>" +  "Bike Slots: " + json[i].slots  + "</br>" + json[i].address + " </br></br> <button class='btn btn-info btn-sm' id='"+i+"' onclick='possiblePath(" + lat + "," + lon + ", " + percent + ", " +  ");'>Go</button>");
		
		markersLayer.addLayer(circle);
	}

}

function possiblePath(lat, lon, percent) {
	if (percent === 0) {

		toastr.options = {
		  "closeButton": false,
		  "debug": false,
		  "newestOnTop": false,
		  "progressBar": false,
		  "positionClass": "toast-top-right",
		  "preventDuplicates": false,
		  "onclick": null,
		  "showDuration": "300",
		  "hideDuration": "1000",
		  "timeOut": "5000",
		  "extendedTimeOut": "1000",
		  "showEasing": "swing",
		  "hideEasing": "linear",
		  "showMethod": "fadeIn",
		  "hideMethod": "fadeOut"
		}
		toastr.warning("No bikes left in this station </br> <button class='btn btn-warning btn-sm' onclick='makePath("+lat+","+lon+");'>Go</button> <button class='btn btn-warning btn-sm'  onclick='nearestStation("+ lat + "," + lon + ")'>Redirect</button>", "Care!")

	} else {
		makePath(lat, lon);
	}
}

function nearestStation(lat,lon) {
	return "eta";
}