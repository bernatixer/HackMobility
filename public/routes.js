var currLocation;
var route = L.Routing.control({
    waypoints: [],
    router: L.Routing.graphHopper("19bf5030-c60e-4f63-9af7-53778c745494" , {
        urlParameters: {
            vehicle: 'bike'
        }
    })
}).addTo(mymap);
// route.show();
// route.hide();

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

/*L.circle([41.391075, 2.180223], 50, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle. <b>hoalsla</b>");

L.circle([41.385331, 2.128737], 50, {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(mymap).bindPopup("I am a circle. <b>hoalsla</b>");

L.Routing.control({
waypoints: [
    L.latLng(41.391075, 2.180223),
    L.latLng(41.385331, 2.128737)
],
router: L.Routing.graphHopper("19bf5030-c60e-4f63-9af7-53778c745494" , {
    urlParameters: {
        vehicle: 'bike'
    }
})
}).addTo(mymap);*/

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
        makePath(latlng.lat, latlng.lng);
        map.setView(latlng, 16);
    }
});

mymap.addControl(controlSearch);

function makePath(lat, lng) {
    route.spliceWaypoints(0, 2);
    route.setWaypoints([
        currLocation,
        L.latLng(lat, lng)
    ]);

}