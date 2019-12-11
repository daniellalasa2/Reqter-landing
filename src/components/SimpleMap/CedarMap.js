// // In order to make this code work, you should replace your access token with <your token> in next line. Get one from https://www.cedarmaps.com

// var accessToken = "f75377a3951e4aa044fcb296a80f1e96569aeb31";
// try {
//   L.cedarmaps.accessToken = accessToken;
// } catch (err) {
//   throw new Error(
//     "You need to get an access token to be able to use cedarmaps SDK. " +
//       "Send us an email to <info@cedar.ir>"
//   );
// }

// /**
//  * Initilizing Map View
//  */

// // Getting maps info from a tileJSON source
// var tileJSONUrl =
//     "https://api.cedarmaps.com/v1/tiles/cedarmaps.streets.json?access_token=" +
//     L.cedarmaps.accessToken,
//   marker,
//   mapPositionContainer = document.getElementById("map-position");
// defaultMarkerPosition = [35.757448286487595, 51.40876293182373];

// // initilizing map into div#map
// var map = L.cedarmaps
//   .map("map", tileJSONUrl, {
//     scrollWheelZoom: true,
//     zoomControl: false,
//     minZoom: 7,
//     maxZoom: 17,
//     maxBounds: [
//       [25.064, 44.039],
//       [39.771, 63.322]
//     ] // Iran's bounding box
//   })
//   .setView(defaultMarkerPosition, 7);

// mapPositionContainer.innerHTML =
//   defaultMarkerPosition[0] + "," + defaultMarkerPosition[1];

// // Adding locate control to map
// L.control.locate({ flyTo: true }).addTo(map);

// var zoomControl = new L.Control.Zoom({ position: "topleft" });
// zoomControl.addTo(map);
// /**
//  * Adding a Leaflet marker with custom image
//  */
// // see: http://leafletjs.com/reference.html#marker
// var myIcon = L.icon({
//   iconUrl: "https://api.cedarmaps.com/cedarmaps.js/v1.8.0/images/pin-taxi.png",
//   iconRetinaUrl:
//     "https://api.cedarmaps.com/cedarmaps.js/v1.8.0/images/pin-taxi@2x.png",
//   iconSize: [34, 46],
//   iconAnchor: [17, 41],
//   popupAnchor: [-3, -46],
//   shadowUrl:
//     "https://api.cedarmaps.com/cedarmaps.js/v1.8.0/images/pin-shadow.png",
//   shadowRetinaUrl:
//     "https://api.cedarmaps.com/cedarmaps.js/v1.8.0/images/pin-shadow@2x.png",
//   shadowSize: [26, 6],
//   shadowAnchor: [13, 3]
// });

// var setMarker = function(latLng) {
//   if (marker) map.removeLayer(marker);
//   marker = new L.marker(latLng, {
//     icon: myIcon
//   }).addTo(map);
// };

// map.on("click", function(e) {
//   setMarker(e.latlng);
//   mapPositionContainer.innerHTML = e.latlng.lat + ", " + e.latlng.lng;
// });

// // Defining what to do after finding user's location and then binding the events
// var onLocationFound = function(location) {
//   setMarker(location.latlng);
//   mapPositionContainer.innerHTML =
//     location.latlng.lat + ", " + location.latlng.lng;
// };

// var locationerror = function() {
//   console.log(
//     "You either blocked browser from accessing your location OR there's something really wrong!"
//   );
// };

// map.on("locationfound", onLocationFound);
// map.on("locationerror ", locationerror);
