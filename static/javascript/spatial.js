var mymap = L.map('mapid').setView([-6.90389, 107.61861], 13);
-6.923890, 107.641100

addAttribution(
    "pk.eyJ1IjoiZmluaWtvIiwiYSI6ImNqdjk3eDhtNTBxM2s0M24zOGVnampyd2EifQ.6MnSmaqKUeB9soPyAfu3OQ", 12, 18);

function addAttribution(mapToken, minZoomInput, maxZoomInput) {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: maxZoomInput,
        minZoom: minZoomInput,
        id: 'mapbox.streets',
        accessToken: mapToken
    }).addTo(mymap);
}

var marker = L.marker([51.5, -0.09]).addTo(mymap);
var circle = L.circle([51.508, -0.11], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(mymap);