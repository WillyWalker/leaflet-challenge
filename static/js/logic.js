
// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

var Data = {"type":"Feature",
"properties":{"mag":1.46,"place":"1 km ESE of Talmage, CA","time":1699032114610,"updated":1699042570384,
"tz":null,"url":"https://earthquake.usgs.gov/earthquakes/eventpage/nc73955590",
"detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/nc73955590.geojson",
"felt":null,"cdi":null,"mmi":null,"alert":null,"status":"automatic","tsunami":0,"sig":33,
"net":"nc","code":"73955590","ids":",nc73955590,","sources":",nc,",
"types":",nearby-cities,origin,phase-data,scitech-link,","nst":10,"dmin":0.05885,"rms":0.07,
"gap":145,"magType":"md","type":"earthquake","title":"M 1.5 - 1 km ESE of Talmage, CA"},
"geometry":{"type":"Point","coordinates":[-123.1521683,39.1290016,7.07]},"id":"nc73955590"}

// coordinates = [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]

// depth = feature.geometry.coordinates[2]

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (Data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  
  init(Data);
});

let myMap = L.map("map", {
  center: [39, -122],
  zoom: 8
});

function init() {
  data = [{
    x: -123.1521683,
    y: 39.1290016,
    //x: [0, 500, 1000, 1500, 2000, 2500, 3000],
    //y: [0, 500, 1000, 1500, 2000, 2500, 3000],

    text: "1 km ESE of Talmage, CA",
    mode: 'markers',
    marker: {'autocolorscale': false, 'colorscale': 'YlOrRd', 'color': 'Green'},
    type: 'scatter',
    name: 'Exoplanets',

    //text: planetNames,
    customdata: 7.07,
    hovertemplate:
    '<b> %{text} </b><br>' +
    'Coordinates: (%{x}, %{y})<br>' +
    'Earth-Like Score: %{marker.color} out of 100<br>' +
    'Focus Depth: %{customdata} km' +
    '<extra></extra>'
    
}];

}

