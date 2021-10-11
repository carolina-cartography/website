
$(document).ready(function () {
	setupYearHover();
	initializePrimaryMap();
	setupTranslation();
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
	var layer1937 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v1937/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	var layer1977 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v1977/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	var layer1983 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v1983/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	var layer2009 = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v2009/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	var layerwater = L.tileLayer( 'https://cartocollective.blob.core.windows.net/vieques/v2009/{z}/{x}/{y}.png',
		{tms: false}
	).addTo(primaryMap).setOpacity(0);
	//file:///Users/isabellesmith/esk/(PUT NAME OF TILES HERE).tiles)

	function hideLayers () {
		layer1937.setOpacity(0);
		layer1977.setOpacity(0);
		layer1983.setOpacity(0);
		layer2009.setOpacity(0);
		layerwater.setOpacity(0);
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
	$("#showLayer2009").mouseenter(function () {
		hideLayers();
		layer2009.setOpacity(1);
	});

	$("#showLayerwater").mouseenter(function () {
		hideLayers();
		layerwater.setOpacity(1);
	});
}

function setupTranslation() {
	$(".lang-es").each(function () {
		$(this).css("display", "none");
	});
	$(".switch-language").click(function (event) {
		event.preventDefault();
		if ($(this).attr('id') == "show-es") {
			$(".lang-en").each(function () {
				$(this).css("display", "none");
			})
			$(".lang-es").each(function () {
				$(this).css("display", "block");
			})
		}
		else if ($(this).attr('id') == "show-en") {
			$(".lang-es").each(function () {
				$(this).css("display", "none");
			})
			$(".lang-en").each(function () {
				$(this).css("display", "block");
			})
		}
	})
}