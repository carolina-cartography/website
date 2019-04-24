
$(document).ready(function () {
	initializePrimaryMap();
});

function initializePrimaryMap () {

	// Initialize map
	var primaryMap = L.map('primary-map');

	// Position zoom controls
	primaryMap.zoomControl.setPosition('bottomright');

	// Position map for Vieques
	primaryMap.setView([18.14, -65.43], 12);

	// Add base layer
	L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(primaryMap);

	// Add other layers
	L.tileLayer( 'https://tile.waymarkedtrails.org/hiking/${z}/${x}/${y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(primaryMap);
	
}