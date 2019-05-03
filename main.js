
$(document).ready(function () {
	setupYearHover();
	initializePrimaryMap();
});

function setupYearHover () {
	$(".year").hover(function () {
		$(".year").each(function () {
			$(this).removeClass('active');
		})
		$(this).addClass('active');
	});
}

function initializePrimaryMap () {

	// Initialize map
	var primaryMap = L.map('primary-map', {
		scrollWheelZoom: false
	});

	// Position zoom controls
	primaryMap.zoomControl.setPosition('bottomright');

	// Position map for Vieques
	primaryMap.setView([18.14, -65.43], 12);

	// Add background layer at front on load
	L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/rasters/contour/{z}/{x}/{y}.png', {
		tms: true
	}).addTo(primaryMap).bringToFront();

	// Add layers
	var layer1937 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/1937/{z}/{x}/{y}.png',
		{tms: true}
	).addTo(primaryMap).setOpacity(0);
	var layer1977 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/1977/{z}/{x}/{y}.png',
		{tms: true}
	).addTo(primaryMap).setOpacity(0);
	var layer1983 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/1983/{z}/{x}/{y}.png',
		{tms: true}
	).addTo(primaryMap).setOpacity(0);

	function hideLayers () {
		layer1937.setOpacity(0);
		layer1977.setOpacity(0);
		layer1983.setOpacity(0);
	}

	// Setup layer hover effects
	$("#showLayer1937").mouseenter(function () {
		hideLayers();
		layer1937.setOpacity(1);
	});
	$("#showLayer1977").mouseenter(function () {
		hideLayers();
		layer1977.setOpacity(1);
	});
	$("#showLayer1983").mouseenter(function () {
		hideLayers();
		layer1983.setOpacity(1);
	});
}