
const FORTIN = [18.147407888387857, -65.43913891363856]
let map;

$(document).ready(() => {
    initializeLeaftlet()
	initializeAddressFinder()
	loadOutline()
})

function initializeLeaftlet() {

    // Initialize map
	map = L.map('leaflet', { 
		attributionControl:false,  
		scrollWheelZoom: true
	})

    // Add Open Street Map layer
    L.tileLayer( 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		tms: false
    }).addTo(map)

	// Position zoom controls
	map.zoomControl.setPosition('bottomright')

	// Position map for Vieques, centered on Fortin
	map.setView(FORTIN, 12)

    // Add marker to Fortin
    const fortinMarker = L.marker(FORTIN).addTo(map)
	fortinMarker.bindTooltip("Museo El Fort&iacute;n", {
		direction: 'auto',
		permanent: true,
	}).openTooltip()
}

function loadOutline() {
	const boundary = new L.geoJson(null, {
		style: {
			fillOpacity: 0,
			color: '#666'
		}
	});
	boundary.addTo(map);
	$.ajax({
		dataType: "json",
		url: "outline.geojson",
		success: function(data) {
			$(data.features).each(function(key, data) {
				boundary.addData(data);
			});
		}
	})
}

function initializeAddressFinder() {
	const input = document.getElementById("address-input")
	const autocomplete = new google.maps.places.Autocomplete(input, {
		fields: ["formatted_address", "geometry", "name"],
		strictBounds: false,
	})
	autocomplete.addListener("place_changed", () => {
		handleAddressChange(autocomplete.getPlace())
	});
}

function handleAddressChange(place) {
	if (!place.geometry || !place.geometry.location) {
		window.alert("No details available for input: '" + place.name + "'");
		return;
	}
	const coords = [place.geometry.location.lat(), place.geometry.location.lng()]
	map.flyTo(coords)
}