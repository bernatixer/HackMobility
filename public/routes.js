var bikeData = [];
var currLocation;
var nowStation;
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
		toastr.warning("No bikes left in this station </br> <button class='btn btn-warning btn-sm' onclick='makePath("+lat+","+lon+");'>Go</button> <button class='btn btn-warning btn-sm'  onclick='nearestStation("+ lat + "," + lon + ")'>Redirect</button>", "Care!")

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

var controlSearch = new L.Control.Search({
    position:'topleft',
    layer: markersLayer,
    initial: false,
    zoom: 16,
    marker: false,
    moveToLocation: function(latlng, title, map) {
        console.log(title);
        possiblePath(latlng.lat, latlng.lng, findPercent(title));
        map.setView(latlng, 16);
    }
});

mymap.addControl(controlSearch);

function distance(lat, lng) {
    var a = lat-nowStation.lat;
    var b = lng-nowStation.lng;
    var c = a*a+b*b;
    return Math.sqrt(c);
}

function findRoute() {
    // TO-DO: POSAR UN SEARCH PER BUSCAR EL LLOC ON ANAR
    $('#questionModal').modal('toggle');
}

function findBike() {
    // TO-DO: MIRAR SI N'HI HA UN Q ESTA BUIT I PORTAR-LO AL QUE NO HO ESTA
    $('#questionModal').modal('toggle');
}

function parkBike() {
    // BUSCAR UN AMB SLOTS LLIURES I PORTARLO ALLA, PINTAR-HO TOT DIFERENT
    $('#questionModal').modal('toggle');
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
