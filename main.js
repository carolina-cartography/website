
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

	// Add layers
	var layerA = L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(primaryMap);
	var layerB = L.tileLayer( 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(primaryMap);
	var layerC = L.tileLayer( 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(primaryMap);

	// Find hover IDs
	$("#a").mouseenter(function () {
		layerA.bringToFront();
	});
	$("#b").mouseenter(function () {
		layerB.bringToFront();
	});
	$("#c").mouseenter(function () {
		layerC.bringToFront();
	});
}