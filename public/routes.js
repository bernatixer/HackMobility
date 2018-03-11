var bikeData = [];
var currLocation;
var nowStation;
var bikeSlot = "bikes";
var route = L.Routing.control({
    waypoints: [],
    router: L.Routing.graphHopper("19bf5030-c60e-4f63-9af7-53778c745494" , {
        urlParameters: {
            vehicle: 'bike'
        }
    })
}).addTo(mymap);

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

		toastr.warning("No " + bikeSlot + " left in this station </br> <button class='btn btn-warning btn-sm' onclick='makePath("+lat+","+lon+");'>Go</button> <button class='btn btn-warning btn-sm'  onclick='nearestStation("+ lat + "," + lon + ")'>Redirect</button>", "Care!")

	} else {
		makePath(lat, lon);
	}
}

function findPercent(title) {
    var station;
    for (station in bikeData) {
        var bikeStation = bikeData[station];
        if (bikeStation.address == title) return bikeStation.percent;
    }
    return 100;
}

function onLocationFound(e) {
    var radius = e.accuracy / 2;
    currLocation = e.latlng
    L.marker(currLocation).addTo(mymap)
    L.circle(currLocation, radius).addTo(mymap);
 }

 function onLocationError(e) {
    alert(e.message);
 }

 function getLocationLeaflet() {
    mymap.on('locationfound', onLocationFound);
    mymap.on('locationerror', onLocationError);

    mymap.locate({setView: true, maxZoom: 16});
 }

getLocationLeaflet();

var popup = L.popup();

var markersLayer = new L.LayerGroup();	//layer contain searched elements

mymap.addLayer(markersLayer);

mymap.addControl(new L.Control.Search({
    position:'topleft',
    layer: markersLayer,
    initial: false,
    zoom: 16,
    marker: false,
    moveToLocation: function(latlng, title, map) {
        possiblePath(latlng.lat, latlng.lng, findPercent(title));
        map.setView(latlng, 16);
    }
}));

mymap.addControl(new L.Control.Search({
    container: 'parkbox',
    layer: markersLayer,
    initial: false,
    zoom: 16,
    marker: false,
    moveToLocation: function(latlng, title, map) {
        possiblePath(latlng.lat, latlng.lng, findPercent(title));
        $('#parkBike').modal('toggle');
        map.setView(latlng, 16);
    }
}));

mymap.addControl(new L.Control.Search({
    container: 'findbox',
	url: 'http://nominatim.openstreetmap.org/search?format=json&q={s}',
    jsonpParam: 'json_callback',
    propertyName: 'display_name',
    propertyLoc: ['lat','lon'],
    marker: false,
    autoCollapse: true,
    collapsed: false,
    autoType: false,
    minLength: 2,
    moveToLocation: function(latlng, title, map) {
        makePath(latlng.lat, latlng.lng);
        $('#findRoute').modal('toggle');
        map.setView(latlng, 16);
    }
}));

function distance(lat, lng) {
    var a = lat-nowStation.lat;
    var b = lng-nowStation.lng;
    var c = a*a+b*b;
    return Math.sqrt(c);
}

function findBike() {
    $.getJSON(url, function(data) {
        loadPoints(data, true);
        bikeSlot = "bikes";
        nearestStation(currLocation.lat, currLocation.lng);
        $('#questionModal').modal('toggle');
    });
}

function parkBike() {
    $.getJSON(url, function(data) {
        loadPoints(data, false);
        bikeSlot = "slots";
        nearestStation(currLocation.lat, currLocation.lng);
        $('#parkBike').modal('toggle');
    });
}

function nearestStation(lat, lng) {
    var bestStation = bikeData[1];
    var station;
    nowStation = {lat: lat, lng: lng};
    for (station in bikeData) {
        var bikeStation = bikeData[station];
        if (bikeStation.percent != 0 && bikeStation.lat != nowStation.lat && bikeStation.lng != nowStation.lng) {
            if (distance(bikeStation.lat, bikeStation.lng) < distance(bestStation.lat, bestStation.lng)) {
                bestStation = bikeStation;
            }
        }
    }
    makePath(bestStation.lat, bestStation.lng)
}

function makePath(lat, lng) {
    route.spliceWaypoints(0, 2);
    route.setWaypoints([
        currLocation,
        L.latLng(lat, lng)
    ]);

}
