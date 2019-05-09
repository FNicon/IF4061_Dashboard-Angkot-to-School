var mymap = L.map('mapid').setView([-6.90600, 107.64000], 12);
mymap.setMaxBounds(mymap.getBounds());

addAttribution("pk.eyJ1IjoiZmluaWtvIiwiYSI6ImNqdjk3eDhtNTBxM2s0M24zOGVnampyd2EifQ.6MnSmaqKUeB9soPyAfu3OQ", 12, 14);

var kecamatanLayer = L.geoJSON(kecamatan_geom, {
    style: style,
    onEachFeature: onEachFeature
}).addTo(mymap);

var info = L.control();
info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Persebaran Jumlah dan Kebutuhan Angkot</h4>' +  '<div style="color:#000000"> ' + (props ?
        '<b>' + props.KECAMATAN + '</b>'
        + '<br /> Angkot ' + props.angkot
        + '<br /> Kebutuhan Angkot ' + props.kebutuhan
        + '<br /> Terpenuhi ' + Math.round(props.angkot / props.kebutuhan * 100) + '%'
        : 'Hover diatas kecamatan</div>');
};
info.addTo(mymap);

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
};
//legend.addTo(mymap);

function getKecamatanIndex(inputKecamatan) {
    var i = 0;
    while (i < kecamatan.length && kecamatan[i].toUpperCase() != inputKecamatan.toUpperCase()) {
        i = i + 1;
    }
    return i;
}

kecamatanLayer.eachLayer(function(layer) {
    var kecamatanIndex = getKecamatanIndex(layer.feature.properties.KECAMATAN);
    layer.feature.properties.angkot = parseInt(jumlahAngkot[kecamatanIndex]);
    layer.feature.properties.kebutuhan = parseInt(kebutuhanAngkot[kecamatanIndex]);
    layer.feature.properties.selisih = parseInt(jumlahAngkot[kecamatanIndex]) 
        - parseInt(kebutuhanAngkot[kecamatanIndex]);
});

function addAttribution(mapToken, minZoomInput, maxZoomInput) {
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: maxZoomInput,
        minZoom: minZoomInput,
        maxBoundsViscosity: 1.0,
        id: 'mapbox.light',
        accessToken: mapToken
    }).addTo(mymap);
}

function addCircle(lat, long, radius, colour, fillColour, opacity) {
    var circle = L.circle([parseFloat(long), parseFloat(lat)], {
        color: colour,
        fillColor: fillColour,
        fillOpacity: opacity,
        radius: parseFloat(radius),
        weight: 0.5
    }).addTo(mymap);
}

function getColor(d) {
    if (d > 0) {
        return '#2ca25f';
    } else {
        return '#dd1c77';
    }
}

function style(feature) {
    return {
        fillColor: getColor(feature.properties.selisih),
        weight: 2,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.0
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.0
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    kecamatanLayer.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    mymap.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}