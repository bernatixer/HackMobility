var url = "getJsonObject"

$.getJSON(url, function(data) {
	loadPoints(data, bikeSlot == "bikes");
});
setInterval(function() {
	$.getJSON(url, function(data) {
		loadPoints(data, bikeSlot == "bikes");
	});
}, 60000);

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
	maxZoom: 18,
	id: 'mapbox.streets'
}).addTo(mymap);

var popup = L.popup();
function loadPoints (json, find) {
    markersLayer.clearLayers();
	for (var i=0; i<json.length; ++i) {
		var bikes 	= json[i].bikes,
			slots 	= json[i].slots,
		 	summ  	= parseInt(bikes) + parseInt(slots),
			color 	= "rgb(0,0,0)",
			red 	= 1,
			address	= json[i].address + " " + json[i].addressNumber,
			lat 	= json[i].lat,
			lon 	= json[i].lon,
			id 	    = json[i].id;

		var percent;
		if (find) percent = (parseInt(bikes)/parseInt(summ))*100;
		else percent = (parseInt(slots)/parseInt(summ))*100;
		
		for (var j=0; j<alarms.length; ++j) {
			if (alarms[j].place == address) {
				if (alarms[j].type == "full" && (find && percent>70 || !find && percent<30)) {
					Push.create("Full", {
						body: address + " station is full",
						icon: "./imgs/icono.jpg",
						timeout: 4000,
						onClick: function() {
							window.focus();
							this.close();
						}
					});
				} else if (alarms[j].type == "one" && bikes > 0) {
					Push.create("At least one left", {
						body: address + " has at least one bike left",
						icon: "./imgs/icono.jpg",
						timeout: 4000,
						onClick: function() {
							window.focus();
							this.close();
						}
					});
				} else if (alarms[j].type == "empty" && bikes == 0) {
					Push.create("Empty station", {
						body: address + " station has no bikes left",
						icon: "./imgs/icono.jpg",
						timeout: 4000,
						onClick: function() {
							window.focus();
							this.close();
						}
					});
				}
			}
		}
		
		bikeData[parseInt(id)] = {percent: percent, lat: lat, lng: lon, address: address, nearbyStations: json[i].nearbyStations};

		if (percent != 0) {
			color = (percent > 50 ?" rgb(0,255,0)" : "rgb(255,"+ Math.floor(230*(percent/100)) +",0)");
			red = 0.7;
		}

		var circle = L.circle([lat, lon], 25, {
			title: address,
			color: color,
			fillColor: color,
			fillOpacity: red
		}).addTo(mymap).bindPopup("Bike number: " + bikes + "</br>" +  "Bike Slots: " + slots  + "</br>" + address + " </br><button class='btn btn-info btn-sm' id='"+i+"' onclick='possiblePath(" + lat + "," + lon + ", " + percent + ", " +  id + ");'>Go</button>");
		
		markersLayer.addLayer(circle);
	}
}
