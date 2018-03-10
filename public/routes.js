function onLocationFound(e) {
    var radius = e.accuracy / 2;
    var location = e.latlng
    L.marker(location).addTo(mymap)
    L.circle(location, radius).addTo(mymap);
 }

 function onLocationError(e) {
    alert(e.message);
 }

 function getLocationLeaflet() {
    mymap.on('locationfound', onLocationFound);
    mymap.on('locationerror', onLocationError);

    mymap.locate({setView: true, maxZoom: 16});
 }


 L.circle([41.391075, 2.180223], 50, {
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
}).addTo(mymap);

getLocationLeaflet();

var popup = L.popup();


var markersLayer = new L.LayerGroup();	//layer contain searched elements

mymap.addLayer(markersLayer);

var controlSearch = new L.Control.Search({
    position:'topleft',		
    layer: markersLayer,
    initial: false,
    zoom: 12,
    marker: false
});

mymap.addControl( controlSearch );