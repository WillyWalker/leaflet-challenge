

// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data);
});

  // Once we get a response, send the data.features object to the createFeatures function.
let myMap = L.map("map", {
  center: [38, -123],
  zoom: 7
});

// Add a tile layer.
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// Define a markerSize() function that will give each city a different radius based on its population.
function markerSize(magnitude) {
  return magnitude * 5000;
}
// Loop through the cities array, and create one marker for each city object.
function createFeatures(data) {

  // const length = data.type["metadata"]["count"];
  const length = data.metadata.count;

  for (let i = 1; i <= length; i++) {

    var magnitude = data.features[i]["properties"]["mag"]
    var place = data.features[i]["properties"]["place"]
    var Focus = data.features[i]["geometry"]["coordinates"][2]
    var time = data.features[i]["properties"]["time"]

// Color Function
    Rfunc = 10 + 30 * Math.sqrt(Focus)
    Gfunc = 1 + 3 * Math.sqrt(Focus)
    Bfunc = 2 + 6 * Math.sqrt(Focus)

// Set limits to color values
    if (Focus < 0) {
      RVal = `00`;
    } else if (Rfunc > 207) {
      RVal = `cf`;
    } else if (Rfunc < 15.5) {
      RVal = `0${Math.round(Rfunc).toString(16)}`;
    } else {RVal = Math.round(Rfunc).toString(16);}

    if (Focus < 0 ) {
      GVal = `00`;
    }  else if (Gfunc > 16) {
      GVal = `10`;
    } else if (Gfunc < 15.5) {
      GVal = `0${Math.round(Gfunc).toString(16)}`;
    } else {GVal = Math.round(Gfunc).toString(16);}

    if (Focus < 0) {
      BVal = `00`;
    } else if (Bfunc > 32) {
      BVal = `20`;
    } else if (Bfunc < 15.5) {
      BVal = `0${Math.round(Bfunc).toString(16)}`;
    } else {BVal = Math.round(Bfunc).toString(16);}

    //var colorType = `#84427`
    var colorType = `#${RVal}${GVal}${BVal}`

    L.circle( [data.features[i]["geometry"]["coordinates"][1], data.features[i]["geometry"]["coordinates"][0]], {
      fillOpacity: 0.75,
      color: colorType,
      radius: markerSize(magnitude)
    }).bindPopup(`<h3>${place}</h3> <hr> 
    <h3> Time: ${new Date(time)}</h3> 
    <h3> Magnitude: ${magnitude} </h3>
    <h3> Focus: ${Focus} km below surface</h3>`).addTo(myMap);
  }
}