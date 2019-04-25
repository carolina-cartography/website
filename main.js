
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
	var layerA = L.tileLayer( 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(primaryMap);
	var layerB = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/1977/vieques1977/{z}/{x}/{y}.png',
		{tms: true}
	).addTo(primaryMap);
	var layerC = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/1983/{z}/{x}/{y}.png',
	{tms: true}
).addTo(primaryMap);
	var layer1 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/rasters/contour/{z}/{x}/{y}.png',
	{tms: true}
)	.addTo(primaryMap);

	layer1.bringToFront();
// TO DO
// Ideally on layer is shown instead of all layers being called.
// Hopefully that will make it faster 

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